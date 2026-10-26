import type { IconType } from 'react-icons'
import {
  FaBrain,
  FaBriefcase,
  FaCalendarDays,
  FaCircleQuestion,
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

// monthlyPlan options skip the budget step and ask which website plan they prefer.
// leadValue is the analytics conversion value when no budget is given.
// openEnded options are never prefilled from a ?service= link.
export type ServiceOption = Option & { monthlyPlan?: boolean; leadValue?: number; openEnded?: boolean }

export const serviceOptions: ServiceOption[] = [
  {
    id: 'website-plan',
    label: 'Website',
    description: 'Monthly plans from $65, $0 down',
    icon: FaGlobe,
    monthlyPlan: true,
    leadValue: 780,
  },
  {
    id: 'web-app',
    label: 'Web app',
    description: 'A website with a database and real features',
    icon: FaServer,
  },
  {
    id: 'mobile-app',
    label: 'Mobile app',
    description: 'An app for iPhone, Android, or both',
    icon: FaMobileScreenButton,
  },
  {
    id: 'full-tech-suite',
    label: 'Full tech suite',
    description: 'Web app and mobile apps sharing one API',
    icon: FaLayerGroup,
  },
  {
    id: 'seo',
    label: 'SEO',
    description: 'Get your existing website found on Google',
    icon: FaMagnifyingGlass,
  },
  {
    id: 'ai-integration',
    label: 'AI integration',
    description: 'Automate repetitive work with AI',
    icon: FaBrain,
  },
  {
    id: 'something-else',
    label: 'Something else',
    description: 'Tell us what you have in mind',
    icon: FaPlus,
    openEnded: true,
  },
  {
    id: 'not-sure',
    label: 'Not sure yet',
    description: 'We\'ll help you figure out the right fit',
    icon: FaCircleQuestion,
    openEnded: true,
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
  { id: 'upfront', label: 'Pay in full', description: 'One payment before the project starts' },
  { id: 'standard', label: 'Half and half', description: '50% to start, 50% on delivery' },
  { id: 'split', label: 'Spread it out', description: 'Several smaller payments over time' },
  { id: 'not-sure', label: 'Not sure yet', description: 'We can talk through what works best' },
]

export const websitePlanOptions: Option[] = [
  { id: '12-month', label: '12-month plan', description: '$65/month, $0 down, 12-month minimum' },
  { id: 'month-to-month', label: 'Month-to-month', description: '$79/month plus $250 setup, cancel anytime' },
  { id: 'not-sure', label: 'Not sure yet', description: 'We can talk through what works best' },
]

// Old service ids that may still appear in links or ads.
export const legacyServiceIds: Record<string, string> = {
  'single-page-website': 'website-plan',
  '3-page-website': 'website-plan',
}

export const findOption = <T extends Option>(options: T[], id: string) =>
  options.find((option) => option.id === id)
