import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div>
      <div className="relative h-96 w-full">
        <Image
          src="/contact-bg.jpg"
          alt="Contact background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <ContactForm />
    </div>
  )
}
