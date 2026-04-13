# Gemini AI Instructions & Map

Welcome to the internal guide for the `sonjaheinze.de` repository.
This file serves as the core instruction manual for AI tools operating within this workspace.

## Stack & Architecture
- **Framework**: Astro 5 (using `loader: glob` for content layers)
- **Content**: Markdown Collections via Obsidian (in `src/content/`)
- **Styling**: Vanilla CSS (global tokens in `src/styles/global.css`)
- **Aesthetic Direction**: Sophisticated, high-end cultural aware and artist aesthetic. Warm, soft professional touch. Think soft taupes, muted warm charcoal, elegant typography (`Amarante` for headers, `Outfit` for body), and a digital garden feel. Highlight colors: pink, purple, teal.

## Content Collections Architecture
Data is housed statically in Markdown (`src/content/`) so the user can natively edit it via Obsidian. Collections are mapped in `src/content.config.ts`:
1. `blog`: Articles with `title`, `date`, `description`, `tags`.
2. `pins`: Quick thoughts/notes with `title`, `date`, `tags`.
3. `lebenslauf`: Resume milestones with `title`, `startDate` (MM.YYYY), and an optional `endDate` for strict chronological mathematical sorting using Date objects.
4. `legal`: Static footprint pages (`impressum`, `datenschutz`, `kontakt`) managed via Markdown.

## Routing Map & Directory

| Route / File | Purpose |
| ------ | ------- |
| `src/pages/index.astro` | Homepage/Pinboard. Features a dynamic tag banner and visually-driven topic doorway cards. |
| `src/pages/[collection]/[...id].astro` | The universal Markdown rendering engine. Converts any document inside `/content/` into a dedicated URL (e.g. `sonjaheinze.de/blog/business/idea`). |
| `src/pages/topic/[tag].astro` | Dynamic index. Scrapes unique tags from all content and generates category overview lists. |
| `src/pages/lebenslauf/index.astro` | Interactive chronological timeline rendering the `lebenslauf` collection using Vanilla JS to truncate/expand text entries. |
| `src/pages/{legal}.astro` | `impressum`, `datenschutz`, `kontakt` — Standard components that dynamically fetch their prose from the `legal` content collection. |
| `src/pages/*.astro` | Blank standard placeholders like `about` and `links`. |
| `src/layouts/Layout.astro` | The primary wrapper enforcing global visual consistency, headers, and footer nav. |

## Rules for AI Assistants
1. **Never** overwrite content files inside `src/content/` unless explicitly requested. The user manages their thoughts here via Obsidian.
2. Adhere to the defined aesthetic: refrain from generic blue/red colors; use curated, harmonious color palettes aligned with the warm, professional look.
3. Check the respective `_structure.md` in each subfolder before adding new components or routing paths.
4. When adding dynamic content, use Astro 5's asynchronous `render()` function from `astro:content`.
