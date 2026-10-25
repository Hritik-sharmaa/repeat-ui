import BentoGrid from "./preview";

const propData = [
  {
    name: "maximizeCard",
    type: "CardData",
    default: "{}",
    description: "Large left card configuration for primary content",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Discover New Books",
        description: "Main heading displayed prominently on the card",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Find your next favorite read. Explore curated recommendations tailored to your taste.",
        description: "Detailed description text shown below the heading",
      },
      {
        name: "illustration",
        type: "string",
        optional: true,
        default: "Book illustration URL",
        description:
          "Large illustration/image URL displayed in the center of the card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "purple-200",
        description: "Background color class for the card",
      },
    ],
  },
  {
    name: "manageCard",
    type: "CardData",
    default: "{}",
    description: "Top right card configuration for management features",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Manage Library",
        description: "Card heading text",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Organize your reading list, track progress, & set reading goals.",
        description: "Card description text",
      },
      {
        name: "icon",
        type: "string",
        optional: true,
        default: "Library management icon URL",
        description: "Icon/image URL displayed on the right side of the card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "pink-200",
        description: "Background color class for the card",
      },
    ],
  },
  {
    name: "setGoalsCard",
    type: "CardData",
    default: "{}",
    description: "Small bottom-left card for goal setting features",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Reading Goals",
        description: "Card heading text",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Set annual reading targets or challenge yourself with new genres.",
        description: "Card description text",
      },
      {
        name: "icon",
        type: "string",
        optional: true,
        description: "Small icon/image URL displayed at bottom-right of card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "yellow-200",
        description: "Background color class for the card",
      },
    ],
  },
  {
    name: "loungesCard",
    type: "CardData",
    default: "{}",
    description: "Small bottom-right card for community features",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Book Clubs",
        description: "Card heading text",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Join reading communities & discover books through discussions.",
        description: "Card description text",
      },
      {
        name: "icon",
        type: "string",
        optional: true,
        description: "Small icon/image URL displayed at bottom-right of card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "green-200",
        description: "Background color class for the card",
      },
    ],
  },
  {
    name: "strategyCard",
    type: "CardData",
    default: "{}",
    description: "Bottom-left large card for strategy/planning features",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Reading Strategy",
        description: "Card heading text",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Personalized reading plan that fits your schedule and interests.",
        description: "Card description text",
      },
      {
        name: "illustration",
        type: "string",
        optional: true,
        default: "Strategy illustration URL",
        description: "Illustration/image URL displayed at bottom-right of card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "orange-200",
        description: "Background color class for the card",
      },
    ],
  },
  {
    name: "findCompareCard",
    type: "CardData",
    default: "{}",
    description: "Bottom-right card for discovery and comparison features",
    properties: [
      {
        name: "heading",
        type: "string",
        optional: false,
        default: "Find, Compare & Read",
        description: "Card heading text",
      },
      {
        name: "description",
        type: "string",
        optional: false,
        default:
          "Discover great books. Compare reviews and start reading instantly.",
        description: "Card description text",
      },
      {
        name: "illustration",
        type: "string",
        optional: true,
        default: "Comparison interface illustration URL",
        description: "Illustration/image URL displayed at bottom-right of card",
      },
      {
        name: "backgroundColor",
        type: "string",
        optional: true,
        default: "blue-200",
        description: "Background color class for the card",
      },
    ],
  },
];

const BentoGridDemo = () => {
  return (
    <main className="p-8 flex items-center justify-center">
      <div className="">
        <BentoGrid />
      </div>
    </main>
  );
};

export default BentoGridDemo;
export { propData };
