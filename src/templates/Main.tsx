import { ReactNode } from 'react';

import Link from 'next/link';

import { Navbar } from '../navigation/Navbar';
import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="titleContent pt-16 pb-8">
          <img className="faceImage" src="/assets/images/face.png"></img>
            <div className="font-semibold text-3xl text-gray-900">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                Home (Blagh)
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                About
              </Link>
            </li>
            <li className="mr-6">
              <a href="https://github.com/dsab123" target="_blank">
                GitHub &nbsp;
                  <img 
                    style={{verticalAlign: 'baseline', height: '18px', width: '18px', display: 'inline'}} 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEy0lEQVR4nO2aT4xTVRTGf+e1VAjKRKcDSowxMcbYNxHZGDeaEGNMNMwMJmUBiC5Qwb6aiAQEBCugEpA/0hb/oAO6EYphWnbuZqGJrsBkXlmwdMNEYtCFGev0HRe0nTdtGdph2vcK/Vbvfvee+8739dzb+14LXXTRxZ2AaDQTqMdLuxNpFk9s+XFhcWJiG7AEtEfAUDAEegAUmQd6d2n4ApD5pet7QIOl63sBUP3JTq96xj2/7w3ot7I7FfbN1XyR8ULw7NnVxXI7ONNgP0BF/kK1mZAi8DcwgcgiVBe6+hy3eABjDnJsKezkQFpEXxB0gyKrRZ2VjvA8jvEUji43isVHnGBxqVEM3hcZLwTt1FAwMl7oAxmtEg/wT/X8vl8CzSIazQTyS0LfAWvqdP9pp4Z63YTvK6AZRKOZwKXFoW+ZLv686/rf6pjbxoBoNBOwl8w7pcLaCqn8QKAQdw0rVMfVbIKmNbILZDuwoCWZ1kAv44SetY+/dGW2M5TFC7KuzAmcDff1rLly7dqDUwcArTGgTgXIDtomHkAe1cDkc7ONjkYzgfz9oZNu8SqSCYd71owmVkyG1LjLda9GDGB+Ha6V+N3A+WU2gWXxKK+UORXJLO5dtHY0sWISwClQMUDQmj1gxnOAnRry77dEImHkr4aG3eKBM4t7F60riwcgQGiqu7EK8D8SCcO8umwYWO9iz/SFe6aLBxRcS6B2E+xAA1T6/3jyOMirLvJ0PfHXIbeTASr9sdznKrzpIk9Hxgs3EA9K8XYxQCVi5Y5PFy/fR8YL66rP99OiXEtAO/cgpGLGz6cFNpYZgZN2+MKM4gFE3ZtgR1aAimnlUqhuqjCqw2PhixtIJJybRRvuTVA6zoCSeHirwqgO5/t+e70R8QAYxrxKrKP/1XTPRZqtgYoZzyVxiQf5pinxgOPIr5RK3xC5VN3vUwNK4pVYhRK+tsMX3mhGPEA+PWAjLBfl5cfHC0eq+334RkjFtLLHUIm5yBN278WNzYovw04O5YH8WJ0+n1WASr+V+wzEcpEn7PDsxd8MPqoAlUgsd1TB9fwuX9mpgY0w1NRLwWbgGwNM6/x+4O0ppixeWiYefLIEzHh2P+jWcluUL9shHnxggGllP0HZVm4rfDGWHtzUDvHg8RLot0Y+VnivQogczScHNs9GvBk/twxkvWD8PJYcPNdonGcVcF28bHdRR+zk4Duz/uQdI4vKZlXNPGblljYa5okBkVj2o2niRQ/bqaHNtzSp8HDpKhAynAcaDWv7EjCt7D5gR4UQPWwnV73b7jzKaGsFmLGRvcDOcltUDnkpHtpogBkb2YvI++W2wqdj6cEt7br/jdCWJWBauT2gFfEoB/Ppoa0zhLQNLa8AM579EHRXhVAO2j4RDy02oN8aSaDsnmLkgJ/EQwsNMOMjrynywRQje+3U4LYbR3iDlhkgjjw91WCPnRrcPcNwz9CyTbAYCBwyHOchcEbt5KoDrbrPraJlBlw6tvIy8GKr5p8reP406DW6BnidgNfoGuB1Al6ja4DXCXiNrgFeJ+A1ugZ4nYDX6BrgdQJe4443YMbHYdPKtuX3OS9RrwLq/uGwk1AsBiYaHVtrgEiKOn8o7BBMopzKpwdsrxPpoosuOgP/A6ahmvyLIYZjAAAAAElFTkSuQmCC">
                  </img>
              </a>
            </li>
            <li className="mr-6">
              <a href="/projects">
                Projects
              </a>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="text-xl py-5">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
);

export { Main };
