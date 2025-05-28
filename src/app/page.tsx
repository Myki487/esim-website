import SearchCountry from '@/components/SearchCountry'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Find your eSIM</h1>
      <SearchCountry />
    </div>
  )
}