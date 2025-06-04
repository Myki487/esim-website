'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { FaqItem } from '@/types/FaqItem';


export default function FaqCategory({ title, items }: { title: string; items: FaqItem[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? items : items.slice(0, 3)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {visibleItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${title}-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-400 px-3">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {items.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {showAll ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
