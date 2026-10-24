# Is It Special? (isitspecial.com)

> **Unfiltered consumer product critiques, hidden engineering secrets, and anti-consumerist design analysis.**  
> Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and TypeScript.

---

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start local dev server (default port 4321)
npm run dev

# Production static build
npm run build

# Preview production build locally
npm run preview
```

---

## 📘 Documentation & Editorial Guides

* **[PLAYBOOK.md](PLAYBOOK.md):** The master Standard Operating Procedure (SOP) covering:
  * The **10-Article Monthly Scheduling Engine** (equal 3-day distribution algorithm).
  * The **Special Index™ (1.0 to 10.0)** review scoring framework and verdicts.
  * **Bilingual Publishing Standard** (English + Native Hindi with zero machine translation).
  * **Visual Asset Generation** (16:9 studio photography prompt formula).
  * **Usability & UX Requirements** (WCAG contrast, high-speed static architecture).
  * **Technical SEO & GEO (Generative Engine Optimization)** for AI search engines (ChatGPT Search, Perplexity, Google AI Overviews).
* **[TASKS.md](TASKS.md):** Active production pipeline tracking all articles, image generation prompts, direct affiliate shortlinks, and publishing status.
* **[public/llms.txt](public/llms.txt):** Machine-readable AI directory structured for LLM crawlers.

---

## 🏗️ Architecture & Bilingual Routing

* `src/content/blog/[slug].mdx` — English primary investigations (`/blog/[slug]`)
* `src/content/blog/hi/[slug].mdx` — Native Hindi localized investigations (`/hi/blog/[slug]`)
* `src/components/SpecialIndexCard.astro` — Dynamic verdict card with multi-store support (Amazon, Myntra, direct brand) and legal disclosures
* `public/images/` — Standardized 16:9 widescreen studio photography banners

---

## ⚖️ Compliance & Disclosures

`isitspecial.com` participates in the Amazon Services LLC Associates Program.  
*Statutory Disclosure:* **"As an Amazon Associate, isitspecial.com earns from qualifying purchases."**
