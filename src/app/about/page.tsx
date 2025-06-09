'use client'

import Image from 'next/image'
import { useTranslation, Trans } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src="/about-bg.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            {t('about.title')}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-500">
          {t('about.who')}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          <Trans i18nKey="about.p1">
            At <span className="font-semibold text-gray-400">travelsgo.com</span>, we are passionate about making travel simpler and more connected.
          </Trans>
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('about.p2')}
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('about.p3')}
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('about.p4')}
        </p>
      </div>
    </div>
  )
}
