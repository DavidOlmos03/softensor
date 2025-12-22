# Softensor - Landing Page

Landing page moderna para equipo de desarrollo de software con estilo neon sunset.

## 🚀 Características

- ⚡ **Next.js 16** con TypeScript para desarrollo robusto y tipado
- 🎨 **Tailwind CSS** con tema personalizado neon sunset
- 🌍 **i18n** - Soporte multiidioma (Español/Inglés)
- 🌓 **Dark/Light Mode** - Sistema de temas con persistencia
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- ♻️ **Componentes Reutilizables** - Arquitectura modular y escalable

## 🎨 Paleta de Colores Neon Sunset

- **Neon Pink**: #FF006E
- **Neon Purple**: #8338EC
- **Neon Blue**: #3A86FF
- **Neon Cyan**: #06FFF0
- **Neon Orange**: #FB5607
- **Neon Yellow**: #FFBE0B

## 📦 Instalación

### Opción 1: Docker (Recomendado) 🐳

```bash
# Desarrollo
make dev
# o
docker-compose -f docker-compose.dev.yml up --build

# Producción (Next.js + Nginx)
make prod
# o
docker-compose -f docker-compose.yml up --build -d
```

**Ver documentación completa**: [DOCKER.md](./DOCKER.md)

### Opción 2: NPM Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 🏗️ Estructura del Proyecto

```
softensor/
├── components/
│   ├── common/          # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   ├── Section.tsx
│   │   └── SectionTitle.tsx
│   └── sections/        # Secciones de la landing
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Team.tsx
│       ├── TeamMemberCard.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── contexts/
│   └── ThemeContext.tsx # Context API para tema
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public/
│   └── locales/         # Archivos de traducción
│       ├── es/
│       │   └── common.json
│       └── en/
│           └── common.json
├── styles/
│   └── globals.css
├── types/
│   └── team.ts          # Tipos TypeScript
├── next.config.js
├── next-i18next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 👥 Equipo

El equipo está compuesto por profesionales de diferentes áreas:

- **Físicos** - Especialistas en computación cuántica y física computacional
- **Matemáticos** - Expertos en algoritmos y optimización
- **Ingenieros de Sistemas** - Desarrollo full stack y arquitectura cloud
- **Estadísticos** - Análisis de datos y modelado estadístico

## 🛠️ Tecnologías

### Frontend
- React 19
- Next.js 16
- TypeScript
- Tailwind CSS

### Backend & Cloud
- Python
- Java
- AWS, Azure, GCP

### IA & ML
- TensorFlow
- PyTorch

### Bases de Datos
- PostgreSQL
- MongoDB

## 🎯 Valores

- **Apoyo a Pequeñas Empresas** - Ayudamos a emprendedores a crecer
- **Desarrollo Integral** - Crecimiento académico y profesional
- **Innovación Continua** - Últimas tecnologías y metodologías

## 📝 Personalización

### Agregar Miembros del Equipo

Edita el archivo `components/sections/Team.tsx`:

```typescript
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Tu Nombre',
    role: 'physicist', // physicist | mathematician | engineer | statistician
    specialties: ['Especialidad 1', 'Especialidad 2'],
  },
  // ... más miembros
];
```

### Cambiar Idiomas

Los archivos de traducción están en `public/locales/[lang]/common.json`.

### Modificar Temas

Edita `tailwind.config.ts` para personalizar colores y estilos.

## 🌐 Despliegue

El proyecto está listo para desplegarse en:

- Vercel (recomendado)
- Netlify
- AWS Amplify
- Cualquier hosting con soporte para Next.js

## 📄 Licencia

© 2025 Softensor. Todos los derechos reservados.

---

**Softensor** - Innovación impulsada por la ciencia 🚀
