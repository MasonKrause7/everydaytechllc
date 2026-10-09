import familyPhoto from '../assets/about/family.jpg'
import headshot from '../assets/about/mason-headshot.jpg'
import masonLenoxPhoto from '../assets/about/mason-lenox.jpg'
import '../styles/pages/Page.css'
import '../styles/pages/About.css'

function About() {
  return (
    <section className="page">
      <div className="page__inner">
        <p className="page__eyebrow">About</p>
        <h1 className="page__title">About Everyday Tech</h1>
        <p className="page__intro">
          The experience and approach behind every project.
        </p>

        <div className="about__story">
          <p>
            I'm Mason Krause, a veteran and the founder of Everyday Tech. I joined Amazon straight
            out of college as a software engineer and helped build some of the first AI-powered
            tools in Amazon Advertising. The code I wrote supports features that bring in billions
            of dollars in ad revenue each year.
          </p>
          <p>
            That was good experience, but adding value to a company that size never felt like it
            made much of a difference. I started Everyday Tech to bring the same level of
            engineering to small businesses and local organizations, where the right software can
            have a tremendous impact.
          </p>
          <p>
            Today I build custom websites, apps, and AI integrations around how each client
            actually operates. When you work with Everyday Tech, you work directly with me, the
            person writing your code. I keep systems simple, build only what's needed, and focus on
            results you can measure, whether that's hours saved or revenue gained. The numbers are
            smaller than they were in Big Tech, but watching a client's organization grow because of
            something I built is a lot more rewarding.
          </p>
          <figure className="about__headshot">
            <img
              src={headshot}
              alt="Mason Krause, founder of Everyday Tech"
              width={1050}
              height={1400}
              decoding="async"
            />
          </figure>
        </div>

        <figure className="about__family">
          <div className="about__family-photos">
            <img
              className="about__family-photo about__family-photo--group"
              src={familyPhoto}
              alt="Black-and-white photo of Mason laughing with his family in front of a city skyline"
              width={1800}
              height={1200}
              loading="lazy"
              decoding="async"
            />
            <img
              className="about__family-photo about__family-photo--lenox"
              src={masonLenoxPhoto}
              alt="Mason sitting by the water with his daughter Lenox hugging him from behind"
              width={1800}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="about__caption">And when I'm not on the clock, my family keeps me plenty busy :)</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default About
