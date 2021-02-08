export function seed(knex) {
  return knex('devices').insert([
    {
      _id: '71910d91-359b-4d05-9b6a-2e15131186f7',
      model: 'MacBook Pro',
      OS: 'macOS Big Sur',
      brand: 'Apple',
      isAvailable: true,
      createdAt: '2021-01-28 15:36'
    },
    {
      _id: 'c8a4d7f2-f2fc-4574-b64f-261e6b1de419',
      model: 'MacBook Pro',
      OS: 'MacOS Big Sur',
      brand: 'Apple',
      isAvailable: true,
      createdAt: '2021-01-28 09:15'
    },
    {
      _id: '15be3859-14d8-4144-bba5-104b8d432f12',
      model: 'iPhone 12',
      OS: 'iOS 14.3',
      brand: 'Apple',
      isAvailable: true,
      createdAt: '2021-01-29 10:52'
    }
  ]);
}
