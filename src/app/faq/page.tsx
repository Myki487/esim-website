import Image from 'next/image'
import FaqCategory from '@/components/FaqCategory'
import { troubleshootingFaqs, generalFaqs, managingEsimFaqs } from '@/data/faq'

export default function FAQPage() {
  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src="/faq-bg.jpg"
          alt="FAQ background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div>
          <FaqCategory title="Troubleshooting" items={troubleshootingFaqs} />
          <FaqCategory title="Frequently Asked Questions" items={generalFaqs} />
        </div>
        <div>
          <FaqCategory title="Managing eSIM's" items={managingEsimFaqs} />
        </div>
      </div>
    </div>
  )
}
