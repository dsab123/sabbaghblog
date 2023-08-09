---
title: Multiple containers on a VM with Podman Compose
description: Podman Compose is so hard to set up
date: '2023-08-09'
modified_date: '2023-08-09'
image: /assets/images/posts/rubix-hex.jpeg
tags: 'cloud, AWS, docker, podman'
---

This post details how I arrived at a temporary, non-k8s solution for shipping a multi-container solution fast.

## The Situation

We had an express + angular app in development that relied on `redis` and `postgres` containers to run. The app needed to ship quickly to a certain cloud provider's marketplace.

As none of us on the team are fans of unnecesary overhead, we didn't want to introduce kubernetes to managed the inter-container communication. Additionally, we wanted to ship as a single machine image and not a whole array of resources.

The docker compose file that we were using for local development looked something like:

```yml
version: "3.9"
services:
  redis:
    image: "redis:alpine"
    ports:
      - 6379:6379
    expose:
      - "6379"
  postgres:
    image: postgres:13
    command: postgres -c listen_addresses='*'
    ports:
      - 5432:5432
    expose:
      - "5432"
``` 

## The Action(s)

We followed the following steps to get our marketplace-ready machine image:

- dockerize app
- add app to docker-compose file
- set up ECR to host the app images
- compile bash script to get podman-compose up and running
- launch instance on cloud provider, run bash script
- confirm that podman-compose is working
- use podman's `generate` subcommand to create systemd scripts that run on boot

From here, we simply created a machine image from the running VM and listed it on the marketplace.

--------------

## Dockerizing the App 📦

The app is not too complicated. We used a multi-stage build to reduce the image's footprint.

<br />
A couple gotchas bit me in the <a href="https://en.wikipedia.org/wiki/Impostor_syndrome" target="_blank">impostor syndrome</a>:
- Mac M1 laptops will need to be aware of the `--platform` option on `FROM` to pull the right flavor, and
- environment variables should be specified on the last stage of the build.

To make the build process as supple as possible I created scripts that wrapped `npm` script commands. They're `build-frontend.sh` and `build-backend.sh`.

<br />
Here are the relevant portions of the Dockerfile:

```
# --------------------------------------------------------
# 1️⃣ - Build frontend (need arm64 to build on Mac M1)
# --------------------------------------------------------
FROM --platform=linux/arm64 node:18-alpine3.18 AS dashboard

WORKDIR /app

COPY ./frontend/ ./frontend
COPY ./build-frontend.sh ./build-frontend.sh

# this needs to be development because if not we won't pull dependencies
ENV NODE_ENV="development"

RUN ./build-frontend.sh

# --------------------------------------------------------
# 2️⃣ - Build backend (needs amd64 to build on Mac M1)
# --------------------------------------------------------
FROM --platform=linux/amd64 node:18 AS server

WORKDIR /app

# this needs to be development because if not we won't pull node's 
# dependencies
ENV NODE_ENV="development"

COPY --from=dashboard /app/server ./server
COPY ./build-server.sh ./build-server.sh

RUN ./build-server.sh

# ------------------------------------------------
# 3️⃣ - Copy executable to provider's container
# ------------------------------------------------
FROM --platform=linux/amd64 oraclelinux:8

WORKDIR /app

COPY --from=server /app/dist/app ./app

ENV FOO="nah-bro"
ENV NODE_ENV="production"
ENV PORT=3000

EXPOSE 3000

RUN chmod -v +x ./app
CMD [ "./app" ]
```

### Docker-Compose the App (Locally) 🧑‍🤝‍🧑

Next, we needed to make sure all the containers would play nice locally. Again, the desire here was to avoid k8s overhead.

Appending the following blocks to the docker-compose made it all work:

```yml
  app:
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    depends_on:
      - postgres
      - redis
```

Note that the app requires that redis and postgres are already running, hence the `depends_on` block.


### Take it to the Cloud 🌥️


Since our POC worked locally, it was time to take it to the cloud. Most of our work is in AWS land, so we created an ECR. AWS did a good job of giving us the commands to authenticate to the registry, which was super.

The command to authenticate looks something like:

`aws ecr get-login-password --region <region> | docker login --username <username> --password-stdin <aws-ecr-endpoint>`

### Script it up 📜

This next part was painful.

I discovered that docker compose, or its alternative podman-compose, is not supported out-of-the-box by the linux distro I had to target. The docs I followed are <a href="https://docs.oracle.com/en/learn/podman-compose/index.html#confirm-podman-compose-is-working" target="_blank">here</a>.

The output of following these docs, along with os-level tweaks like opening ports, pulling down the app's image from the ECR, etc, was a script that I used to prepare the VM for machine imaging.

<br />
The script roughly looks like:

```bash
#!/bin/sh

# Install AWS CLI, needed to pull down latest app image
export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin:/usr/local/bin

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI to athenticate (left blank for security reasons)

# Set up Docker and Podman

yum install -y docker

curl -L https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

yum install -y dnsmasq go git podman-dnsname podman-plugins
cd /bin
ln -s dnsdomainname dnsname
git clone https://github.com/containers/dnsname.git
cd /home/opc

# You'll need to add this to the podman default network file in /etc/cni/net.d/XXXXXX.conflist
# see the README under https://github.com/containers/dnsname.git
# {
#     "type": "dnsname",
#     "domainName": "dns.podman",
#     "capabilities": {
#        "aliases": true
#     }
#  }


# Pull image from ECR

AWS_ECR_REPO_URL=`<aws-ecr-endpoint>`
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ECR_REPO_URL

docker pull `${AWS_ECR_REPO_URL}/app:latest`


# Open up ports and such (will vary with your linux distro)

firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --reload

```

<br />
This was very hard, and took a few days to nail down.

At long last, `podman-compose up` along with the docker-compose file worked!

Now, how to make all that run on startup?

<br />
I discovered that docker and podman can generate a systemd file from a running container 🤯:

`podman generate systemd --new --files --name <container-id>`

So I did that for the three containers, and put them in `/etc/systemd/system/`, where they'd autostart on boot.

Had to remember to `systemctl enable <service>` for each of the container-services.

<br />
Along came another gotcha: I needed to run <a href="https://linux.die.net/man/8/restorecon" target="_blank">restorecon</a> on the systemd services to allow them to talk to each other:

```bash
/sbin/restorecon -v /etc/systemd/system/postgres.service
/sbin/restorecon -v /etc/systemd/system/redis.service
/sbin/restorecon -v /etc/systemd/system/app.service
```

<br />
Upon reboot, the containers were still running. Waow, we managed to get this thing shipped at long last.

<br />
I hope to automate this now-manual pipeline with some sweet Hashicorp Packer in the near future, which I will write about.