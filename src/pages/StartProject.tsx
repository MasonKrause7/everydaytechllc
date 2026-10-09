import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleCheck,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa6'
import usePageMeta from '../hooks/usePageMeta'
import { contactEmail, contactPhone } from '../data/contactInfo'
import {
  findOption,
  industryOptions,
  paymentPlanOptions,
  serviceOptions,
  stageOptions,
  timelineOptions,
  type Option,
} from '../data/projectIntake'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Contact.css'
import '../styles/pages/StartProject.css'

type StepId =
  | 'service'
  | 'stage'
  | 'details'
  | 'timeline'
  | 'budget'
  | 'flexible'
  | 'payment'
  | 'contact'

type Answers = {
  service: string
  serviceOther: string
  stage: string
  industry: string
  description: string
  timeline: string
  budget: string
  budgetUnsure: boolean
  openToFlexible: boolean
  businessContext: string
  paymentPlan: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const autoAdvanceDelay = 220
const sourceParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

const budgetAmount = (answers: Answers) =>
  answers.budgetUnsure ? null : Number(answers.budget) || null

function isBelowMinimum(answers: Answers) {
  const startingPrice = findOption(serviceOptions, answers.service)?.startingPrice
  const amount = budgetAmount(answers)
  return startingPrice !== undefined && amount !== null && amount < startingPrice
}

function getSteps(answers: Answers, stageLocked: boolean): StepId[] {
  return [
    'service',
    ...(stageLocked ? [] : (['stage'] as const)),
    'details',
    'timeline',
    'budget',
    isBelowMinimum(answers) ? 'flexible' : 'payment',
    'contact',
  ]
}

function readSource(searchParams: URLSearchParams) {
  const source: Record<string, string> = {}
  for (const key of sourceParams) {
    const value = searchParams.get(key)
    if (value) source[key] = value
  }
  if (document.referrer && new URL(document.referrer).origin !== window.location.origin) {
    source.referrer = document.referrer
  }
  return source
}

function OptionGrid({
  options,
  selected,
  onSelect,
  columns = 2,
}: {
  options: Option[]
  selected: string
  onSelect: (id: string) => void
  columns?: 2 | 3
}) {
  return (
    <div className={`intake__options intake__options--${columns}`}>
      {options.map(({ id, label, description, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`intake__option${selected === id ? ' intake__option--selected' : ''}`}
          aria-pressed={selected === id}
          onClick={() => onSelect(id)}
        >
          {Icon && (
            <span className="intake__option-icon">
              <Icon aria-hidden />
            </span>
          )}
          <span className="intake__option-text">
            <span className="intake__option-label">{label}</span>
            {description && <span className="intake__option-description">{description}</span>}
          </span>
        </button>
      ))}
    </div>
  )
}

function StartProject() {
  usePageMeta(
    'Start a Project | Everyday Tech | Big Rapids, MI',
    'Tell us about your business, organization, or app idea in a few quick steps, and we\'ll follow up within a day or two with next steps and a free consultation.',
  )

  const [searchParams] = useSearchParams()
  const [stageLocked] = useState(() => searchParams.get('intent') === 'idea')
  const [answers, setAnswers] = useState<Answers>(() => ({
    service: findOption(serviceOptions, searchParams.get('service') ?? '')?.startingPrice
      ? (searchParams.get('service') as string)
      : '',
    serviceOther: '',
    stage: stageLocked ? 'idea' : '',
    industry: '',
    description: '',
    timeline: '',
    budget: '',
    budgetUnsure: false,
    openToFlexible: false,
    businessContext: '',
    paymentPlan: '',
  }))
  const [step, setStep] = useState<StepId>(() =>
    answers.service ? getSteps(answers, stageLocked)[1] : 'service',
  )
  const [source] = useState(() => readSource(searchParams))
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const advanceTimer = useRef<number | undefined>(undefined)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasNavigated = useRef(false)

  const steps = getSteps(answers, stageLocked)
  const stepIndex = Math.max(steps.indexOf(step), 0)
  const isIdea = answers.stage === 'idea'
  const belowMinimum = isBelowMinimum(answers)

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  useEffect(() => {
    if (!hasNavigated.current) return
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.closest('.intake')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [step, status])

  function update(changes: Partial<Answers>) {
    setAnswers((current) => ({ ...current, ...changes }))
  }

  function goTo(target: StepId | undefined) {
    if (!target) return
    hasNavigated.current = true
    setStep(target)
  }

  function goNext(nextAnswers = answers) {
    const nextSteps = getSteps(nextAnswers, stageLocked)
    goTo(nextSteps[nextSteps.indexOf(step) + 1])
  }

  function goBack() {
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = undefined
    goTo(steps[stepIndex - 1])
  }

  function choose(changes: Partial<Answers>) {
    if (advanceTimer.current) return
    const nextAnswers = { ...answers, ...changes }
    setAnswers(nextAnswers)
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = undefined
      goNext(nextAnswers)
    }, autoAdvanceDelay)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const contact = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/start-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          service: answers.service,
          serviceOther: answers.service === 'something-else' ? answers.serviceOther : '',
          stage: answers.stage,
          industry: isIdea ? '' : answers.industry,
          description: answers.description,
          timeline: answers.timeline,
          budgetAmount: budgetAmount(answers),
          budgetUnsure: answers.budgetUnsure,
          belowMinimum,
          openToFlexible: belowMinimum && answers.openToFlexible,
          businessContext: belowMinimum ? answers.businessContext : '',
          paymentPlan: belowMinimum ? '' : answers.paymentPlan,
          source,
        }),
      })
      if (!response.ok) {
        const data: { error?: string } = await response.json().catch(() => ({}))
        throw new Error(data.error ?? 'Your request could not be submitted.')
      }
      hasNavigated.current = true
      setSubmittedName(contact.name?.trim().split(/\s+/)[0] ?? '')
      setStatus('sent')
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error ? submitError.message : 'Your request could not be submitted.',
      )
      setStatus('error')
    }
  }

  const heading = (title: string, subtitle?: ReactNode) => (
    <div className="intake__heading">
      <h2 className="contact__card-title intake__title" ref={headingRef} tabIndex={-1}>
        {title}
      </h2>
      {subtitle && <p className="contact__text">{subtitle}</p>}
    </div>
  )

  const continueButton = (disabled = false, label = 'Continue') => (
    <button
      type="button"
      className="hero__button hero__button--primary intake__continue"
      disabled={disabled}
      onClick={() => goNext()}
    >
      {label} <FaArrowRight aria-hidden />
    </button>
  )

  function renderStep() {
    switch (step) {
      case 'service':
        return (
          <>
            {heading(
              isIdea ? 'What would you like to build?' : 'What can we help you with?',
              'Pick the option that fits best. You can always change it later.',
            )}
            <OptionGrid
              options={serviceOptions}
              selected={answers.service}
              columns={3}
              onSelect={(id) =>
                id === 'something-else' ? update({ service: id }) : choose({ service: id })
              }
            />
            {answers.service === 'something-else' && (
              <div className="contact-form__field">
                <label htmlFor="intake-service-other" className="contact-form__label">
                  What do you have in mind?
                </label>
                <input
                  id="intake-service-other"
                  className="contact-form__input"
                  value={answers.serviceOther}
                  onChange={(event) => update({ serviceOther: event.target.value })}
                  maxLength={200}
                  autoFocus
                />
              </div>
            )}
            {answers.service === 'something-else' &&
              continueButton(!answers.serviceOther.trim())}
          </>
        )

      case 'stage':
        return (
          <>
            {heading('Where are you at?')}
            <OptionGrid
              options={stageOptions}
              selected={answers.stage}
              columns={3}
              onSelect={(id) => choose({ stage: id })}
            />
          </>
        )

      case 'details':
        return isIdea ? (
          <>
            {heading('Tell us about your idea', 'A few sentences is plenty. We\'ll dig into the details together.')}
            <div className="contact-form__field">
              <label htmlFor="intake-description" className="contact-form__label">
                What's the idea? Who is it for, and what problem does it solve?
              </label>
              <textarea
                id="intake-description"
                className="contact-form__input contact-form__textarea"
                value={answers.description}
                onChange={(event) => update({ description: event.target.value })}
                rows={6}
                maxLength={5000}
              />
            </div>
            {continueButton(!answers.description.trim())}
          </>
        ) : (
          <>
            {heading('Tell us about your organization')}
            <fieldset className="intake__fieldset">
              <legend className="contact-form__label">
                What best describes your organization? <span className="contact-form__optional">(optional)</span>
              </legend>
              <div className="intake__chips">
                {industryOptions.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`intake__chip${answers.industry === id ? ' intake__chip--selected' : ''}`}
                    aria-pressed={answers.industry === id}
                    onClick={() => update({ industry: answers.industry === id ? '' : id })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="contact-form__field">
              <label htmlFor="intake-description" className="contact-form__label">
                What would you like to build or improve?{' '}
                <span className="contact-form__optional">(optional)</span>
              </label>
              <textarea
                id="intake-description"
                className="contact-form__input contact-form__textarea"
                value={answers.description}
                onChange={(event) => update({ description: event.target.value })}
                rows={5}
                maxLength={5000}
              />
            </div>
            {continueButton()}
          </>
        )

      case 'timeline':
        return (
          <>
            {heading('What\'s your timeline?')}
            <OptionGrid
              options={timelineOptions}
              selected={answers.timeline}
              onSelect={(id) => choose({ timeline: id })}
            />
          </>
        )

      case 'budget':
        return (
          <>
            {heading(
              'What budget do you have in mind?',
              'There\'s no wrong answer. Share what\'s realistic for you, and we\'ll find the best way to make it work.',
            )}
            <div className="contact-form__field">
              <label htmlFor="intake-budget" className="contact-form__label">
                Your total project budget
              </label>
              <div className="intake__money">
                <span className="intake__money-prefix" aria-hidden>
                  $
                </span>
                <input
                  id="intake-budget"
                  className="contact-form__input intake__money-input"
                  inputMode="numeric"
                  placeholder="0"
                  value={answers.budget ? Number(answers.budget).toLocaleString('en-US') : ''}
                  onChange={(event) =>
                    update({
                      budget: event.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9),
                      budgetUnsure: false,
                    })
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && answers.budget) goNext()
                  }}
                />
              </div>
            </div>
            <div className="intake__actions">
              {continueButton(!answers.budget)}
              <button
                type="button"
                className={`intake__secondary${answers.budgetUnsure ? ' intake__secondary--selected' : ''}`}
                aria-pressed={answers.budgetUnsure}
                onClick={() => choose({ budget: '', budgetUnsure: true })}
              >
                Not sure yet
              </button>
            </div>
          </>
        )

      case 'flexible':
        return (
          <>
            {heading(
              'Thanks for being upfront',
              isIdea
                ? 'Every idea is different, and depending on yours, we can sometimes get creative with phased builds, payment plans, or partnership-style arrangements. Tell us a bit more so we can see what\'s possible.'
                : 'Every organization is different, and depending on yours, we can sometimes get creative with phased builds, payment plans, or partnership-style arrangements. Tell us a bit more so we can see what\'s possible.',
            )}
            <label className="intake__checkbox">
              <input
                type="checkbox"
                checked={answers.openToFlexible}
                onChange={(event) => update({ openToFlexible: event.target.checked })}
              />
              <span>I'm open to discussing flexible arrangements</span>
            </label>
            <div className="contact-form__field">
              <label htmlFor="intake-context" className="contact-form__label">
                {isIdea ? 'Anything else about your idea?' : 'Anything else about your organization?'}{' '}
                <span className="contact-form__optional">(optional)</span>
              </label>
              <textarea
                id="intake-context"
                className="contact-form__input contact-form__textarea"
                placeholder={
                  isIdea
                    ? 'Who it\'s for, any progress so far, your plans for it'
                    : 'How long you\'ve been running, who you serve, your growth plans'
                }
                value={answers.businessContext}
                onChange={(event) => update({ businessContext: event.target.value })}
                rows={5}
                maxLength={5000}
              />
            </div>
            {continueButton()}
          </>
        )

      case 'payment':
        return (
          <>
            {heading(
              'How would you prefer to pay?',
              'Every project can be split into payments to keep your cash flow manageable.',
            )}
            <OptionGrid
              options={paymentPlanOptions}
              selected={answers.paymentPlan}
              onSelect={(id) => choose({ paymentPlan: id })}
            />
          </>
        )

      case 'contact':
        return (
          <form className="contact-form" onSubmit={handleSubmit}>
            {heading('Last step: how can we reach you?')}
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="intake-name" className="contact-form__label">
                  Name
                </label>
                <input
                  id="intake-name"
                  name="name"
                  className="contact-form__input"
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="intake-email" className="contact-form__label">
                  Email
                </label>
                <input
                  id="intake-email"
                  name="email"
                  type="email"
                  className="contact-form__input"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="intake-phone" className="contact-form__label">
                  Phone <span className="contact-form__optional">(optional)</span>
                </label>
                <input
                  id="intake-phone"
                  name="phone"
                  type="tel"
                  className="contact-form__input"
                  autoComplete="tel"
                  maxLength={40}
                />
              </div>
              {!isIdea && (
                <div className="contact-form__field">
                  <label htmlFor="intake-company" className="contact-form__label">
                    Business or organization name <span className="contact-form__optional">(optional)</span>
                  </label>
                  <input
                    id="intake-company"
                    name="company"
                    className="contact-form__input"
                    autoComplete="organization"
                    maxLength={120}
                  />
                </div>
              )}
            </div>

            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="intake-website">Website</label>
              <input id="intake-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && (
              <p className="contact-form__error" role="alert">
                {errorMessage} You can also email us at{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            )}

            <button
              type="submit"
              className="hero__button hero__button--primary contact-form__submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Submitting…' : 'Submit request'}
            </button>
          </form>
        )
    }
  }

  return (
    <>
      <section className="page contact-header">
        <div className="page__inner">
          <p className="page__eyebrow">{stageLocked ? 'Share your idea' : 'Start a project'}</p>
          <h1 className="page__title">
            {stageLocked ? 'Tell us about your ' : 'Let\'s build something '}
            <span className="home_content__highlight">{stageLocked ? 'idea' : 'great'}</span>
          </h1>
          <p className="page__intro">
            Answer a few quick questions and we'll follow up with next steps and a free
            consultation. It only takes a couple of minutes.
          </p>
        </div>
      </section>

      <section className="home_content__section home_content__section--alt">
        <div className="home_content__inner">
          <div className="contact__card intake">
            {status === 'sent' ? (
              <div className="contact-form__success" role="status">
                <FaCircleCheck aria-hidden className="contact-form__success-icon" />
                <h2 className="contact__card-title intake__title" ref={headingRef} tabIndex={-1}>
                  Thanks{submittedName ? `, ${submittedName}` : ''}! We've received your request.
                </h2>
                <p className="contact__text">
                  We'll review the details and get back to you within a day or two. In the
                  meantime, if your request is urgent or you'd like more info, feel free to call,
                  text, or send a quick email.
                </p>
                <ul className="contact__details intake__reach">
                  <li className="contact__detail">
                    <span className="contact__detail-icon">
                      <FaPhone aria-hidden />
                    </span>
                    <div>
                      <p className="contact__detail-label">Call or text</p>
                      <a href={contactPhone.href} className="contact__detail-link">
                        {contactPhone.label}
                      </a>
                    </div>
                  </li>
                  <li className="contact__detail">
                    <span className="contact__detail-icon">
                      <FaEnvelope aria-hidden />
                    </span>
                    <div>
                      <p className="contact__detail-label">Email</p>
                      <a href={`mailto:${contactEmail}`} className="contact__detail-link">
                        {contactEmail}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="intake__progress">
                  <div className="intake__progress-row">
                    {stepIndex > 0 ? (
                      <button type="button" className="intake__back" onClick={goBack}>
                        <FaArrowLeft aria-hidden /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <span className="intake__progress-label">
                      Step {stepIndex + 1} of {steps.length}
                    </span>
                  </div>
                  <div
                    className="intake__progress-track"
                    role="progressbar"
                    aria-label="Form progress"
                    aria-valuemin={1}
                    aria-valuemax={steps.length}
                    aria-valuenow={stepIndex + 1}
                  >
                    <div
                      className="intake__progress-fill"
                      style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div key={step} className="intake__step">
                  {renderStep()}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default StartProject
