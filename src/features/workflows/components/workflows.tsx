"use client";

import {
  EntityContainer,
  EntityHeader,
} from "@/components/global/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import React from "react";
import { useUpgradeModal } from "@/hooks/subscription/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex-1 flex justify-center items-center">
      <p>
        {JSON.stringify(workflows.data, null, 2)}
      </p>
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter()
    const createWorkflow = useCreateWorkflow()
    const { handleError, modal } = useUpgradeModal()

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
  return (
    <>
    {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disable={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
