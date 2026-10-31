# Contributing to Repeat UI

## Adding a component

```bash
npm install
npm run new button glow     # creates src/registry/button/glow/
npm run dev                 # then open http://localhost:3000/components/button/glow
```

`npm run new` creates a working starter that already passes every check:

```
src/registry/button/glow/
├── meta.ts              # description, dateAdded, props table
├── tailwind/
│   ├── preview.tsx      # the component users install (default export)
│   └── demo.tsx         # renders it on the website
└── css/
    ├── preview.tsx      # same component and same props, styled by style.css
    ├── demo.tsx
    └── style.css        # imported from preview.tsx
```

Then:

1. Build the component in both `preview.tsx` files. They must accept the same props.
2. Fill in `meta.ts`: a one-line description and one `props` entry per prop. The build fails if `meta.ts`
   documents a prop the component doesn't accept, or if a prop in the component's own props type is not
   documented. Inherited props such as `onClick` from `ButtonHTMLAttributes` are optional to document.
3. Write it in TypeScript only. The JavaScript variants are generated from it.

A new category needs one extra step: add it to `CATEGORIES` in `src/registry/catalog.ts`. That list sets the
sidebar order. Inside a category, components are listed by `dateAdded`, oldest first.

## Rules the build enforces

`npm run registry` (run by `dev`, `build` and CI) tells you exactly what is wrong. Components are copied into
any React app, so:

- No `next/*` or `@/...` imports. Use plain `<img>`, not `next/image`.
- No Next.js globals: use `<style>`, not `<style jsx>`.
- No Node types: use `ReturnType<typeof setTimeout>`, not `NodeJS.Timeout`.
- Type imports use `import type`, or the JS output breaks.
- `@keyframes` names start with `rui-`. Keyframes are global, and a name like `pulse` would override
  Tailwind's own animation in the user's app.
- Every file in a component folder must be imported by another one, so nothing ships as dead code.

npm packages a component imports (for example `motion` or `lucide-react`) are found automatically, and the
CLI installs them for the user.

While `npm run dev` is running, rerun `npm run registry` to refresh the Code tab after editing a component.

## Before opening a pull request

```bash
npm run lint
npm test        # installs every component x variant with the CLI and checks the result
```
