import SearchCountry from '@/components/SearchCountry';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-travels-go-dark-purple text-travels-go-text-light flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt="World map and travel items"
        fill
        quality={100}
        priority={true}
        className="object-cover opacity-30"
      />

      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto mt-14">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-poppins font-extrabold text-travels-go-blue-accent drop-shadow-lg animate-fade-in-up">
          TravelsGo
        </h1>
        <p className="text-4xl md:text-5xl font-poppins font-bold text-travels-go-text-light drop-shadow-md animate-fade-in-up delay-200">
          Travel the world for less
        </p>
        <p className="text-xl md:text-2xl font-inter text-travels-go-text-gray animate-fade-in-up delay-400">
          Never worry about data again with affordable and convenient plans.
        </p>

        <div className="mt-10 animate-fade-in-up delay-600">
          <SearchCountry />
        </div>
      </div>
    </div>
  )
}