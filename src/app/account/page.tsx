import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const fakeUser = {
    name: 'Іван Користувач',
    email: 'ivan@example.com',
    purchases: [
      { id: 1, country: 'США', plan: '1 ГБ / 7 днів', date: '2025-04-01' },
      { id: 2, country: 'Італія', plan: '3 ГБ / 30 днів', date: '2025-04-15' },
    ],
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Мій кабінет</h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-lg font-medium">ПІБ: {fakeUser.name}</p>
          <p className="text-gray-600">Email: {fakeUser.email}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Мої покупки</h2>
      <div className="space-y-3">
        {fakeUser.purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardContent className="p-4">
              <p className="font-medium">{purchase.country}</p>
              <p className="text-sm text-gray-600">План: {purchase.plan}</p>
              <p className="text-sm text-gray-500">Дата: {purchase.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button>Редагувати профіль</Button>
      </div>
    </div>
  )
}
