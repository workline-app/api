export function seed(knex) {
  return knex('users').insert([
    {
      _id: '5f220d29da8ffa003d250046',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@doe.com',
      title: 'Software Engineer',
      isEmployed: true,
      isCompleted: true,
      createdAt: '2021-01-20 17:54:04.77073-05'
    },
    {
      _id: '600a76cecdf2b50071c682e7',
      firstname: 'Rocky',
      lastname: 'Lavach',
      email: 'rocky@cute.com',
      title: 'UX Designer',
      isEmployed: true,
      isCompleted: true,
      createdAt: '2021-01-22 01:55:10.357087-05'
    },
    {
      _id: '600b4c72bab9d3006b2877a4',
      firstname: 'Patrick',
      lastname: 'Shawn',
      email: 'patrick@shawn.com',
      title: 'Technical Recruiter',
      isEmployed: true,
      isCompleted: true,
      createdAt: '2021-01-22 17:06:42.119603-05'
    }
  ]);
}
