export const API_ENDPOINT = 'https://rss-kanban-backend-production.up.railway.app';

export const tokenExpirationValue = 4 * 60 * 3600;  // 4 hours in ms

export const TEXTS = {
  russian: {
    welcomeHeader: `<span class="home__heading_l">Система</span><span class="home__heading_s">управления</span><span class="home__heading_m"> задачами</span>`,
    welcomeText: `
                  <p>
                    Система управления задачами, или таск-менеджер,&nbsp;– это сервис, позволяющий собрать все рабочие задания в едином пространстве. Простой и понятный интерфейс позволит вам создавать списки задач, а также перетаскивать карточки между колонками, изменяя их статус.
                  </p>

                  <p>
                    Таск-менеджер поможет:

                    <ul>
                      <li><span>структурировать и сделать более прозрачной работу компании;</span></li>
                      <li><span>cпланировать работу над проектом;</span></li>
                      <li><span>организовать коммуникацию между участниками проекта;</span></li>
                      <li><span>ускорить онбординг новых работников.</span></li>

                    </ul>
                  </p>
                  `,
  },
  english: {
    welcomeHeader: '<span class="home__heading_m">PROJECT</span><span class="home__heading_s">management</span><span class="home__heading_l">SYSTEM</span>',
    welcomeText: `
                <p>
                  The task management system, or task manager, is a service that allows you to collect all work tasks in a single space. A&nbsp;simple and intuitive interface will allow you to create task lists, as well as drag and drop cards between columns, changing their status.
                </p>

                <p>
                  The task manager will help to:

                  <ul>
                    <li><span>structure and make the company's work more transparent;</span></li>
                    <li><span>plan the work on the project;</span></li>
                    <li><span>organize communication between project participants;</span></li>
                    <li><span>accelerate the onboarding of new employees.</span></li>
                  </ul>
                </p>
                `,
  },
}
