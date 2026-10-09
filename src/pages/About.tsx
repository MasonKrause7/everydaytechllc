import '../styles/pages/Page.css'

function About() {
  return (
    <section className="page">
      <div className="page__inner">
        <p className="page__eyebrow">About</p>
        <h1 className="page__title">About Everyday Tech</h1>
        <p className="page__intro">
          Who we are and how we work.
        </p>
        
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
        
      </div>
    </section>
  )
}

export default About
