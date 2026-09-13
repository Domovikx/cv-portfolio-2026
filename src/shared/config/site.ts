export const site = {
  title: 'Илья Ивановский — Frontend-разработчик (React + Angular)',
  repoUrl: 'https://github.com/DomovikX/cv-portfolio-2026',
  url: 'https://domovikx.github.io/cv-portfolio-2026/',
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    // Публичный ключ Web3Forms — безопасно светить в статике (спам-защита сервиса:
    // honeypot + rate limit; заявки уходят на привязанную почту).
    accessKey: '2dd5b93d-7876-4ce7-9b75-b04b5c0324f6',
    subject: 'CV: заявка с портфолио',
  },
} as const
