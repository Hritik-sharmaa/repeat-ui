import { DocumentUploadModal } from "./preview";

const propData = [
  {
    name: "buttonText",
    type: "string",
    default: '"Upload document"',
    description: "Text to display on the upload button.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional CSS classes to apply to the upload button.",
  },
];

const DocumentUploadModalDemo = () => {
  return (
    <main className=" p-8 flex items-center justify-center">
      <div className="space-y-8 w-full">
        <DocumentUploadModal />
      </div>
    </main>
  );
};

export default DocumentUploadModalDemo;
export { propData };
