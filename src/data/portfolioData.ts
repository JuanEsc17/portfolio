import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  brand: 'JUAN DEV',
  greeting: "¡HOLA, SOY JUAN! 👋",
  title: 'DESARROLLADOR DE SOFTWARE',
  subtitle: 'Construyo aplicaciones web escalables y transformo ideas en productos de alto impacto con código limpio y eficiente. \n Estudiante avanzado de Analista Programador Universitario UNLP',
  avatarUrl: '/perfil.jpg',
  resumeUrl: '/cv.pdf',
  statusBadge: {
    available: true,
    text: 'DISPONIBLE PARA TRABAJAR'
  },
  codeSnippet: {
    language: 'typescript',
    lines: [
      '> const desarrollador = {',
      "  codigo: 'TypeScript',",
      "  construyo: 'React',",
      "  despliegue: 'Vercel',",
      "  pasion: 'Resolver problemas'",
      '}'
    ]
  },
  socials: [
    {
      platform: 'github',
      url: 'https://github.com/JuanEsc17',
      label: 'GitHub'
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/juan-escudero-ab6428255/',
      label: 'LinkedIn'
    },
    {
      platform: 'email',
      url: '',
      label: 'Email'
    }
  ],
  skills: [
    { name: 'Python', icon: 'python' },
    { name: 'React', icon: 'react' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Git', icon: 'git' }
  ],
  projects: [
    {
      id: 'siempregym',
      title: 'SIEMPREGYM',
      images: [
        '/projects/siempregym1.png',
        '/projects/siempregym2.png',
        '/projects/siempregym3.png'
      ],
      description: 'Una aplicación de gestión de turnos de un gimnasio.',
      longDescription: 'SiempreGym es una aplicación de gestión construida con React y NodeJs que permite la gestión de turnos, ingresos y perfiles. Proporciona la inscripción y cancelación de turnos por parte del cliente y un panel de administración para adminitradores y empleados con una interfaz amigable y responsiva. Trabajo integrador realizado en grupo bajo el marco de la materia "Ingeniería de Software 2"',
      tags: ['React', 'Node.js', 'Mercado Pago'],
      githubUrl: 'https://github.com/JuanEsc17/SiempreGym',
      featured: true
    },
    {
      id: 'nlp',
      title: 'WIKI NLP',
      images: [
        '/projects/wiki-nlp1.png',
        '/projects/wiki-nlp2.png'
      ],
      description: 'Página estática con información de cada servicio desarrollado.',
      longDescription: 'Wiki donde muestra la información de cada servicio desarrollado dentro del proyecto de investigación "Uso de NLP, AI y LLMs a Textos Semiestructurados" dentro del centro LIFIA (Laboratorio de Investigación y Formación en Informática Avanzada).',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://reqwithnlp-dotcom.github.io/Uso-de-NLP-AI-y-LLMs-a-textos-semiestructurados-para-mejorar-la-calidad-y-extraer-informacion/',
      featured: true
    },
    {
      id: 'datahogar.ar',
      title: 'DATAHOGAR.AR',
      images: [
        '/projects/datahogar1.png',
        '/projects/datahogar2.png',
        '/projects/datahogar3.png'
      ],
      description: 'Sistema de visualización y analisis de datos.',
      longDescription: 'Este proyecto utiliza Streamlit para visualizar y analizar datos provenientes de encuestas de hogares e individuos. El objetivo es explorar distintos indicadores sociales y económicos a través de una interfaz visual. Trabajo integrador realizado en grupo en el marco de la materia "Seminario de Lenguajes - Python"',
      tags: ['Python', 'Pandas', 'Streamlit'],
      githubUrl: 'https://github.com/JuanEsc17/DataHogar.AR',
      featured: true
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Desarrollo Full Stack',
      issuer: 'Streambe',
      date: '2022',
      description: 'Bootcamp enfocado en el desarrollo web con tecnologías como: Javascript, HTML y CSS.',
      credentialUrl: 'https://drive.google.com/file/d/1nMuSQM8Frxll_-RvE5ABCjw9VrkydHc5/view?usp=sharing'
    },
    {
      id: 'cert-2',
      title: 'ExpoCiencia 2025',
      issuer: 'Facultad de Informática - UNLP',
      date: '2025',
      description: 'Certificado demostrando mi participación en el proyecto de investigación "Técnicas de NLP y AI aplicadas a textos semi-estructurados para identificar similitud y extraer información”. Tecnologías usadas: Python, spaCy.',
      credentialUrl: 'https://drive.google.com/file/d/16RHVoh4FiGlwG7rKeBJR5vyD1b6MDYVA/view'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'ESTUDIANTE INVESTIGADOR',
      company: 'LIFIA.',
      period: 'MARZO 2025 - PRESENTE',
      description: 'Colaboración en proyecto de investigación de NLP desarrollando y evaluando modelos de lenguaje y clasificación semántica.',
      technologies: ['Python', 'spaCy', 'Hugging Face Transformers']
    },
    {
      id: 'exp-2',
      role: 'DESARROLLADOR WEB FREELANCE',
      period: '2025 - PRESENTE',
      description: 'Construyo sitios web interactivos y herramientas internas optimizadas para diversos clientes.',
      technologies: ['JavaScript', 'React', 'CSS3', 'Node.js']
    }
  ],
  cta: {
    heading: 'CONSTRUYAMOS ALGO INCREÍBLE JUNTOS.',
    buttonText: 'CONTÁCTAME'
  }
};
