import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- KONFIGURATION ---
// BITTE HIER DEINEN PFAD EINTRAGEN!
// Windows Beispiel: 'C:/Users/Name/Documents/MeinVault'
// Mac/Linux Beispiel: '/Users/Name/Documents/MeinVault'
const OBSIDIAN_VAULT_PATH = '/Users/sonja/Documents/Homepage/Website_Content';

const TARGET_DIR = './src/content/blog';
const TAG_TO_PUBLISH = 'public';
// ---------------------

if (!OBSIDIAN_VAULT_PATH) {
  console.error("❌ Bitte trage in der sync.mjs den Pfad zu deinem Obsidian Vault ein!");
  process.exit(1);
}

function syncFiles(sourceDir) {
  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    const fullPath = path.join(sourceDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Rekursiv in Unterordner schauen (optional, hier erst mal deaktiviert um Fehler zu vermeiden)
      // Um Unterordner zu scannen, entferne den Kommentar vor der nächsten Zeile:
      syncFiles(fullPath);
    } else if (file.endsWith('.md')) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(fileContent);

      // Prüfen ob 'tags' existiert und ob 'public' enthalten ist
      const tags = data.tags || [];
      const isPublic = Array.isArray(tags)
        ? tags.includes(TAG_TO_PUBLISH)
        : tags === TAG_TO_PUBLISH;

      if (isPublic) {
        const targetPath = path.join(TARGET_DIR, file);
        fs.copyFileSync(fullPath, targetPath);
        console.log(`✅ Kopiert: ${file}`);
      }
    }
  });
}

console.log(`🚀 Starte Sync aus: ${OBSIDIAN_VAULT_PATH}`);
// Wir leeren den Zielordner vorher (optional), damit gelöschte Public-Notizen auch verschwinden
// fs.rmSync(TARGET_DIR, { recursive: true, force: true });
// fs.mkdirSync(TARGET_DIR, { recursive: true });

try {
    syncFiles(OBSIDIAN_VAULT_PATH);
    console.log("🏁 Sync abgeschlossen.");
} catch (e) {
    console.error("Fehler beim Sync:", e.message);
}
