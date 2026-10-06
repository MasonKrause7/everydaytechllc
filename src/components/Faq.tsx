import { FaChevronDown } from 'react-icons/fa6'
import '../styles/components/Faq.css'

export type FaqItem = { question: string; answer: string }

function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq__item">
          <summary className="faq__question">
            {item.question}
            <FaChevronDown aria-hidden className="faq__chevron" />
          </summary>
          <p className="faq__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default Faq
