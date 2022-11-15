export const API_ENDPOINT = 'https://rss-kanban-backend-production.up.railway.app';

export const tokenExpirationValue = 4 * 60 * 3600;  // 4 hours in ms

export const TEXTS = {
  russian: {
    welcomeHeader: `<span class="home__heading_m">Система</span><span class="home__heading_s">управления</span><span class="home__heading_l">задачами</span>`,
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
}
