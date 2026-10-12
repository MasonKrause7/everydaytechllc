import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import { consultationCalLink } from '../data/booking'
import { trackEvent, trackLead } from '../utils/analytics'
import '../styles/components/BookingCalendar.css'

type BookingCalendarProps = {
  calLink: string
  name?: string
  email?: string
  notes?: string
}

const namespaceFor = (calLink: string) => calLink.replace(/[^a-z0-9]/gi, '-')

function BookingCalendar({ calLink, name, email, notes }: BookingCalendarProps) {
  const namespace = namespaceFor(calLink)

  useEffect(() => {
    const onBooked = () => {
      const page = window.location.pathname
      if (calLink === consultationCalLink) trackLead('booking', { page })
      else trackEvent('booking_completed', { event: calLink.split('/').pop(), page })
    }
    const calApi = getCalApi({ namespace })

    calApi.then((cal) => {
      cal('ui', {
        theme: 'light',
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#3b6bff' },
          dark: { 'cal-brand': '#7e3bff' },
        },
      })
      cal('on', { action: 'bookingSuccessfulV2', callback: onBooked })
    })
    return () => {
      calApi.then((cal) => cal('off', { action: 'bookingSuccessfulV2', callback: onBooked }))
    }
  }, [calLink, namespace])

  const prefill = Object.fromEntries(
    Object.entries({ name, email, notes }).filter((entry): entry is [string, string] => Boolean(entry[1])),
  )

  return (
    <div className="booking-calendar">
      <Cal
        namespace={namespace}
        calLink={calLink}
        config={{ ...prefill, layout: 'month_view', theme: 'light' }}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      />
    </div>
  )
}

export default BookingCalendar
