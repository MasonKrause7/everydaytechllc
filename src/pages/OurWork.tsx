import axisPromo from '../assets/my-work/axis/axis-promo.mp4'
import axisPromoPoster from '../assets/my-work/axis/axis-promo-poster.jpg'
import busyBeeGroups from '../assets/my-work/busybee/busybee-groups.png'
import busyBeeHome from '../assets/my-work/busybee/busybee-home.png'
import busyBeeLogin from '../assets/my-work/busybee/busybee-login.png'
import busyBeeStats from '../assets/my-work/busybee/busybee-stats.png'
import giggleTalesLogin from '../assets/my-work/giggle-tales/giggle-tales.png'
import giggleTalesPrompt from '../assets/my-work/giggle-tales/giggle-tales-prompt-screen.png'
import giggleTalesGeneration from '../assets/my-work/giggle-tales/giggle-tales-story-generation.png'
import giggleTalesStory from '../assets/my-work/giggle-tales/giggle-tales-story-screen.png'
import queuelessCook from '../assets/my-work/queueless/queueless-cook-view.png'
import queuelessCustomer from '../assets/my-work/queueless/queueless-customer-truck-view.png'
import queuelessEmployees from '../assets/my-work/queueless/queueless-manage-employees.png'
import queuelessTrucks from '../assets/my-work/queueless/queueless-manage-trucks.png'
import sctCalendar from '../assets/my-work/sct/sct-calendar-screen.png'
import sctCourses from '../assets/my-work/sct/sct-courses-screen.png'
import sctSignIn from '../assets/my-work/sct/sct-signup-login-screen.png'
import sctDemo from '../assets/my-work/sct/sct-demo-vid.mp4'
import sctDemoPoster from '../assets/my-work/sct/sct-demo-vid-poster.jpg'
import ProjectGallery, { type Media } from '../components/ProjectGallery'
import '../styles/pages/Page.css'
import '../styles/pages/OurWork.css'

type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  images: Media[]
  url?: string
}

const projects: Project[] = [
  {
    title: 'SCT Training',
    category: 'Full Tech Suite',
    description:
      'A national platform for distributing concealed carry curriculum materials to licensed instructors. We built a full tech suite around SCT\'s business model, including an API that serves their website, mobile apps, database, and AI integrations. Users can seamlessly manage their course subscriptions through the web or the mobile app, while instructors maintain their schedule and learn how to teach new courses. This tech suite accomodates a complex and unique business model and represents our ability to bring truly customized solutions to small businesses.',
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
    title: 'Axis',
    category: 'Mobile App',
    description:
      'An alternative grading solution for state university STEM programs. This app (available for iOS/Android) provides a platform for college professors to manage "Standards based grading", an alternative grading approach used in rigorous math and engineering courses. Through the app, professors have an easy way to enter and track a students progress, and students get real time updates and feedback.',
    tags: ['Educational', 'iOS', 'Android'],
    images: [
      { src: axisPromo, alt: 'Axis app promo video', type: 'video', poster: axisPromoPoster },
    ],
  },
  {
    title: 'Busy Bee',
    category: 'Web App',
    description:
      'This app was built to simplify the job search process for job seekers. Through the app, a user can keep track of the status of multiple open job applications, even if they are submitted through different platforms such as LinkedIn, Indeed, Glassdoor, etc. This gives users a consolidated dashboard to automate follow ups and track analytics to optimize their process.',
    tags: ['Authentication', 'Individual Efficiency'],
    images: [
      { src: busyBeeHome, alt: 'Dashboard of recent applications and stats' },
      { src: busyBeeStats, alt: 'Job search analytics and success rates' },
      { src: busyBeeGroups, alt: 'Organizing applications into groups' },
      { src: busyBeeLogin, alt: 'Login and sign up' },
    ],
  },
  {
    title: 'Giggle Tales',
    category: 'Web App',
    description:
      'Giggle Tales is an app available online that leverages generative AI to help children create story books based on their ideas. Anyone can simply enter their idea for a story, wait a few minutes, and have a book generated with illustrations. We want to promote reading and eliminate the need for families to spend money buying books to get their child a variety of reading material. Giggle tales allows you to configure your childs reading level, story length, etc, so that your child gets engaging stories based on their original ideas that help them progress.',
    tags: ['Authentication', 'Gen AI Integration', 'Educational'],
    images: [
      { src: giggleTalesStory, alt: 'Reading a generated, illustrated story book' },
      { src: giggleTalesPrompt, alt: 'Entering a story idea' },
      { src: giggleTalesGeneration, alt: 'Generating the story on mobile' },
      { src: giggleTalesLogin, alt: 'Login and sign up' },
    ],
  },
  {
    title: 'Queue-less',
    category: 'Web App',
    description:
      'The goal of queue-less is to eliminate the need to stand in line. We believe technology has advanced enough that waiting in line should be a thing of the past. This initial solution was built for food trucks, enabling customers to scan a QR code on their truck and place an order on their phone and receive an alert when its ready, rather than waiting in line to place an order and waiting to have their name called once its ready.',
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
  return (
    <>
      <section className="page work-header">
        <div className="page__inner">
          <p className="page__eyebrow">Our work</p>
          <h1 className="page__title">Projects we've built</h1>
          <p className="page__intro">
            A selection of websites, apps, and integrations we've delivered for our
            clients.
          </p>
        </div>
      </section>

      {projects.map((project, index) => (
        <section
          key={project.title}
          className={`project${index % 2 === 1 ? ' project--reverse' : ''}`}
        >
          <div className="project__inner">
            <div className="project__media">
              {project.images.length > 0 ? (
                <ProjectGallery images={project.images} />
              ) : (
                <div className="project__placeholder">Screenshot coming soon</div>
              )}
            </div>

            <div className="project__content">
              <p className="project__category">{project.category}</p>
              <h2 className="project__title">{project.title}</h2>
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
    </>
  )
}

export default OurWork
