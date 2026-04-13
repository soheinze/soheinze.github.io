# Sonja Heinze — Digital Garden & Portfolio

Willkommen zum Quellcode meines digitalen Gartens! Diese Website wurde als **Astro 5** Projekt entwickelt und ist direkt mit meinem **Obsidian** Vault verknüpft. Das bedeutet: Ich schreibe meine Gedanken, Artikel und Lebenslauf-Stationen in Obsidian, und die Website generiert daraus automatisch dieses wunderschöne, interaktive Portfolio.

## 🚀 Lokale Entwicklung

Die Website kann ganz einfach lokal auf dem Computer gestartet werden:

| Befehl | Aktion |
| :--- | :--- |
| `npm install` | Installiert alle nötigen Abhängigkeiten. |
| `npm run dev` | Startet den lokalen Server auf `localhost:4321`. |
| `npm run build` | Kompiliert die gesamte Website in den `./dist/` Ordner (fürs Deployment). |

---

## 📝 Content Management (Obsidian Workflow)

Der spannendste Teil dieses Projekts liegt im Ordner `src/content/`. Dieser Ordner ist die Schnittstelle zu Obsidian. Wenn du neue Inhalte erstellen möchtest, legst du einfach entsprechende Markdown-Dateien in den folgenden Ordnern an. 

Das Astro-System übernimmt den Rest und baut automatisch die passenden URLs, Timelines und Tag-Übersichten!

### 1. 📌 Pins (`src/content/pins/`)
**Wofür:** Kurze Gedanken, schnelle Beobachtungen, flüchtige Ideen oder Zitate. Kein langer Text nötig.
**Aufbau in Obsidian:**
```yaml
---
title: "Mein kurzer Gedanke"
date: 2026-04-12
tags: ["gedanke", "design"]
---
Einfach nur ein kurzer Text, der direkt auf der Seite gerendert wird.
```

### 2. ✍️ Blog (`src/content/blog/`)
**Wofür:** Ausführliche Artikel, Deep-Dives, Tutorials oder fertige Essays. Du kannst Unterordner anlegen (z.B. `/business`, `/kunstecke`), um thematisch zu gruppieren.
**Aufbau in Obsidian:**
```yaml
---
title: "Warum Astro großartig ist"
date: 2026-04-12
description: "Ein ausführlicher Blick hinter die Kulissen meines neuen Blogs."
tags: ["tech", "coding"]
---
Hier kommt dein vollständiger Text mit Überschriften, Listen und Bildern hin.
```
*(Tipp: Die `description` wird auf Übersichtsseiten als Vorschau-Text benutzt!)*

### 3. ⏳ Lebenslauf (`src/content/lebenslauf/`)
**Wofür:** Chronologische Stationen (Jobs, Studium, Projekte) für die Timeline auf der `/lebenslauf`-Seite.
**Aufbau in Obsidian:**
```yaml
---
title: "Aktives Stammcrewsmitglied SY AHAB"
startDate: "06.2021"
endDate: "10.2023"
---
Kurze Beschreibung der Tätigkeiten.
```
*(Die Timeline sortiert sich vollautomatisch! Das System parst das `MM.YYYY` Format in echte Datums-Objekte und sortiert die Einträge chronologisch vom neuesten zum ältesten Eintrag. `endDate` und `role` sind optional.)*

### 4. 🔗 Links (`src/content/links/`)
**Wofür:** Die interaktiven Kacheln auf der `/links`-Seite. Wenn man klickt, öffnet sich eine saubere Tabelle mit all deinen Links.
**Aufbau in Obsidian:**
```yaml
---
title: "Profile"
description: "Meine sozialen Netzwerke"
color: "pink"
---
| Plattform | Link | Beschreibung |
| --------- | ---- | ------------ |
| GitHub | [Hier](#) | Open Source |
```
*(Für `color` kannst du `pink`, `purple` oder `teal` wählen, damit die Karte in deiner Akzentfarbe leuchtet!)*

### 5. 🏡 Home (`src/content/home/`)
**Wofür:** Der Willkommenstext auf der Startseite (`index.md`).
**Aufbau in Obsidian:** Bearbeite die `title` Variable für die Überschrift und schreibe den Einführungstext einfach als Fließtext darunter.

### 6. ✨ About / Über Mich (`src/content/about/`)
**Wofür:** Der Inhalt deiner "Über Mich" Seite (`index.md`). 
**Aufbau in Obsidian:** Frei gestaltbarer Fließtext, nutze H2 (`##`) für Abschnitte und baue den narrativen Fluss deines Digital Gardens auf!

### 7. ⚖️ Legal (`src/content/legal/`)
**Wofür:** Hardcoded Unterseiten wie das Impressum, Datenschutz und der Einleitungstext für das Kontaktformular.
**Aufbau in Obsidian:** Bearbeite einfach die bestehenden Dateien (`impressum.md`, `datenschutz.md`, `kontakt.md`). Das Astro Layout zieht sich die Texte von dort vollautomatisch.

---

## 🎨 Design & Ästhetik

Die visuelle Ausrichtung des Projekts ist ein **High-End Artist Aesthetic**.
- **Farben:** Wir verzichten auf generisches Blau/Rot. Stattdessen nutzen wir kuratierte Soft-Töne (Taupe, warmes Charcoal) gepaart mit vibrierenden Akzenten (Teal, Pink, Purple).
- **Typografie:** Ein gelungener Mix aus einer eleganten Schriftart für Überschriften (`Amarante` mit Art Deco Feeling) und einer modernen, cleanen Grotesk für den Fließtext (`Outfit`).
- **Global CSS:** Alle Kernfarben und Spacings werden zentral in `src/styles/global.css` als CSS-Variablen gepflegt.

Viel Spaß beim Gärtnern! 🌱
