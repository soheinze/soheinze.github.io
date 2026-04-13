# `src/pages/` Strategy

File-based routing for Astro using the "Universal Rendering Engine" approach.

- `index.astro`: The dynamic Startseite driven by the `home` collection and dynamic hashtag gathering.
- `[collection]/[...id].astro`: The universal rendering engine. Translates ANY markdown file from Obsidian (blog, pins, about, links) into a native URL route automatically.
- `topic/[tag].astro`: A dynamic scraper that generates overview pages for every hashtag used in the vault.
- `lebenslauf/index.astro`: Intercepts the `lebenslauf` collection to render the specific vertical chronology UI.
- `{legal}.astro`: Dedicated static files (`impressum`, `kontakt`, `datenschutz`) that pull prose from the `legal` markdown layer.
