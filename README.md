# Repeat UI

A modern, customizable Next.js & React component library with Nice components and copy-paste integration. Build UIs faster with beautiful, ready-to-use components.

## ✨ Features

- 🎨 **Beautiful Components**: Modern, animated UI components
- 🛠️ **CLI Integration**: Install components directly via command line
- 🔄 **Multiple Variants**: JavaScript/TypeScript with CSS/Tailwind options
- 🆕 **New Component Tracking**: Automatic "NEW" tags for recently added components
- 📱 **Responsive Design**: Components work seamlessly across all devices
- 🎭 **Animation Ready**: Built with Framer Motion for smooth interactions

## 🚀 Quick Start

### Installation

```bash
# Install the CLI globally
npm install -g @hritik-sharmaa/repeat-ui

# Or use directly with npx
npx @hritik-sharmaa/repeat-ui add button-simple
```

### Development

```bash
# Clone the repository
git clone https://github.com/hritik-sharmaa/repeat-ui.git
cd repeat-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component library.

## 📦 Available Components

### Buttons

- Simple, Sketchy, Pulse, Rotation
- Fill, Letter, Creep, Layers
- Wiggle, Bubble

### Cards

- Profile Card, Pricing Card
- 3D Card

### Text Effects

- Flipping Text, Typing Text, Flow Text
- Text Shadow, Pop Text
- Split Reveal Text

### Grid Layouts

- 2 Column Bento Grid, 3 Column Bento Grid
- Pinterest Grid

### Carousels

- Simple Carousel, Modern Carousel
- Loop Deck Carousel

### Commons

- Search Bar with Hotkey, Document Upload Modal
- **Accordion** _(NEW)_ - Collapsible accordion component

## 🛠️ CLI Usage

```bash
# List all available components
repeat-ui list

# Add a component to your project
repeat-ui add button-simple

# Add with specific variant
repeat-ui add button-simple --variant ts-tailwind

# Add the new accordion component
repeat-ui add commons-accordian --variant ts-css

# Install to custom directory
repeat-ui add card-profile --output ./src/components
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/         # All UI components
│   │   ├── content/        # Component implementations
│   │   └── site/           # Site layout components
│   └── context/           # React contexts
├── cli/                   # CLI tool implementation
├── data/                  # Component metadata
└── lib/                   # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Add your component with proper date tracking
4. Commit your changes (`git commit -m 'Add amazing component'`)
5. Push to the branch (`git push origin feature/amazing-component`)
6. Open a Pull Request

### Adding New Components

When adding new components, make sure to:

1. Update `src/data/categories.ts` with current date
2. Add entry to `src/cli/registry.ts`
3. Follow the existing file structure
4. Include all variant types (js-css, js-tailwind, ts-css, ts-tailwind)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Documentation](./docs/)
- [Component Examples](http://localhost:3000/components)
- [GitHub Repository](https://github.com/hritik-sharmaa/repeat-ui)

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
