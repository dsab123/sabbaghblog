import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="About" description="About" />}>
    <Content>
      <p>
        Hi, I'm a software engineer with a fun arabic name, who also likes
        puns and <i>Arrested Development</i>.
      </p>

      <p>
        I've been in the software biz for almost ten years now, and have climbed my way up the stack from C to TypeScript. These days I get to work with a bunch of friends and am doing Infrastructure and Azure things. 
      </p>
    </Content>
  </Main>
);

export default About;
