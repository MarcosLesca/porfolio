const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '..', 'docs', 'browser');
const docsDir = path.join(__dirname, '..', 'docs');

if (fs.existsSync(browserDir)) {
  const files = fs.readdirSync(browserDir);
  
  files.forEach(file => {
    const src = path.join(browserDir, file);
    const dest = path.join(docsDir, file);
    
    // Si el destino ya existe, eliminarlo primero
    if (fs.existsSync(dest)) {
      const stat = fs.statSync(dest);
      if (stat.isDirectory()) {
        fs.rmSync(dest, { recursive: true, force: true });
      } else {
        fs.unlinkSync(dest);
      }
    }
    
    // Mover el archivo o directorio
    fs.renameSync(src, dest);
  });
  
  // Eliminar la carpeta browser vacía
  try {
    fs.rmdirSync(browserDir);
  } catch (err) {
    // Ignorar errores si la carpeta no está vacía
  }
  
  console.log('✅ Archivos movidos de docs/browser a docs/');
} else {
  console.log('⚠️  La carpeta docs/browser no existe. Ejecuta "npm run build" primero.');
}

