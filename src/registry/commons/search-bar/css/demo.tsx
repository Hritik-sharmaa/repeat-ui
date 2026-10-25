import SearchWithHotkey from "./preview";

const propData = [
  {
    name: "placeholder",
    type: "string",
    default: '"Search..."',
    description:
      "Placeholder text displayed in the search input field and trigger button.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description:
      "Additional CSS classes to apply to the search container wrapper.",
  },
  {
    name: "enableHotkey",
    type: "boolean",
    default: "true",
    description:
      "Whether to enable Ctrl+K (or Cmd+K) keyboard shortcut to open/close the search modal and show the hotkey badge.",
  },
  {
    name: "enableModal",
    type: "boolean",
    default: "true",
    description:
      "Whether to show search results in a modal. When false, displays inline search input that triggers onSearch callback on each keystroke.",
  },
  {
    name: "onSearch",
    type: "(query: string) => void",
    default: "undefined",
    description:
      "Callback function called when search is performed. In modal mode, triggered on Enter key. In inline mode, triggered on each keystroke.",
  },
];

const SearchbarDemo = () => {
  return (
    <main className=" p-8 flex items-center justify-center">
      <div className="space-y-8 w-full">
        <SearchWithHotkey />
      </div>
    </main>
  );
};

export default SearchbarDemo;
export { propData };
