# @hritik-sharmaa/repeat-ui

Add animated [Repeat UI](https://repeatui.vercel.app/) components to your React project.

```bash
npx @hritik-sharmaa/repeat-ui list
npx @hritik-sharmaa/repeat-ui add button-simple
npx @hritik-sharmaa/repeat-ui add card-profile-card --variant js-css
```

`add` writes `components/<name>/` (`preview` is the component, `demo` shows how to use it) and installs the
packages the component needs with npm, pnpm, yarn or bun, picked from your lockfile.

| Option | Default | |
| --- | --- | --- |
| `-v, --variant` | `ts-tailwind` | `ts-tailwind`, `ts-css`, `js-tailwind` or `js-css` |
| `-o, --output` | `components` | folder to write into |
| `--overwrite` | off | replace existing files |
| `--no-deps` | | print the install command instead of running it |
| `--registry` | `https://repeatui.vercel.app/r` | registry URL or local folder |

Needs Node 18 or newer.
