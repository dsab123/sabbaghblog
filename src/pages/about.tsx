import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="About" description="About" />}>
    <Content>
      <p>
        Hi, I&apos;m a software engineer with a fun arabic name, who also likes
        puns and <i>Arrested Development</i>. This blog's name is mostly my
        last name with a bit of influence from <a href="https://www.youtube.com/watch?v=FOtDNXfMyD0" target="_blank">
         Bob Lablaw's Law Blog</a>.
      </p>

      <p>
        I&apos;ve been in the software biz for almost ten years now, and have
         climbed my way up the stack from C to TypeScript. These days I get to
          work with a bunch of close friends and am doing Infrastructure things
           on AWS and and Azure. 
      </p>

      <p>I own and operate <a href="https://www.danielsabbagh.com">danielsabbagh.com</a>,
      which originally served as my programming blagh. But then I turned it into a theology and 
      reading site, so my programming content took second place and was booted out. Hence 
      this blagh.
      </p>

      <p>I didn't like my old articles so I started over. These days many of my blog-worthy
        accolades are Infrastructure-related, and deal with Terraform.
      </p>

    </Content>
  </Main>
);

export default About;
