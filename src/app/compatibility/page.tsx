import Image from 'next/image'
import DeviceCompatibility from '@/components/Compatibility'

export default function CompatibilityPage() {
  return (
    <div>
      <div className="relative h-96 w-full">
        <Image
          src="/compatibility-bg.jpg"
          alt="Compatibility background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Compatible Devices</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="mb-6">
          <strong>Please note:</strong> Devices manufactured prior to 2018 will not be eSIM compatible.
          We continually maintain our device compatibility lists to ensure it contains all devices that are compatible with eSIM technology and our service.
        </p>

        <DeviceCompatibility />
      </div>
    </div>
  )
}