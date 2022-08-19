import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import Image from 'next/image';
import Link from 'next/link';

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

      <hr style={{border: "1px solid #4A5567"}}></hr>
      <h3>Certifications and Such</h3>
      {/* https://www.credly.com/badges/2f65d3b4-de69-48b4-b7f9-2d9a1f1ad4c6/public_url */}
      <Link href="https://www.credly.com/badges/2f65d3b4-de69-48b4-b7f9-2d9a1f1ad4c6/public_url">
        <a target="_blank" style={{display: 'flex', flexDirection: 'column', maxWidth: 100, maxHeight: 125, textDecoration: 'none' }}>
        <Image
          src="/assets/images/microsoft-certified-azure-fundamentals.png"
          alt="Azure Fundamentals Badge"
          width={125}
          height={125}
        />
        <span style={{marginTop: '.5rem', marginBottom: 0, fontSize: '15px', textAlign: 'center'}}>
          <i>8/15/2022</i>&nbsp;
          <img 
            style={{verticalAlign: 'text-top', height: '15px', width: '15px', display: 'inline'}} 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEy0lEQVR4nO2aT4xTVRTGf+e1VAjKRKcDSowxMcbYNxHZGDeaEGNMNMwMJmUBiC5Qwb6aiAQEBCugEpA/0hb/oAO6EYphWnbuZqGJrsBkXlmwdMNEYtCFGev0HRe0nTdtGdph2vcK/Vbvfvee+8739dzb+14LXXTRxZ2AaDQTqMdLuxNpFk9s+XFhcWJiG7AEtEfAUDAEegAUmQd6d2n4ApD5pet7QIOl63sBUP3JTq96xj2/7w3ot7I7FfbN1XyR8ULw7NnVxXI7ONNgP0BF/kK1mZAi8DcwgcgiVBe6+hy3eABjDnJsKezkQFpEXxB0gyKrRZ2VjvA8jvEUji43isVHnGBxqVEM3hcZLwTt1FAwMl7oAxmtEg/wT/X8vl8CzSIazQTyS0LfAWvqdP9pp4Z63YTvK6AZRKOZwKXFoW+ZLv686/rf6pjbxoBoNBOwl8w7pcLaCqn8QKAQdw0rVMfVbIKmNbILZDuwoCWZ1kAv44SetY+/dGW2M5TFC7KuzAmcDff1rLly7dqDUwcArTGgTgXIDtomHkAe1cDkc7ONjkYzgfz9oZNu8SqSCYd71owmVkyG1LjLda9GDGB+Ha6V+N3A+WU2gWXxKK+UORXJLO5dtHY0sWISwClQMUDQmj1gxnOAnRry77dEImHkr4aG3eKBM4t7F60riwcgQGiqu7EK8D8SCcO8umwYWO9iz/SFe6aLBxRcS6B2E+xAA1T6/3jyOMirLvJ0PfHXIbeTASr9sdznKrzpIk9Hxgs3EA9K8XYxQCVi5Y5PFy/fR8YL66rP99OiXEtAO/cgpGLGz6cFNpYZgZN2+MKM4gFE3ZtgR1aAimnlUqhuqjCqw2PhixtIJJybRRvuTVA6zoCSeHirwqgO5/t+e70R8QAYxrxKrKP/1XTPRZqtgYoZzyVxiQf5pinxgOPIr5RK3xC5VN3vUwNK4pVYhRK+tsMX3mhGPEA+PWAjLBfl5cfHC0eq+334RkjFtLLHUIm5yBN278WNzYovw04O5YH8WJ0+n1WASr+V+wzEcpEn7PDsxd8MPqoAlUgsd1TB9fwuX9mpgY0w1NRLwWbgGwNM6/x+4O0ppixeWiYefLIEzHh2P+jWcluUL9shHnxggGllP0HZVm4rfDGWHtzUDvHg8RLot0Y+VnivQogczScHNs9GvBk/twxkvWD8PJYcPNdonGcVcF28bHdRR+zk4Duz/uQdI4vKZlXNPGblljYa5okBkVj2o2niRQ/bqaHNtzSp8HDpKhAynAcaDWv7EjCt7D5gR4UQPWwnV73b7jzKaGsFmLGRvcDOcltUDnkpHtpogBkb2YvI++W2wqdj6cEt7br/jdCWJWBauT2gFfEoB/Ppoa0zhLQNLa8AM579EHRXhVAO2j4RDy02oN8aSaDsnmLkgJ/EQwsNMOMjrynywRQje+3U4LYbR3iDlhkgjjw91WCPnRrcPcNwz9CyTbAYCBwyHOchcEbt5KoDrbrPraJlBlw6tvIy8GKr5p8reP406DW6BnidgNfoGuB1Al6ja4DXCXiNrgFeJ+A1ugZ4nYDX6BrgdQJe4443YMbHYdPKtuX3OS9RrwLq/uGwk1AsBiYaHVtrgEiKOn8o7BBMopzKpwdsrxPpoosuOgP/A6ahmvyLIYZjAAAAAElFTkSuQmCC">
          </img>
        </span>
        </a>
      </Link>
    </Content>
  </Main>
);

export default About;
