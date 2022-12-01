export const API_ENDPOINT = 'https://rss-kanban-backend.onrender.com';

export const tokenExpirationValue = 4 * 60 * 60 * 1000;  // 4 hours in ms

export const teamMembers = [
  {
    id: 1,
    name: 'Andrei Rumakin',
    img: '',
    points: ['team-lead', 'authorization', 'перетаскивание колонок и задач', 'локализацию приложения'],
  },
  {
    id: 2,
    name: 'Tatsiana Rusak',
    img: '',
    points: ['design', 'layout', 'confirmation dialog', 'editable column title' ],
  },
  {
    id: 3,
    name: 'Andrey Komissarov',
    img: '',
    points: [ 'построение базовой структуры приложения', 'backend', 'запросы к API'],
  },
];
