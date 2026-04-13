# `src/content/` Structure

This is the bridge to **Obsidian**.
All markdown files edited in Obsidian live here. The Astro `content.config.ts` validates these collections natively using `loader: glob`.

**Current Collections:**
- `blog/`: In-depth articles and project reports (has subfolders like `/business`, `/kunstecke`, `/research`, `/segeln`).
- `pins/`: Small digital garden notes and fleeting thoughts.
- `lebenslauf/`: Chronological timeline entries utilizing `MM.YYYY` startDate parsing.
- `legal/`: Static legal pages (Impressum, Datenschutz).
- `home/`: The introductory prose for the index page.
- `about/`: The narrative text and portrait for the Über Mich page.
- `links/`: Link repository for generating the profile cards.

*CRITICAL RULE: Do not overwrite content here automatically, as the user dictates this from Obsidian.*
