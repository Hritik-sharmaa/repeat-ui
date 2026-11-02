"use client";

import type { ComponentProps } from "react";
import { DocumentUploadModal } from "./preview";

const DocumentUploadModalDemo = (
  props: ComponentProps<typeof DocumentUploadModal>,
) => <DocumentUploadModal {...props} />;

export default DocumentUploadModalDemo;
