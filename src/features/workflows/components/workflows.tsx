"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/global/entity-components";
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import React from "react";
import { useUpgradeModal } from "@/hooks/subscription/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { Workflow } from "@prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns"


export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

 return(
    <EntityList
    items={workflows.data.items}
    getKey={(workflows) => workflows.id}
    renderItem={(workflows) => <WorkflowItem data={workflows}/>}
    emptyView={<WorkflowsEmpty/>}
    />
 )
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
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

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPage={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) =>
        setParams((prev) => ({
          ...prev,
          page,
        }))
      }
    />
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
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows." />;
};

export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EmptyView
        onNew={handleCreate}
        message="You haven't created any workflows yet. Get started by creating your first workflow"
      />
    </>
  );
};


export const WorkflowItem = ({
    data
}: { data: Workflow }) => {
    const  removeWorkflow = useRemoveWorkflow()

    const handleRemove = () => {
        removeWorkflow.mutate({ id: data.id })
    }

    return(
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
            Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })} {" "}
            &bull; Created{" "}
            {formatDistanceToNow(data.createdAt, { addSuffix: true })}
            </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground" />
            </div>
        }
        onRemove={ handleRemove }
        isRemoving={removeWorkflow.isPending}
        />
    )
}
