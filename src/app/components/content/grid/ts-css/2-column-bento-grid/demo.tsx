import BentoGrid from "./preview";

const propData = [
  {
    name: "mainCard",
    type: "GridItemData",
    default: "{}",
    description: "Main character card configuration",
    properties: [
      {
        name: "title",
        type: "string",
        optional: true,
        default: "Jon Snow",
        description: "Character name displayed as large title",
      },
      {
        name: "description",
        type: "string",
        optional: true,
        default: "House Stark",
        description: "House or faction name shown above title",
      },
      {
        name: "image",
        type: "string",
        optional: true,
        default: "Default portrait",
        description: "Character portrait image URL for profile picture",
      },
      {
        name: "stats",
        type: "Array<{label: string, value: string}>",
        optional: true,
        default: "Default Jon Snow stats",
        description: "Array of character statistics displayed in grid format",
      },
    ],
  },
  {
    name: "contactCard",
    type: "GridItemData",
    default: "{}",
    description: "Character contact/ally card configuration",
    properties: [
      {
        name: "description",
        type: "string",
        optional: true,
        default: "A girl has no name, but she has many faces",
        description: "Character quote or description in top badge",
      },
      {
        name: "image",
        type: "string",
        optional: true,
        default: "Medieval sword background",
        description: "Background image URL for the card",
      },
      {
        name: "contact",
        type: "object",
        optional: true,
        description: "Contact information object",
        properties: [
          {
            name: "name",
            type: "string",
            description: "Character full name",
          },
          {
            name: "position",
            type: "string",
            description: "Character title or role",
          },
          {
            name: "email",
            type: "string",
            description: "Character email or identifier",
          },
          {
            name: "phone",
            type: "string",
            description: "Character location or contact method",
          },
        ],
      },
      {
        name: "about",
        type: "object",
        optional: true,
        description: "Additional character information",
        properties: [
          {
            name: "title",
            type: "string",
            description: "Organization or group name",
          },
          {
            name: "year",
            type: "string",
            description: "Large display text (e.g., 'VALAR')",
          },
          {
            name: "description",
            type: "string",
            description: "Detailed description of character background",
          },
        ],
      },
    ],
  },
  {
    name: "logoCard",
    type: "GridItemData",
    default: "{}",
    description: "House sigil/logo card configuration",
    properties: [
      {
        name: "title",
        type: "string",
        optional: true,
        default: "House Stark",
        description: "House or organization name",
      },
      {
        name: "description",
        type: "string",
        optional: true,
        default: "Winter is Coming",
        description: "House motto or tagline",
      },
      {
        name: "image",
        type: "string",
        optional: true,
        default: "Wolf emoji with text",
        description: "House sigil or logo image URL",
      },
    ],
  },
  {
    name: "mapCard",
    type: "GridItemData",
    default: "{}",
    description: "Map/location card configuration",
    properties: [
      {
        name: "title",
        type: "string",
        optional: true,
        default: "The Seven Kingdoms",
        description: "Location or region name",
      },
      {
        name: "description",
        type: "string",
        optional: true,
        default: "From Winterfell to King's Landing",
        description: "Location description or subtitle",
      },
      {
        name: "image",
        type: "string",
        optional: true,
        default: "Game of Thrones landscape",
        description: "Map or landscape image URL",
      },
    ],
  },
  {
    name: "detailsCard",
    type: "GridItemData",
    default: "{}",
    description: "Character details card configuration",
    properties: [
      {
        name: "title",
        type: "string",
        optional: true,
        default: "Bastard of Winterfell",
        description: "Character title or epithet",
      },
      {
        name: "description",
        type: "string",
        optional: true,
        default: "King in the North",
        description: "Character role or status",
      },
      {
        name: "image",
        type: "string",
        optional: true,
        description: "Background image URL (displayed with low opacity)",
      },
    ],
  },
];

const BentoGridDemo = () => {
  const jonSnowData = {
    mainCard: {
      title: "Jon Snow",
      description: "House Stark",
      image:
        "https://images.unsplash.com/photo-1616262373426-18bfa28bafab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      stats: [
        { label: "Title", value: "King in the North" },
        { label: "House", value: "STARK" },
        { label: "Status", value: "Lord Commander" },
        { label: "Allegiance", value: "Night's Watch" },
        { label: "Location", value: "The Wall" },
        { label: "Age", value: "25" },
      ],
    },
    contactCard: {
      description: "A girl has no name, but she has many faces",
      image:
        "https://images.unsplash.com/photo-1440711085503-89d8ec455791?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      contact: {
        name: "Arya Stark",
        position: "FACELESS ASSASSIN",
        email: "no.one@braavos.essos",
        phone: "Many-Faced God Temple",
      },
      about: {
        title: "THE FACELESS MEN",
        year: "VALAR",
        description:
          "Valar Morghulis - All men must die. The Faceless Men are a religious society of assassins who worship the Many-Faced God.",
      },
    },
    logoCard: {
      title: "House Stark",
      description: "Winter is Coming",
      image:
        "https://images.unsplash.com/photo-1551084117-56ac1b9e8abd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    mapCard: {
      title: "The Seven Kingdoms",
      description: "From Winterfell to King's Landing",
      image:
        "https://images.unsplash.com/photo-1520299607509-dcd935f9a839?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    detailsCard: {
      title: "Bastard of Winterfell",
      description: "King in the North",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  return (
    <main className="p-8 flex items-center justify-center">
      <div className="">
        <BentoGrid {...jonSnowData} />
      </div>
    </main>
  );
};

export default BentoGridDemo;
export { propData };
