import { requiredAuth } from "@/lib/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  await requiredAuth();
  const { workflowId } = await params;

  return <div>Workflow Id: {workflowId}</div>;
};

export default page;
