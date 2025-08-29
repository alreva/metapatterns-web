# Metapatterns - Web Version

A static website for the **Metapatterns** book on software architecture patterns.

🌐 **Live Site**: https://resonant-mandazi-28b74c.netlify.app

## Book Content & Copyright

⚠️ **IMPORTANT**: The book content in this repository belongs to its author **Denys Poltorak**.

- **Original Book Repository**: https://github.com/denyspoltorak/metapatterns
- **Author**: Denys Poltorak
- **Editor**: Lars Noodén
- **License**: The book content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

This repository contains only the web presentation layer for the book. All intellectual property rights for the book's content remain with the original author.

## About This Project

This is a Next.js-based static site generator that transforms the Metapatterns book's markdown files into a modern, searchable documentation website with:

- 📚 Complete book content with 50+ chapters on software architecture patterns
- 🌓 Dark/Light theme toggle
- 📱 Responsive design
- 🔍 Navigation with collapsible sections
- 🔗 Cross-references between patterns
- ⚡ Static generation for fast loading

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Markdown Processing**: remark, remark-gfm, gray-matter
- **Deployment**: Netlify
- **Icons**: Heroicons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static site
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is configured for deployment on Netlify:

```bash
# Deploy to Netlify
netlify deploy --prod
```

## Project Structure

```
metapatterns-web/
├── app/              # Next.js app router pages
├── components/       # React components
├── content/          # Book markdown files (from original repo)
├── lib/              # Utility functions and markdown processing
├── public/content/   # Book images and assets
└── netlify.toml      # Netlify configuration
```

## Contributing

This repository is for the web presentation only. For contributions to the book content itself, please visit the [original repository](https://github.com/denyspoltorak/metapatterns).

## Acknowledgments

- **Denys Poltorak** - Author of the Metapatterns book
- **Lars Noodén** - Editor
- All contributors to the original Metapatterns book

---

*This web version was created to make the valuable content of the Metapatterns book more accessible through a modern web interface.*