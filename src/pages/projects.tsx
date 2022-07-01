import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Projects = () => (
  <Main meta={<Meta title="Projects" description="Projects" />}>
    <Content>
      <p>Here is a curated gallery of side projects and/or fun live things I've worked on.</p>
      <br></br>

      <img src="/assets/images/quotecreator-project.png"></img>
    <h2><a href="https://quote-generator-next.vercel.app" target="_blank">Quote Generator (→)</a> • 2021 • Social Image Generator</h2>
      <h3>What (it is)</h3>
      This is a social image generator. You can upload and format quotes, and pair them with a random image
       from <a href="https://unsplash.com" target="_blank">unsplash.com</a>.

      <h3>How (it works)</h3>
      <p>This is my second non-trivial Next app, so I knew I needed some real state management.
      I think I used Redux well here. I also TDD'd during development, which I almost never do in side projects.
      I also have forthcoming authentication via Auth0 in the works. The hope is to get some multitenant account
      functionality going. We're using Fauna as a NoSQL database which has been fun.</p>

      <h3>Why (did I do it)</h3>
      <p>I wanted to automate social images for <a href="http://danielsabbagh.com" target="_blank">danielsabbagh.com</a>,
        and didn't like any free options in existence for this kinda thing. So I wrote this little guy
        that can upload quotes to my own “account”, pull images from unsplash (right now it always searches for 'sky',
        because there are some surprise no bueno images that pop up with random searches), and r
        eposition/format the text for me.
      </p>

      <p>It's far from complete, maybe when the kid(s) are out of the house I can find time to finish this up…
      </p>

      <p>--------------------------</p>

      <img src="/assets/images/danielsabbaghcom-project.png"></img>

      <h2><a href="http://danielsabbagh.com" target="_blank">danielsabbagh.com (→)</a> • 2020 • Hand-Spun Reading Blog</h2>
  
      <h3>What</h3>
      <p>This is a hand-spun blog framework for my theology and meta-reading.
         Google Analytics tells me that 600 people have visited the site in the first half of 2022.
          I'll not mention that they only visit the site for about 23 seconds though.</p>
      
      <h3>How</h3>
      <p>This is a Next app. That's pretty much it. Nothing special tech-wise. Fiddled with the CSS for way too long.</p>

      <h3>Why</h3>
      <p>I was on short-term disability for health reasons and this popped out. Sadly I never took the time to learn much of what I was 
        doing (I blame the corticosteroids). Next is a very forgiving framework, but React and async operations are not.
         I didn't use any state management, so there are some quirks in the page transitions that I have since recasted as easter eggs.
          Some cool things about this project is that I'm using github as a poor man's CMS. I also put on my poor designer's 
          hat and golden ratio'd all over the layout, so hopefully it's nice to look at.
      </p>

      <p>This also is far from complete, maybe when the kid(s) are out of the house I can find time to finish this up…
      </p>
      

<p>--------------------------</p>

      <img src="/assets/images/playhymns-project.png"></img>

      <h2><a href="http://playhymns.herokuapp.com" target="_blank">PlayHymns! (→)</a> • 2015 • First Ever Web App</h2>      
      <h3>What</h3>
      <p>The OG, the first web app I ever made in 2015. It runs on heroku's free tier, so the dyno that
         runs it takes a minute to start up. Make sure to visit the HTTP version, 
         as there's a dangerous API call that HTTPS won't allow 😄</p>
      
      <h3>How</h3>
      <p>This is a silly Spring app, I think. I was learning about ORM at the time and was pretty fascinated with it.</p>

      <h3>Why</h3>
      <p>IQuite a few members of our church had never grown up singing hymns, so their transition 
        to a reformed liturgical style was a bit harder than most people's. 
        I recorded myself playing the hymns a few days ahead of time and organized them by week
         so that peeps could get acclimated to the hymns we were going to sing the coming Sunday.</p>

      <h2>Offline or confidential stuff</h2>
      <p >Will update as I remember, but mostly devops-y stuff for work comes to mind. 
        Right now Azure has been the main thing, but as I build up our CI/CD I'm getting to
        incorporating some AWS niceties.</p>
    </Content>
  </Main>
);

export default Projects;
