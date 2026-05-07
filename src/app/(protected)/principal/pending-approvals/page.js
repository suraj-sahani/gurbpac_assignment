"use client";
import PendingApprovalContentCard from "@/components/cards/pending-approval-content-card";
import NoData from "@/components/no-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { getContentByStatus } from "@/lib/services/content.service";
import { CheckListIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";

export default function PendingApprovalsPage() {
  const { session } = useSession();

  const {
    data: pendingApprovalContent,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["pending-approval-content"],
    queryFn: () => getContentByStatus("pending"),
  });

  if (!isFetched)
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-50 w-full" />
        ))}
      </div>
    );

  if (!pendingApprovalContent.length) {
    return (
      <NoData
        icon={
          <HugeiconsIcon
            icon={CheckListIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
        }
        title="No pending content"
        description="All caught up — there's nothing waiting for review."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {pendingApprovalContent.map((content) => (
        <PendingApprovalContentCard content={content} key={content.id} />
      ))}
    </div>
  );
}
