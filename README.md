# Portfolio Web - Marcos Lescano

Este proyecto es un **portfolio personal** construido con Angular 20 y Tailwind CSS. Incluye una página pública con mi información profesional (experiencia, educación, habilidades y proyectos) y una página de inicio de sesión con un diseño moderno.

## Características principales

- Página principal con secciones de:
  - Presentación y enlaces rápidos.
  - Sobre mí y estadísticas de experiencia.
  - Experiencia laboral y formación académica.
  - Habilidades técnicas agrupadas por categorías.
  - Proyectos destacados y datos de contacto.
  - Descarga directa del CV en PDF.
- Página de login con diseño personalizado usando Tailwind CSS.
- Imágenes optimizadas con `NgOptimizedImage`.
- Estilos definidos con Tailwind 4 usando `@apply` para facilitar el mantenimiento.
- Estructura responsive y animaciones suaves.

## Tecnologías

- [Angular 20](https://angular.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript, HTML, CSS
- Herramientas de desarrollo: Angular CLI, Vite build system

## Requisitos previos

- Node.js 20+
- npm 10+

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm start      # Inicia el servidor de desarrollo (http://localhost:4200)
npm run build  # Genera el build de producción en dist/
npm test       # Ejecuta los tests unitarios (si se agregan)
```

## Estructura relevante

```
src/
 └── app/
     ├── pages/
     │   ├── home/      # Portfolio principal
     │   └── login/     # Pantalla de inicio de sesión
     └── auth/          # Guard de autenticación (placeholder)
public/
 └── MarcosLescano.pdf  # CV utilizado para las descargas
```

## Personalización rápida

- Actualiza el contenido de `src/app/pages/home/home.html` para modificar textos, habilidades o proyectos.
- Ajusta los estilos en `src/app/pages/home/home.css` y `src/app/pages/login/login.css` (Tailwind con `@apply`).
- Sustituye las imágenes en `public/` (`perfil_recortada.png`, `Banner.png`, `MarcosLescano.pdf`) según sea necesario.

## Próximos pasos sugeridos

- Implementar autenticación real en el guard `auth-guard.ts`.
- Conectar los formularios con un backend/servicio de contacto.
- Agregar pruebas unitarias y e2e para garantizar la estabilidad.

## Licencia

Proyecto privado/personal. Ajusta según tus necesidades antes de distribuirlo.
