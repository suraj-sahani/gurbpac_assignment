"use client";
import { formatDateTime } from "@/lib/utils";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import PropTypes from "prop-types";
import ContentStatusBadge from "../badge/content-status-badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveContent,
  rejectContent,
  updateContentApprovalStatus,
} from "@/lib/services/content.service";
import { useSession } from "@/hooks/use-session";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function PendingApprovalContentCard({ content }) {
  const {
    title,
    subject,
    description,
    status,
    startTime,
    endTime,
    rejectionReason,
    fileUrl,
    teacherName,
    id,
  } = content;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const { isPending: isPendingApproval, mutate: mutateApproval } = useMutation({
    mutationFn: () =>
      updateContentApprovalStatus(id, session?.user?.id, "approved"),
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["pending-approval-content"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isPending: isPendingRejection, mutate: mutateRejection } =
    useMutation({
      mutationFn: () =>
        updateContentApprovalStatus(
          id,
          session?.user?.id,
          "rejected",
          "Sample rejection reason",
        ),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["pending-approval-content"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <Card className="border-border/60 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-soft)] py-1 rounded-xl">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-[160px_1fr]">
        <Image
          width={200}
          height={200}
          src={fileUrl}
          alt={title}
          className="h-40 w-full rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold leading-tight">{title}</h3>
              <p className="text-xs text-muted-foreground">
                {subject} · {teacherName}
              </p>
            </div>
            <ContentStatusBadge start={startTime} end={endTime} />
          </div>
          {description && (
            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
          <p className="mb-3 text-xs text-muted-foreground">
            {formatDateTime(startTime)} → {formatDateTime(endTime)}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => mutateApproval()}
              disabled={isPendingApproval}
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              />
              {isPendingApproval ? <Spinner /> : "Approve"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button size="sm" variant="destructive">
                    <HugeiconsIcon
                      icon={CancelCircleIcon}
                      size={24}
                      color="currentColor"
                      strokeWidth={1.5}
                      className="h-4 w-4"
                    />
                    Reject
                  </Button>
                }
              />

              {/* </AlertDialogTrigger>*/}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently reject
                    the content and cannot be approved again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutateRejection()}
                    disabled={isPendingRejection}
                  >
                    {isPendingRejection ? <Spinner /> : "Confirm Rejection"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

PendingApprovalContentCard.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    teacherId: PropTypes.string,
    teacherName: PropTypes.string,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    description: PropTypes.string,
    fileUrl: PropTypes.string.isRequired,
    fileType: PropTypes.string,
    status: PropTypes.oneOf(["pending", "approved", "rejected"]).isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    rejectionReason: PropTypes.string,
    rotationDuration: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};
