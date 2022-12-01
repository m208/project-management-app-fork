export const API_ENDPOINT = 'https://rss-kanban-backend.onrender.com';

export const tokenExpirationValue = 4 * 60 * 60 * 1000;  // 4 hours in ms

export const teamMembers = [
  {
    id: 1,
    name: 'Andrei Rumakin',
    img: 'boy1',
    points: ['MEMBER_A_RUMAKIN.POINT1', 'MEMBER_A_RUMAKIN.POINT2', 'MEMBER_A_RUMAKIN.POINT3', 'MEMBER_A_RUMAKIN.POINT4'],
  },
  {
    id: 2,
    name: 'Tatsiana Rusak',
    img: 'girl',
    points: ['MEMBER_T_RUSAK.POINT1', 'MEMBER_T_RUSAK.POINT2', 'MEMBER_T_RUSAK.POINT3', 'MEMBER_T_RUSAK.POINT4', 'MEMBER_T_RUSAK.POINT5' ],
  },
  {
    id: 3,
    name: 'Andrey Komissarov',
    img: 'boy2',
    points: [ 'MEMBER_A_KOMISSAROV.POINT1', 'MEMBER_A_KOMISSAROV.POINT2', 'MEMBER_A_KOMISSAROV.POINT3'],
  },
];
