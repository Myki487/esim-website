'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default function CompatibilityDetails() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-2">
      <Accordion type="single" collapsible className="w-full">

        <AccordionItem value="apple">
          <AccordionTrigger>Apple</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: your phone or device must also be Carrier-Unlocked to use eSIM.</p>
            <p>List of Apple Devices Compatible With eSIMs:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {[
                "iPhone XR", "iPhone XS", "iPhone XS Max", "iPhone 11", "iPhone 11 Pro", "iPhone SE 2 (2020)", "iPhone 12", "iPhone 12 Mini",
                "iPhone 12 Pro", "iPhone 12 Pro Max", "iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone SE 3 (2022)",
                "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15 Pro", "iPhone 15 Pro Max"
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
            <p className="mt-2">
              * On iPhone 13 and 14 models, you can have two eSIMs activated at the same time.<br />
              * iPhones from mainland China and iPhone devices from Hong Kong and Macao (except for iPhone 13 mini, iPhone 12 mini,
              iPhone SE 2020, and iPhone XS) don’t have eSIM capability.<br />
              * iPhone 14, iPhone 14 Plus, iPhone 14 Pro, and iPhone 14 Pro Max are not compatible with physical SIM cards in the USA.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="samsung">
          <AccordionTrigger>Samsung</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: your phone or device must also be carrier-unlocked to use eSIM.</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "Samsung Galaxy S20", "Samsung Galaxy S20+", "Samsung Galaxy S20 Ultra", "Samsung Galaxy S21",
                "Samsung Galaxy S21+ 5G", "Samsung Galaxy S21+ Ultra 5G", "Samsung Galaxy S22", "Samsung Galaxy S22+",
                "Samsung Galaxy S22 Ultra", "Samsung Galaxy Note 20", "Samsung Galaxy Note 20 Ultra 5G", "Samsung Galaxy Fold",
                "Samsung Galaxy Z Fold2 5G", "Samsung Galaxy Z Fold3 5G", "Samsung Galaxy Z Fold4", "Samsung Galaxy Z Flip",
                "Samsung Galaxy Z Flip3 5G", "Samsung Galaxy Z Flip4", "Samsung S24"
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Not compatible:</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "Samsung Galaxy S20 FE 4G/5G", "Samsung S20/S21 (US versions)", "Galaxy Z Flip 5G (US versions)",
                "Samsung Note 20 Ultra (Versions from the US and Hong Kong)", "Samsung Galaxy Z Fold 2 (Versions from the US and Hong Kong)"
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="google">
          <AccordionTrigger>Google</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: your phone or device must also be carrier-unlocked to use eSIM.</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "Google Pixel 2 (only phones bought with Google Fi service)", "Google Pixel 2 XL", "Google Pixel 3", "Google Pixel 3 XL",
                "Google Pixel 3a", "Google Pixel 3a XL", "Google Pixel 4", "Google Pixel 4a", "Google Pixel 4 XL", "Google Pixel 5",
                "Google Pixel 5a", "Google Pixel 6", "Google pixel 6a", "Google Pixel 6 Pro", "Google Pixel 7", "Google Pixel 7 Pro",
                "Google Pixel 8"
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Not compatible:</p>
            <ul className="list-disc list-inside">
              <li>Google Pixel 3 devices from Australia, Japan, and Taiwan</li>
              <li>Google Pixel 3a from South East Asia</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="huawei">
          <AccordionTrigger>Huawei</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: Your phone or device must also be carrier-unlocked in order to use eSIM.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Huawei P40</li>
              <li>Huawei P40 Pro</li>
              <li>Huawei Mate 40 Pro</li>
            </ul>
            <p className="mt-2 font-semibold">Not compatible:</p>
            <p>Huawei P40 Pro+ and P50 Pro</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="laptop">
          <AccordionTrigger>Laptop and Notebook</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Laptops:</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "Microsoft Surface Pro X", "Microsoft Surface Go 2", "Microsoft Surface Pro LTE Advanced", "Acer Swift 3",
                "Asus Mini Transformer", "Asus NovaGo", "Asus VivoBook Flip 14", "Samsung Galaxy Book 2", "Lenovo Yoga 520",
                "Lenovo Miix 630", "Lenovo Yoga C630", "HP Specter Folio 13", "HP Probook G5", "HP Elitebook G5"
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">Notebooks:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Acer Swift 7</li>
              <li>HP Zbook G5</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="oppo">
          <AccordionTrigger>Oppo</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: your phone or device must also be carrier-unlocked to use eSIM.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Oppo Find X3 Pro</li>
              <li>Oppo Reno 5A</li>
              <li>Oppo Find X5</li>
              <li>Oppo Find X5 Pro</li>
            </ul>
            <p className="mt-2 font-semibold">Not compatible:</p>
            <p>Oppo Find X5 Lite</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="other">
          <AccordionTrigger>Other</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 font-semibold">Important: your phone or device must also be carrier-unlocked to use eSIM.</p>
            <p>Additional Handsets:</p>
            <ul className="list-disc list-inside space-y-1">
              {[
                "Motorola Razr 2019", "Motorola Razr 5G", "Gemini PDA", "Rakuten Mini", "Rakuten Big-S", "Rakuten Big",
                "Rakuten Hand", "Rakuten Hand 5G", "Sony Xperia 10 III Lite", "Sony Xperia 10 IV", "Xperia 1 IV",
                "Honor Magic 4 Pro", "Fairphone 4", "Sharp Aquos Sense6s", "Sharp Aquos Wish", "Xiaomi 12T Pro", "DOOGEE V30"
              ].map((device) => (
                <li key={device}>{device}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
