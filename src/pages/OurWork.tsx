import axisPromo from '../assets/my-work/axis/axis-promo.mp4'
import axisPromoPoster from '../assets/my-work/axis/axis-promo-poster.webp'
import busyBeeGroups from '../assets/my-work/busybee/busybee-groups.webp'
import busyBeeHome from '../assets/my-work/busybee/busybee-home.webp'
import busyBeeLogin from '../assets/my-work/busybee/busybee-login.webp'
import busyBeeStats from '../assets/my-work/busybee/busybee-stats.webp'
import giggleTalesAbout from '../assets/my-work/giggle-tales/giggle-tales-about.webp'
import giggleTalesLogin from '../assets/my-work/giggle-tales/giggle-tales.webp'
import giggleTalesPrompt from '../assets/my-work/giggle-tales/giggle-tales-prompt-screen.webp'
import giggleTalesGeneration from '../assets/my-work/giggle-tales/giggle-tales-story-generation.webp'
import giggleTalesStory from '../assets/my-work/giggle-tales/giggle-tales-story-screen.webp'
import queuelessCook from '../assets/my-work/queueless/queueless-cook-view.webp'
import queuelessCustomer from '../assets/my-work/queueless/queueless-customer-truck-view.webp'
import queuelessEmployees from '../assets/my-work/queueless/queueless-manage-employees.webp'
import queuelessTrucks from '../assets/my-work/queueless/queueless-manage-trucks.webp'
import sctCalendar from '../assets/my-work/sct/sct-calendar-screen.webp'
import sctCourses from '../assets/my-work/sct/sct-courses-screen.webp'
import sctSignIn from '../assets/my-work/sct/sct-signup-login-screen.webp'
import sctDemo from '../assets/my-work/sct/sct-demo-vid.mp4'
import sctDemoPoster from '../assets/my-work/sct/sct-demo-vid-poster.webp'
import { Link } from 'react-router'
import ProjectGallery, { type Media } from '../components/ProjectGallery'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/OurWork.css'

type Project = {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  images: Media[]
  url?: string
}

const projects: Project[] = [
  {
    id: 'sct-training',
    title: 'SCT Training',
    category: 'Full Tech Suite',
    description:
      'A national platform for distributing concealed carry curriculum materials to licensed instructors. We built a full tech suite around SCT\'s business model, including an API that serves their website, mobile apps, database, and AI integrations. Users can seamlessly manage their course subscriptions on the web or in the mobile app, while instructors manage their schedules and learn how to teach new courses. This tech suite supports a complex, unique business model and shows our ability to bring truly custom solutions to small businesses.',
    tags: ['API', 'Distributed System', 'iOS', 'Android'],
    images: [
      { src: sctSignIn, alt: 'Branded sign in and account creation' },
      {
        src: sctDemo,
        alt: 'Streaming training videos in the app',
        type: 'video',
        poster: sctDemoPoster,
      },
      { src: sctCourses, alt: 'Course materials and weekly drill schedule' },
      { src: sctCalendar, alt: 'Instructor calendar and event scheduling' },
    ],
  },
  {
    id: 'axis',
    title: 'Axis',
    category: 'Mobile App',
    description:
      'An alternative grading solution for state university STEM programs. Available on iOS and Android, the app gives college professors a platform to manage standards-based grading, an alternative grading approach used in rigorous math and engineering courses. Professors get an easy way to record and track each student\'s progress, and students get real-time updates and feedback.',
    tags: ['Educational', 'iOS', 'Android'],
    images: [
      { src: axisPromo, alt: 'Axis app promo video', type: 'video', poster: axisPromoPoster },
    ],
  },
  {
    id: 'busy-bee',
    title: 'Busy Bee',
    category: 'Web App',
    description:
      'Busy Bee simplifies the job search. Job seekers can track the status of all of their open applications in one place, even when they apply through different platforms like LinkedIn, Indeed, and Glassdoor. The consolidated dashboard automates follow-ups and tracks analytics so users can improve their approach over time.',
    tags: ['Authentication', 'Individual Efficiency'],
    images: [
      { src: busyBeeHome, alt: 'Dashboard of recent applications and stats' },
      { src: busyBeeStats, alt: 'Job search analytics and success rates' },
      { src: busyBeeGroups, alt: 'Organizing applications into groups' },
      { src: busyBeeLogin, alt: 'Login and sign up' },
    ],
  },
  {
    id: 'giggle-tales',
    title: 'Giggle Tales',
    category: 'Web App',
    description:
      'Giggle Tales is a web app that uses generative AI to help children turn their own ideas into illustrated story books. Just enter an idea for a story, wait a few minutes, and get a complete book with illustrations. The goal is to promote reading and give families a variety of reading material without having to keep buying new books. Parents can set their child\'s reading level, story length, and more, so every story is engaging and helps their child progress.',
    tags: ['Authentication', 'Gen AI Integration', 'Educational'],
    images: [
      { src: giggleTalesAbout, alt: 'Meet the team behind Giggle Tales' },
      { src: giggleTalesStory, alt: 'Reading a generated, illustrated story book' },
      { src: giggleTalesPrompt, alt: 'Entering a story idea' },
      { src: giggleTalesGeneration, alt: 'Generating the story on mobile' },
      { src: giggleTalesLogin, alt: 'Login and sign up' },
    ],
  },
  {
    id: 'queue-less',
    title: 'Queue-less',
    category: 'Web App',
    description:
      'Queue-less is built to eliminate waiting in line. We believe technology has come far enough that lines should be a thing of the past. The first version was built for food trucks: customers scan a QR code on the truck, place their order on their phone, and get an alert when it\'s ready, instead of waiting in line to order and then waiting again for their name to be called.',
    tags: ['Business Efficiency', 'Reusable Software'],
    images: [
      { src: queuelessTrucks, alt: 'Manager dashboard for trucks and QR codes' },
      { src: queuelessCustomer, alt: 'Customer starting an order on their phone' },
      { src: queuelessCook, alt: 'Cook view of incoming orders' },
      { src: queuelessEmployees, alt: 'Adding an employee and assigning a truck' },
    ],
  },
]

function OurWork() {
  usePageMeta(
    'Our Work | Websites, Web Apps & Mobile Apps | Everyday Tech',
    'See the web apps, iOS and Android apps, and AI integrations Everyday Tech has built, including SCT Training, Axis, Busy Bee, Giggle Tales, and Queue-less.',
  )

  return (
    <>
      <section className="page work-header">
        <div className="page__inner">
          <p className="page__eyebrow">Our work</p>
          <h1 className="page__title">
            Projects we've <span className="home_content__highlight">built</span>
          </h1>
          <p className="page__intro">
            A selection of the websites, apps, and integrations we've built.
          </p>
          <nav className="work-nav" aria-label="Projects">
            {projects.map(({ id, title }) => (
              <Link key={id} to={`#${id}`} className="work-nav__link">
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {projects.map((project, index) => (
        <section
          key={project.id}
          id={project.id}
          className={`home_content__section project${index % 2 === 0 ? ' home_content__section--alt' : ' project--reverse'}`}
        >
          <div className="home_content__inner project__inner">
            <div className="project__media">
              {project.images.length > 0 ? (
                <ProjectGallery images={project.images} />
              ) : (
                <div className="project__placeholder">Screenshot coming soon</div>
              )}
            </div>

            <div className="project__content">
              <p className="home_content__eyebrow">{project.category}</p>
              <h2 className="home_content__title">{project.title}</h2>
              <p className="project__description">{project.description}</p>
              <ul className="project__tags">
                {project.tags.map((tag, tagIndex) => (
                  <li key={tagIndex} className="project__tag">
                    {tag}
                  </li>
                ))}
              </ul>
              {project.url && (
                <a
                  href={project.url}
                  className="project__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit site →
                </a>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="home_content__section home_content__section--cta">
        <div className="home_content__inner home_content__cta">
          <h2 className="home_content__title">
            Have a project in <span className="home_content__highlight">mind</span>?
          </h2>
          <p className="home_content__intro">
            Book a free consultation and we'll talk through your goals and recommend the right
            solution for your budget.
          </p>
          <Link to="/start-project" className="hero__button hero__button--primary">
            Start a project
          </Link>
        </div>
      </section>
    </>
  )
}

export default OurWork
