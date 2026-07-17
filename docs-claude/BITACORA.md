# BITÁCORA

Bitácora del proyecto. Toda sesión de trabajo abre leyendo este archivo.
Entradas en orden cronológico inverso: la más reciente arriba. Ante conflicto
entre documentación e instrucciones, manda la entrada más reciente de esta
bitácora.

---

# Entrada 2 — Fase 0: cierre parcial / transición de flujo

Fecha: 2026-07-16. Fase: 0 — cierre parcial / transición de flujo.
Rama: develop.

## Hallazgo crítico: pipeline de deploy de Vercel roto (RESUELTO el mismo día)
- Registro histórico: el pipeline estaba roto desde el 2025-12-22
  (commit "application with docker", único deploy a Production fallido).
  Todos los deployments posteriores, incluidos los previews, fallaban.
- Producción servía la versión del 2025-11-30.
- RESUELTO (2026-07-16, mismo día del hallazgo): David mergeó el PR #3
  ("Fix React Server Components CVE vulnerabilities", commit 7d36edc),
  que actualiza dependencias afectadas por CVEs de React Server
  Components. Con eso el deploy a Production volvió a verde y producción
  quedó actualizada por primera vez desde el 2025-11-30.
- Causa raíz de los builds fallidos: las dependencias vulnerables que el
  pipeline de Vercel rechazaba. Inferencia fuerte a partir del nombre y
  contenido del PR #3, NO verificada contra build logs.
- Diagnóstico con build logs: resuelto por el PR #3; los build logs ya
  no son necesarios para esto.
- El fallo del preview de fase0/contacto-directo era señal del mismo
  problema, NO un error introducido por la Fase 0.

## Decisión de infraestructura (pendiente de ejecutar en reunión del fin de semana)
- Se creará un correo de la marca. Verificar primero en Hostinger si
  existe buzón o forwarding para softensor.com (el `info@softensor.com`
  del código es placeholder no verificado).
- Con ese correo se creará una cuenta de Vercel del proyecto, a la que
  David transferirá el proyecto desde su cuenta personal.
- Descartados: compartir credenciales personales y transferir a la
  cuenta personal de Luis.

## Nuevo flujo de ramas
- Se crea la rama `develop` como línea de integración permanente.
- Entre semana: ramas de fase (`faseN/...`) desde develop, aprobación en
  local, `merge --no-ff` a develop.
- Cada fin de semana (reunión Luis+David): PR de develop a main,
  revisión conjunta, merge = deploy a producción.
- La rama luis permanece congelada como archivo de referencia (decisión
  previa sin cambios, ver Entrada 0).
- Las ramas de fase NO se borran hasta que su contenido llegue a main.

## Regla temporal de riesgo
Mientras no haya cuenta de Vercel operativa: máximo UNA fase sin deploy
verde acumulada en develop. Al existir la cuenta, se activarán preview
deployments sobre develop como validación continua y esta regla se
reemplaza.

## Estado de compuerta de Fase 0
Código aprobado por arquitecto, tsc y build local en verde, mergeado a
develop. PENDIENTE para cierre total: deploy verde en Vercel y merge a
main, bloqueado únicamente por la reunión del fin de semana (el
pipeline quedó resuelto el mismo día, ver hallazgo).

## Pendientes (se agregan a la lista global)
- ~~Diagnóstico del pipeline con build logs de Vercel~~ — RESUELTO el
  mismo día por el PR #3 (ver hallazgo arriba).
- Ratificar en reunión el protocolo de corrección post-PR: fix desde
  develop, merge a main apenas esté verde, sin esperar al siguiente
  domingo.
- Configurar previews sobre develop en la cuenta nueva.

Nota (mismo día): develop ya contiene tanto la Fase 0 como el fix del
PR #3 (verificado en el grafo de git: el merge 7c66f41 tiene ambos como
ancestros), por lo que la regla temporal de riesgo parte de una base
sincronizada con main.

---

# Entrada 1 — Fase 0: contacto directo

Fecha: 2026-07-15. Fase: 0 — contacto directo. Rama: fase0/contacto-directo.

## Qué se hizo
- Creado `config/contactChannels.tsx`: constante `CONTACT_EMAIL`
  (placeholder `info@softensor.com`), interfaz `ContactChannel` y array
  `contactChannels` con el canal email (mailto con subject prellenado vía
  `encodeURIComponent` sobre la clave i18n). Se añadió un campo opcional
  `detail?: string` a la interfaz para mostrar el dato copiable (correo,
  y en el futuro teléfono de WhatsApp) sin lógica por-canal en el JSX.
- Reescrito `components/sections/Contact.tsx`: eliminados el `<form>`
  (submit era console.log + alert), `useState`, handlers y el bloque de
  links muertos (github.com/linkedin.com genéricos). Ahora renderiza
  `contactChannels.map()` como tarjetas `<a>` nativas (Card gradient
  envuelto en `<a>`), sin JS de navegación. Grid 1 col mobile / 2 cols md+;
  la variante Tailwind `only:` centra la tarjeta cuando hay un solo canal.
  El correo se muestra visible y seleccionable (`select-all`) dentro de la
  tarjeta.
- Locales ES/EN (`public/locales/{es,en}/common.json`):
  - Eliminadas: `contact.email`, `contact.message`, `contact.send`
    (verificado por grep que solo las usaba el Contact.tsx viejo).
  - Añadidas: `contact.channels.email.{label,description,aria,subject}`.
    Subject sin pre-encodear en el JSON.

## Decisiones
- Canal único email con correo placeholder `info@softensor.com` (cambiar
  cuando exista el correo real de la marca).
- Estructura extensible por array de configuración: agregar WhatsApp o
  LinkedIn = añadir UN objeto a `contactChannels`, cero cambios en el JSX
  de Contact.tsx (verificado: el JSX solo itera el array).
- Tracking de clicks por canal: diferido a la decisión de analytics en
  Fase 1 (ver Entrada 0).

## Decisiones posteriores a la implementación (misma sesión, 2026-07-15)
- Analytics: decidido Umami Cloud plan Hobby (open source MIT, tier
  gratuito con eventos personalizados, sin cookies → sin banner de
  consentimiento, script ~2KB). Implementación en fase corta posterior
  vía atributos `data-umami-event` en las tarjetas de canal. PENDIENTE:
  consulta con David antes de crear la cuenta. Alternativa documentada
  si algún día se quiere data en casa: Umami self-hosted (Vercel +
  Postgres Neon free), mismo producto, migración por export. Descartados:
  Vercel Analytics free (no incluye eventos custom, solo pageviews) y
  GA4 (no open source, script ~70KB, banner de consentimiento).
- Flujo de aprobación oficial: rama corta por fase con patrón
  `faseN/descripcion` (ej. fase0/contacto-directo) → pruebas locales de
  Luis → push → preview deployment automático de Vercel → aprobación
  conjunta Luis+David sobre la URL del preview → PR a main → merge
  (= deploy a producción) → borrar rama. La rama luis NO se usa como
  rama de integración: queda congelada como archivo de referencia.
- Git: los commits y push los ejecuta siempre Luis; Claude Code deja
  los cambios en working tree y propone mensajes. Regla persistida en
  ~/.claude/CLAUDE.md global.

## Verificación
- `npx tsc --noEmit`: cero errores. `npm run build`: exitoso; se generan
  `/es` y `/en` (SSG). Warning de Next preexistente: `i18n.localeDetection`
  inválido en next.config.js para Next 16 (espera `false`); no introducido
  por esta fase.
- Nota: el HTML prerenderizado sigue llegando casi vacío porque
  `ThemeContext` no renderiza hijos hasta `mounted` (CSR puro, problema
  conocido de Entrada 0, fuera del alcance de Fase 0). Verificado en
  navegador (producción local): mailto correcto con subject codificado en
  ES y EN, tarjeta centrada, correo visible.

## Estado de compuerta
PENDIENTE: pruebas manuales de Luis (mailto móvil ES/EN, correo copiable
en desktop), revisión de código del arquitecto, aprobación de David sobre
preview de Vercel. La fase se cierra solo con el merge a main.

## Pendientes
- Correo real de la marca (reemplazar placeholder en contactChannels.tsx).
- Número de WhatsApp de negocio.
- Consultar Umami Cloud con David.
- Verificar con David el plan de la cuenta Vercel (Hobby es solo uso no
  comercial según sus términos — riesgo de política para una landing
  comercial).
- Cambiar localeDetection a false en next.config.js y
  next-i18next.config.js (Next 16 solo acepta false; hoy true genera
  warning en build).
- Problema CSR/SEO por ThemeContext.tsx:45 (HTML prerenderizado llega
  vacío).

---

# Entrada 0 — Contexto de decisiones (origen: sesión de planeación, jul 2026)

Fecha: 2026-07-15

## Diagnóstico inicial del sitio/repo (branch luis)
- Contact.tsx: el submit era console.log + alert. El form NUNCA envió nada.
  El dato "casi nadie usa el form" se confirmó luego con abandono real, y se
  decidió eliminarlo — pero el bug explica por qué nunca llegó un lead.
- Ya hay 3 sistemas de animación cargados: three.js (venom-beam),
  framer-motion, embla-carousel. Los componentes de components/ui
  (particles, spotlight, venom-beam, background-paths) son estilo
  21st.dev/Aceternity. Regla acordada: framer-motion único sistema 2D,
  máximo UN runtime 3D en producción.
- SEO casi nulo: el HTML de softensor.com llega vacío (CSR puro). Pendiente
  aprovechar SSG/SSR de Next en el rediseño.
- El dominio en producción está desincronizado de la branch luis (sin PR aún).

## Decisiones de herramientas
- Claude Design (beta, claude.ai/design) para la Fase 2: se le dará el repo
  como fuente del design system. Advertencia: comparte límites de uso con
  chat y Claude Code → llegar siempre con brief cerrado, no iterar a ciegas.
- Spline: candidato para la escena 3D del hero, PERO su runtime es un
  renderer WebGL adicional e independiente del three.js existente. Si se
  elige: máximo 1 escena, lazy load con next/dynamic ssr:false, fallback
  estático en móvil, gate Lighthouse mobile ≥ 80. Alternativas en evaluación:
  Rive (runtime ~100KB, vectorial) o escena three.js custom (cero deps nuevas).
  Decisión pendiente → se toma en Fase 1.

## Historia del plan de contacto (para no repetir el ciclo)
1. Plan original: form real con API route + Resend + Cloudflare Turnstile.
2. Descartado: David reportó abandono alto del form; se prefirió contacto
   directo de baja fricción.
3. Estado actual: solo mailto al correo de la marca. WhatsApp se consideró
   y quedó aplazado (definir número de negocio). Redes sociales no existen
   aún; crear LinkedIn de empresa es el candidato natural para B2B pymes.
4. Cal.com (agendar llamada) quedó como opción futura de conversión.

## Reparto de accesos
- Vercel y Hostinger: David. Luis pide cambios puntuales (ej. registros DNS)
  en vez de credenciales.
- Repo: ambos. Ramas cortas por fase desde main, merge solo tras compuerta.

## Decisión: destino de la rama luis (2026-07-15)
- Descarte funcional: NO se mergea a main ni se cherry-pickea. La rama queda
  intacta en el remoto como archivo de referencia.
- Razones: (a) su único commit introduce en producción los 3 sistemas de
  animación que la regla de arquitectura elimina (three.js/venom-beam,
  embla-carousel, componentes Aceternity); (b) todo su contenido es visual y
  la Fase 2 (rediseño) lo redefine; (c) es un commit monolítico sin
  granularidad para cherry-pick útil; (d) toca Contact.tsx, en conflicto con
  la Fase 0.
- Sus componentes ui/ (venom-beam, particles, spotlight) quedan como
  candidatos evaluables en Fase 1 para la dirección visual. La rama se borra
  solo cuando Fase 3 esté mergeada y nada de ahí se haya necesitado.
- Tracking de clicks por canal: DIFERIDO. El diseño sendBeacon + API route
  con logs a stdout no sirve en Vercel (retención de runtime logs ~1h en
  plan hobby). La medición requiere decisión de analytics en Fase 1.
