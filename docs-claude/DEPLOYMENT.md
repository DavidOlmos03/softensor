# 🚀 Guía de Despliegue - Softensor

## ⚠️ Importante: S3 vs Alternativas

Este proyecto usa **Next.js con i18n y SSR**, por lo que **S3 estático NO es la opción ideal**.

---

## 🌟 Opción 1: Vercel (RECOMENDADO - Gratis)

### Ventajas
- ✅ Completamente GRATIS para proyectos personales
- ✅ Soporte nativo de Next.js e i18n
- ✅ SSL automático + CDN global
- ✅ Deploy en segundos
- ✅ Dominio personalizado incluido

### Despliegue

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login (primera vez)
vercel login

# 3. Desplegar
vercel

# 4. Para producción
vercel --prod
```

### Deploy con Git (Recomendado)

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. ¡Listo! Auto-deploy en cada push

**URL del proyecto:** `https://softensor.vercel.app`

---

## 🔧 Opción 2: AWS Amplify (Para usar AWS)

### Ventajas
- ✅ Soporta SSR y i18n
- ✅ Integración con servicios AWS
- ✅ Escalable
- ✅ CI/CD incluido

### Despliegue

```bash
# 1. Instalar Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configurar credenciales AWS
amplify configure

# 3. Inicializar proyecto
amplify init

# 4. Agregar hosting
amplify add hosting
# Seleccionar: Hosting with Amplify Console

# 5. Publicar
amplify publish
```

**Costo:** Capa gratuita generosa, luego ~$0.15 por GB transferido

---

## 📦 Opción 3: S3 + CloudFront (Estático - LIMITADO)

### ⚠️ Limitaciones
- ❌ Pierde routing i18n dinámico
- ❌ Sin SSR
- ❌ Requiere modificaciones al código

### Modificaciones Necesarias

#### 1. Actualizar `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

#### 2. Remover i18n de next.config.js (incompatible con export):

```javascript
// Eliminar esta línea
// const { i18n } = require('./next-i18next.config');
```

#### 3. Build estático:

```bash
npm run build
```

Esto generará una carpeta `out/` con archivos estáticos.

#### 4. Subir a S3:

```bash
# Crear bucket
aws s3 mb s3://softensor-landing

# Configurar como sitio web
aws s3 website s3://softensor-landing \
  --index-document index.html \
  --error-document 404.html

# Subir archivos
aws s3 sync out/ s3://softensor-landing --acl public-read

# Configurar CloudFront (recomendado para SSL)
```

#### 5. Política del bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::softensor-landing/*"
    }
  ]
}
```

**Costo S3:** ~$0.023 por GB almacenado + $0.09 por GB transferido

---

## 🏆 Comparación de Opciones

| Característica | Vercel | AWS Amplify | S3 + CloudFront |
|----------------|--------|-------------|-----------------|
| **Costo** | 💚 Gratis | 🟡 Capa gratuita | 🟡 Muy bajo |
| **Velocidad Setup** | 💚 5 minutos | 🟡 15 minutos | 🔴 30+ minutos |
| **SSR/i18n** | 💚 Completo | 💚 Completo | 🔴 Limitado |
| **SSL** | 💚 Automático | 💚 Automático | 🟡 Requiere CloudFront |
| **CI/CD** | 💚 Incluido | 💚 Incluido | 🔴 Manual |
| **Facilidad** | 💚 Muy fácil | 🟡 Medio | 🔴 Complejo |

---

## 📝 Recomendación Final

### Para Desarrollo/Proyecto Personal:
→ **Vercel** (gratis, fácil, completo)

### Si necesitas AWS:
→ **AWS Amplify** (mejor soporte Next.js)

### Solo archivos estáticos simples:
→ **S3 + CloudFront** (pero perderás funcionalidades)

---

## 🔗 URLs Útiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

## 🆘 Solución de Problemas

### Error: "i18n is not compatible with output: export"
→ Usa Vercel o Amplify en lugar de exportación estática

### Error de build en Vercel
→ Verifica que todas las dependencias estén en package.json
→ Ejecuta `npm run build` localmente primero

### Variables de entorno
→ En Vercel: Settings → Environment Variables
→ Prefija con `NEXT_PUBLIC_` para usar en cliente

---

✨ **Proyecto creado con Claude Code**
