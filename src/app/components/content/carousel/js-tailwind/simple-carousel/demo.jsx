import SimpleCarousel from "./preview";

const propData = [
  {
    name: "items",
    type: "CarouselItem[]",
    default: "-",
    description:
      "Array of carousel items to display. Each item should have id, title, subtitle, image, description, and color (which is optional) properties.",
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "true",
    description:
      "Whether the carousel should automatically advance to the next slide",
  },
  {
    name: "autoPlayInterval",
    type: "number",
    default: "5000",
    description: "Time in milliseconds between automatic slide transitions",
  },
  {
    name: "showControls",
    type: "boolean",
    default: "true",
    description: "Whether to show navigation arrows and play/pause button",
  },
  {
    name: "showProgress",
    type: "boolean",
    default: "true",
    description: "Whether to display the progress bar at the bottom",
  },
  {
    name: "showThumbnails",
    type: "boolean",
    default: "true",
    description: "Whether to show thumbnail previews at the bottom",
  },
  {
    name: "showIndicators",
    type: "boolean",
    default: "true",
    description: "Whether to show slide indicator dots at the bottom",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional CSS classes to apply to the carousel container",
  },
];

const carouselItems = [
  {
    id: 1,
    title: "Mountain Vista",
    subtitle: "Nature's Majesty",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600",
    description: "Breathtaking mountain landscapes that inspire wanderlust",
  },
  {
    id: 2,
    title: "Ocean Waves",
    subtitle: "Coastal Beauty",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600",
    description: "The rhythmic dance of waves against pristine shores",
  },
  {
    id: 3,
    title: "Forest Path",
    subtitle: "Woodland Serenity",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600",
    description: "Peaceful trails through ancient woodland sanctuaries",
  },
  {
    id: 4,
    title: "Desert Dunes",
    subtitle: "Golden Horizons",
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600",
    description: "Endless golden sands sculpted by desert winds",
  },
];

const CarouselDemo = () => {
  return (
    <main className=" p-8 flex items-center justify-center">
      <div className="space-y-8 w-full">
        <SimpleCarousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={4000}
          showControls={true}
          showProgress={true}
          showThumbnails={true}
          showIndicators={true}
        />
      </div>
    </main>
  );
};

export default CarouselDemo;
export { propData };
