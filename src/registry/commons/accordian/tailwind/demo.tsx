import Accordian from "./preview";

const propData = [
  {
    name: "items",
    type: "AccordionItem[]",
    default: "[]",
    description:
      "Array of accordion items with id, title, and content properties.",
  },
  {
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description:
      "Whether to allow multiple accordion items to be open simultaneously.",
  },
];

const accordionItems = [
  {
    id: 1,
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return.",
  },
  {
    id: 2,
    title: "How long does shipping take?",
    content:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for faster delivery.",
  },
  {
    id: 3,
    title: "Do you offer international shipping?",
    content:
      "Yes, we ship to over 50 countries worldwide. International shipping times vary by location but typically take 7-14 business days.",
  },
  {
    id: 4,
    title: "How can I track my order?",
    content:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's site.",
  },
];

const AccordianDemo = () => {
  return (
    <main className="w-full max-w-4xl mx-auto px-4">
      <div className="w-full">
        <Accordian items={accordionItems} />
      </div>
    </main>
  );
};

export default AccordianDemo;
export { propData };
