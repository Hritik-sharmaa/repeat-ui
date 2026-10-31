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

# Adds components/repeat-ui/button-simple/{preview.tsx,demo.tsx} and installs any packages it needs
npx @hritik-sharmaa/repeat-ui add button-simple

# Variants: ts-tailwind (default), ts-css, js-tailwind, js-css
npx @hritik-sharmaa/repeat-ui add card-profile-card --variant js-css

# Other options: --output src/components/repeat-ui, --overwrite, --no-deps
```

Then use it: `import ButtonSimple from "@/components/repeat-ui/button-simple/preview";`

The CLI picks npm, pnpm, yarn or bun from your lockfile.

### With shadcn

If your project uses shadcn (it has a `components.json`), the same components install with the shadcn CLI,
into the same folder:

```bash
npx shadcn@latest add https://repeatui.vercel.app/r/button-simple.json
```

Or add the registry to `components.json` once and use short names:

```json
"registries": { "@repeat-ui": "https://repeatui.vercel.app/r/{name}.json" }
```

```bash
npx shadcn@latest add @repeat-ui/button-simple @repeat-ui/card-profile-card-css
```

Each component has four items: `<name>` (TS + Tailwind), `<name>-css`, `<name>-js` and `<name>-js-css`.
In a JS project, shadcn also converts the TS items to JS for you.

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
│   ├── catalog.ts            # category order, and the shape of meta.ts
│   └── button/simple/
│       ├── meta.ts           # description, date, props table
│       ├── css/              # preview.tsx, demo.tsx, style.css
│       └── tailwind/         # preview.tsx, demo.tsx
├── app/                      # website routes
├── site/                     # website UI (nav, tabs, install guide)
└── lib/
scripts/build-registry.ts     # checks every component and builds the registry JSON
scripts/new-component.ts      # npm run new <category> <name>
cli/                          # the npm package @hritik-sharmaa/repeat-ui
drafts/                       # unfinished components, not published
```

`npm run dev` and `npm run build` first run `npm run registry`, which checks every component and writes
`public/r/` (shadcn registry format, served to both CLIs) and `src/registry/__generated__/` (read by the site).
The website's component list comes from the `meta.ts` files; there is no list to edit by hand.

## 🤝 Contributing

New components are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md): `npm run new <category> <name>` sets one up.

### Releasing

1. Merge to `main` so Vercel deploys the site. The CLI downloads components from the site's `/r/` folder.
2. Then publish the CLI: bump `version` in `cli/package.json`, and run `npm publish --access public` in `cli/`.

### Listing in the shadcn registry directory (one time)

So that `npx shadcn@latest add @repeat-ui/<name>` works without any `components.json` setup: in a fork of
[shadcn-ui/ui](https://github.com/shadcn-ui/ui), add this to `apps/v4/registry/directory.json`, run
`pnpm validate:registries`, and open a pull request. `logo` must be an inline SVG string.

```json
{
  "name": "@repeat-ui",
  "homepage": "https://repeatui.vercel.app",
  "url": "https://repeatui.vercel.app/r/{name}.json",
  "description": "Animated React components (buttons, cards, carousels, text effects, cursors) in TS or JS, with Tailwind or plain CSS.",
  "logo": "<svg ...>"
}
```

After it is merged, change the shadcn command in `src/site/ui/InstallationGuide.tsx` to the `@repeat-ui/` form.

## 📄 License

MIT

## 🔗 Links

- [Website](https://repeatui.vercel.app/)
- [GitHub Repository](https://github.com/hritik-sharmaa/repeat-ui)

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Motion.
