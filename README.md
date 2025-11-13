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
npm run build  # Genera el build de producción en docs/
npm test       # Ejecuta los tests unitarios (si se agregan)
```

## Despliegue en GitHub Pages

1. **Configurar el build para GitHub Pages:**
   - El `base href` está configurado como `/porfolio/` en `src/index.html`
   - El output path está configurado como `docs/` en `angular.json`
   - Asegúrate de que tu repositorio se llame exactamente `porfolio`

2. **Construir el proyecto:**
   ```bash
   npm run build
   ```

3. **Configurar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio de GitHub
   - Selecciona la rama `main` (o `master`)
   - **IMPORTANTE:** Selecciona la carpeta `/docs/browser` como fuente (no `/docs`)
   - Guarda los cambios

4. **Verificar el nombre del repositorio:**
   - **CRÍTICO:** El `base href` en `src/index.html` debe coincidir exactamente con el nombre de tu repositorio
   - Si tu repositorio se llama `porfolio`, el `base href` debe ser `/porfolio/`
   - Si tu repositorio tiene un nombre diferente, debes:
     - Actualizar el `base href` en `src/index.html` (ej: si tu repo se llama "mi-portfolio", cambia a `/mi-portfolio/`)
     - Actualizar la ruta del banner en `src/app/pages/home/home.css` (línea 47): cambiar `/porfolio/assets/Banner.png` a `/tu-nombre-repo/assets/Banner.png`
     - Reconstruir el proyecto con `npm run build`

5. **Estructura del build:**
   - Angular 17+ genera los archivos en `docs/browser/` por defecto
   - GitHub Pages debe servir desde `/docs/browser` (carpeta `browser` dentro de `docs`)
   - Las imágenes están en `src/assets/` y se copian a `docs/browser/assets/` después del build
   - Las rutas relativas en HTML (`assets/...`) se resuelven desde el `base href` (`/porfolio/`)
   - La ruta absoluta en CSS (`/porfolio/assets/Banner.png`) debe coincidir con el nombre del repositorio

6. **Solución de problemas:**
   - Si las imágenes no se cargan (errores 404):
     1. **Verifica el nombre del repositorio:** Debe coincidir exactamente con el `base href` en `src/index.html` (actualmente `/porfolio/`)
     2. **Si el repositorio tiene otro nombre:**
        - Actualiza `src/index.html`: cambia `<base href="/porfolio/">` a `<base href="/tu-nombre-repo/">`
        - Actualiza `src/app/pages/home/home.css` línea 47: cambia `url('/porfolio/assets/Banner.png')` a `url('/tu-nombre-repo/assets/Banner.png')`
        - Reconstruye: `npm run build`
     3. **Verifica la configuración de GitHub Pages:**
        - GitHub Pages debe servir desde `/docs/browser` (carpeta `browser` dentro de `docs`)
        - Ve a Settings > Pages > Source y selecciona `/docs/browser`
     4. **Verifica que los archivos existan:**
        - Las imágenes deben estar en `src/assets/`
        - Después del build, deben estar en `docs/browser/assets/`
        - Si no están, ejecuta `npm run build` nuevamente
     5. **Limpia la caché del navegador:** Presiona Ctrl+Shift+R (o Cmd+Shift+R en Mac) para recargar sin caché

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
