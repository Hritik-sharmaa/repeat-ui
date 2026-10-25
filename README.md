# Repeat UI

A modern, customizable Next.js & React component library with Nice components and copy-paste integration. Build UIs faster with beautiful, ready-to-use components.

## ✨ Features

- 🎨 **Beautiful Components**: Modern, animated UI components
- 🛠️ **CLI Integration**: Install components directly via command line
- 🔄 **Multiple Variants**: JavaScript/TypeScript with CSS/Tailwind options
- 🆕 **New Component Tracking**: Automatic "NEW" tags for recently added components
- 📱 **Responsive Design**: Components work seamlessly across all devices
- 🎭 **Animation Ready**: Built with Motion for smooth interactions

## 🛠️ CLI Usage

Browse components at [repeatui.vercel.app](https://repeatui.vercel.app/), or list them:

```bash
npx @hritik-sharmaa/repeat-ui list

# Adds components/button-simple/{preview.tsx,demo.tsx} and installs any packages it needs
npx @hritik-sharmaa/repeat-ui add button-simple

# Variants: ts-tailwind (default), ts-css, js-tailwind, js-css
npx @hritik-sharmaa/repeat-ui add card-profile-card --variant js-css

# Other options: --output src/components, --overwrite, --no-deps
```

Then use it: `import ButtonSimple from "@/components/button-simple/preview";`

The CLI picks npm, pnpm, yarn or bun from your lockfile.

## 🚀 Development

```bash
git clone https://github.com/hritik-sharmaa/repeat-ui.git
cd repeat-ui
npm install
npm run dev        # http://localhost:3000
npm test           # installs every component x variant with the CLI and checks the result
```

## 🏗️ Project Structure

```
src/
├── registry/                 # THE components, one folder each
│   └── button/simple/
│       ├── css/              # preview.tsx, demo.tsx, style.css
│       └── tailwind/         # preview.tsx, demo.tsx
├── data/categories.ts        # the one list of components (name, date, description)
├── app/                      # website routes
├── site/                     # website UI (nav, tabs, install guide)
└── lib/
scripts/build-registry.ts     # checks every component and builds the registry JSON
cli/                          # the npm package @hritik-sharmaa/repeat-ui
drafts/                       # unfinished components, not published
```

You write each component in TypeScript only. The JavaScript variants are generated from it.

`npm run dev` and `npm run build` first run `npm run registry`, which:

- type-checks every component (type imports must use `import type`, or the JS output breaks)
- fails if a component imports `next/*` or `@/...` (those only work inside this site), imports a file that
  doesn't exist, has a file nothing imports, or is missing from `categories.ts`
- finds each component's npm packages from its imports
- writes `public/r/<variant>/<name>.json` (served to the CLI) and `src/registry/__generated__/` (read by the site)

While `npm run dev` is running, rerun `npm run registry` to refresh the Code tab after editing a component.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Add your component with proper date tracking
4. Commit your changes (`git commit -m 'Add amazing component'`)
5. Push to the branch (`git push origin feature/amazing-component`)
6. Open a Pull Request

### Adding New Components

1. Create `src/registry/<category>/<name>/css/` and `.../tailwind/`, each with `preview.tsx` (the component)
   and `demo.tsx` (default export renders it; export `propData` for the props table). The CSS one also
   gets `style.css`, imported from `preview.tsx`.
2. Add `createVariant("<name>", "<today's date>", "<description>")` to `src/data/categories.ts`.
3. Run `npm run registry`. It tells you exactly what is wrong, if anything.

Use plain `<img>`, not `next/image`: components are copied into any React app.

### Releasing

1. Merge to `main` so Vercel deploys the site. The CLI downloads components from the site's `/r/` folder.
2. Then publish the CLI: bump `version` in `cli/package.json`, and run `npm publish --access public` in `cli/`.

## 📄 License

MIT

## 🔗 Links

- [Website](https://repeatui.vercel.app/)
- [GitHub Repository](https://github.com/hritik-sharmaa/repeat-ui)

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Motion.
