import type { IconType } from 'react-icons'
import {
  FaBrain,
  FaBriefcase,
  FaCalendarDays,
  FaCircleQuestion,
  FaFileLines,
  FaGlobe,
  FaHourglassHalf,
  FaLayerGroup,
  FaLightbulb,
  FaMagnifyingGlass,
  FaMobileScreenButton,
  FaPlus,
  FaRocket,
  FaScrewdriverWrench,
  FaServer,
} from 'react-icons/fa6'

export type Option<Id extends string = string> = {
  id: Id
  label: string
  description?: string
  icon?: IconType
}

export type ServiceOption = Option & { startingPrice?: number }

// Starting prices mirror the lowest end of each tier on the Pricing page.
export const serviceOptions: ServiceOption[] = [
  {
    id: 'single-page-website',
    label: 'Single-page website',
    description: 'A clean, professional landing page',
    icon: FaFileLines,
    startingPrice: 400,
  },
  {
    id: '3-page-website',
    label: '3-page website',
    description: 'Room for services, about, and contact',
    icon: FaGlobe,
    startingPrice: 650,
  },
  {
    id: 'web-app',
    label: 'Web app',
    description: 'A website with a database and real features',
    icon: FaServer,
    startingPrice: 1000,
  },
  {
    id: 'mobile-app',
    label: 'Mobile app',
    description: 'An app for iPhone, Android, or both',
    icon: FaMobileScreenButton,
    startingPrice: 1500,
  },
  {
    id: 'full-tech-suite',
    label: 'Full tech suite',
    description: 'Web app and mobile apps sharing one API',
    icon: FaLayerGroup,
    startingPrice: 3000,
  },
  {
    id: 'seo',
    label: 'SEO',
    description: 'Get your existing website found on Google',
    icon: FaMagnifyingGlass,
    startingPrice: 500,
  },
  {
    id: 'ai-integration',
    label: 'AI integration',
    description: 'Automate repetitive work with AI',
    icon: FaBrain,
    startingPrice: 2000,
  },
  {
    id: 'something-else',
    label: 'Something else',
    description: 'Tell us what you have in mind',
    icon: FaPlus,
  },
  {
    id: 'not-sure',
    label: 'Not sure yet',
    description: 'We\'ll help you figure out the right fit',
    icon: FaCircleQuestion,
  },
]

export const stageOptions: Option[] = [
  {
    id: 'idea',
    label: 'I have an idea',
    description: 'No business yet, just an idea I want to build',
    icon: FaLightbulb,
  },
  {
    id: 'existing-business',
    label: 'I run a business or organization',
    description: 'I need new tech for my team',
    icon: FaBriefcase,
  },
  {
    id: 'improving',
    label: 'I have something to improve',
    description: 'I already have a website or app that needs work',
    icon: FaScrewdriverWrench,
  },
]

export const industryOptions: Option[] = [
  { id: 'restaurant-food', label: 'Restaurant & food' },
  { id: 'retail', label: 'Retail & shopping' },
  { id: 'health-wellness', label: 'Health & wellness' },
  { id: 'beauty-fitness', label: 'Beauty & fitness' },
  { id: 'home-services', label: 'Home services & trades' },
  { id: 'professional-services', label: 'Professional services' },
  { id: 'real-estate', label: 'Real estate' },
  { id: 'nonprofit', label: 'Nonprofit & community' },
  { id: 'other', label: 'Other' },
]

export const timelineOptions: Option[] = [
  { id: 'asap', label: 'ASAP', description: 'Within 4 weeks', icon: FaRocket },
  { id: '1-2-months', label: '1–2 months', icon: FaCalendarDays },
  { id: '2-6-months', label: '2–6 months', icon: FaCalendarDays },
  { id: 'flexible', label: 'Flexible', description: 'No set deadline', icon: FaHourglassHalf },
]

export const paymentPlanOptions: Option[] = [
  { id: 'standard', label: 'Standard', description: '2 payments: 50% to start, 50% on delivery' },
  { id: 'split', label: 'Split', description: '4 payments over time' },
  { id: 'extended', label: 'Extended', description: 'Up to 8 payments over time' },
  { id: 'not-sure', label: 'Not sure yet', description: 'We can talk through what works best' },
]

export const findOption = <T extends Option>(options: T[], id: string) =>
  options.find((option) => option.id === id)
