import BentoGrid from "./preview";

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
