import type { ResumeData } from '../types/resume'

const skills = [
  'React.js',
  'Next.js',
  'Redux.js',
  'AG Grid',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'JavaScript',
  'TypeScript',
  'Java',
  'MySQL',
  'PostgreSQL',
  'OpenSearch',
  'GraphQL',
  'REST APIs',
  'HTML',
  'Git',
  'Jira',
  'SDLC'
]

export const defaultResume: ResumeData = {
  basics: {
    name: 'Anish Rachcha',
    title: 'Software Engineer',
    location: 'Pune, India',
    email: 'anishrachcha@gmail.com',
    phone: '9423749050',
    summary:
      'Software Engineer with 2+ years of experience building and scaling backend and distributed systems, with full-stack experience across NestJS, Node.js, React, and TypeScript. Proven track record of architecting microservices from scratch, optimizing OpenSearch performance (3x throughput), and delivering low-latency GraphQL APIs. Strong in backend architecture, performance optimization, and building reliable systems in Agile, cross-functional environments.',
    resumeUrl: 'https://drive.google.com/file/d/1vhCckv_4YMvapGrvszodj2KH0YOCaLQb/view?usp=sharing',
    social: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/anish-rachcha-abb74517a/' },
      { label: 'GitHub', url: 'https://github.com/AnishR5' }
    ]
  },
  highlights: [
    'Architected microservices with DAO-based modular design, reducing integration effort by 40%.',
    'Optimized OpenSearch indexing and queries, increasing throughput by 3x.',
    'Reduced data-fetch latency by 30% through high-performance GraphQL APIs.',
    'Built React.js modules handling 10,000+ records with improved rendering performance.'
  ],
  skills,
  experience: [
    {
      company: 'The Digital Group Inc',
      role: 'Software Engineer',
      location: 'Pune, India',
      duration: 'Oct 2023 - Present',
      highlights: [
        'Architected and delivered three production-ready NestJS microservices from scratch, implementing a DAO-based modular architecture that reduced integration effort by 40% and improved long-term maintainability.',
        'Designed and optimized OpenSearch indexing and queries, increasing search throughput by 3x and significantly improving system response times for large datasets.',
        'Built high-performance GraphQL APIs across multiple microservices, reducing data-fetch latency by 30% compared to legacy REST endpoints.',
        'Developed scalable React.js modules integrated with Redux and AG Grid, efficiently handling 10,000+ records while improving client-side rendering performance by 25%.',
        'Built and maintained public-facing APIs consumed by multiple internal teams, enabling real-time integration with external data sources and improving data freshness.',
        'Implemented live logging and monitoring dashboards for frontend and backend services, reducing error detection and incident resolution time by 50%.',
        'Designed and implemented a secure OneDrive-based document backup and offline access system, enabling real-time synchronization and ensuring full data availability.'
      ]
    }
  ],
  projects: [
    {
      name: 'Distributed Event & Activity Tracking Platform',
      duration: 'Jan 2026 - Feb 2026',
      description:
        'Distributed, backend-heavy event ingestion platform for high-throughput tracking and analytics.',
      techStack: ['NestJS', 'Redis Streams', 'PostgreSQL', 'OpenSearch'],
      highlights: [
        'Built a distributed event ingestion platform enabling high-throughput asynchronous processing and horizontal scalability.',
        'Implemented secure ingestion APIs with DTO-based validation, API key authentication, and per-source rate limiting.',
        'Decoupled ingestion from processing via Redis Streams, adding retries and Dead Letter Queues to isolate transient failures.',
        'Designed search-optimized OpenSearch indices with time-based partitioning and aggregation support.',
        'Added production-grade observability using structured logging, correlation IDs, and health checks.'
      ],
      links: {
        github: undefined,
        live: undefined
      }
    }
  ],
  education: [
    {
      degree: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
      institution: 'Centre for Development for Advanced Computing (CDAC)',
      duration: 'Mar 2023 - Aug 2023',
      location: 'Pune, India',
      details: [
        'Grade: A',
        'Coursework: HTML, CSS, JavaScript, React.js, REST APIs, SQL, NoSQL, Java, C#, .NET, Spring Boot, Git, Agile, Jira'
      ]
    },
    {
      degree: 'Bachelor of Engineering (Electrical Engineering)',
      institution: 'K.K. Wagh Institute of Engineering Education and Research',
      duration: '2018 - 2022',
      location: 'Nashik, India',
      details: ['CGPA: 8.89']
    }
  ],
  certifications: [
    'Goethe-Institut (German Language) - A2 Level',
    'CDAC Certification - PG-DAC (Advanced Computing)',
    'IELTS - 7 Band'
  ]
}
