# Theme Config: Homepage

KduVite provides a homepage layout. To use it, specify `home: true` plus some other metadata in your root `index.md`'s [YAML frontmatter](../guide/frontmatter). This is an example of how it works:

```yaml
---
home: true
heroImage: /logo.png
heroAlt: Logo image
heroText: Hero Title
tagline: Hero subtitle
actionText: Get Started
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Kdu-Powered
  details: Enjoy the dev experience of Kdu + webpack, use Kdu components in markdown, and develop custom themes with Kdu.
- title: Performant
  details: KduVite generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2022 NKDuy
---
```
