# 🚀 Quick Start - Softensor

Guía rápida para comenzar con Softensor en 5 minutos.

---

## ⚡ Inicio Súper Rápido

### Desarrollo (con Docker)

```bash
# 1. Clonar o navegar al proyecto
cd softensor

# 2. Iniciar desarrollo
make dev

# 3. Abrir navegador
# http://localhost:3000
```

¡Listo! 🎉

---

## 🏭 Producción (con Docker + Nginx)

```bash
# 1. Configurar variables de entorno
cp .env.example .env.production
# Editar .env.production si es necesario

# 2. Iniciar producción
make prod

# 3. Acceder
# http://localhost
```

---

## 📋 Comandos Más Usados

```bash
# Desarrollo
make dev              # Iniciar desarrollo
make dev-d            # Desarrollo en background
make logs-dev         # Ver logs

# Producción
make prod             # Iniciar producción
make logs             # Ver logs
make restart          # Reiniciar

# Mantenimiento
make down             # Detener todo
make clean            # Limpiar recursos
make status           # Ver estado
make health           # Health check

# Ayuda
make help             # Ver todos los comandos
```

---

## 🔧 Sin Docker (NPM)

```bash
# Instalar
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

---

## 🌍 Cambiar Idioma

- **Español**: http://localhost:3000/es
- **Inglés**: http://localhost:3000/en

O usar el selector en la navegación.

---

## 🌓 Modo Dark/Light

Clic en el botón ☀️/🌙 en la navegación.

---

## 📁 Estructura Básica

```
softensor/
├── components/       # Componentes React
├── pages/           # Páginas Next.js
├── public/locales/  # Traducciones
├── styles/          # Estilos CSS
├── docker-compose.yml      # Producción
├── docker-compose.dev.yml  # Desarrollo
└── Makefile         # Comandos rápidos
```

---

## 🐛 Solución Rápida de Problemas

### Puerto ocupado
```bash
# Cambiar puerto en .env.development
DEV_PORT=3001
```

### Cache corrupto
```bash
make clean
make dev
```

### Cambios no se ven
```bash
# Desarrollo
make restart-dev

# Producción
make down
make prod
```

---

## 📚 Documentación Completa

- **Docker**: [DOCKER.md](./DOCKER.md)
- **Despliegue**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **README**: [README.md](./README.md)

---

## ✨ Próximos Pasos

1. **Personalizar equipo**: Edita `components/sections/Team.tsx`
2. **Cambiar traducciones**: Modifica `public/locales/*/common.json`
3. **Ajustar colores**: Edita `styles/globals.css`
4. **Desplegar**: Sigue [DOCKER.md](./DOCKER.md) o [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**¿Necesitas ayuda?** Abre un issue en GitHub.

**¡Feliz desarrollo!** 🚀
