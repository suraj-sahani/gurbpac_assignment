"use client";
import { StatsCard } from "@/components/cards/stat-card";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { getContentStats } from "@/lib/services/content.service";
import { ShieldBanIcon } from "@hugeicons/core-free-icons/index";
import {
  CancelSquareIcon,
  CheckmarkCircle03Icon,
  CheckmarkSquare04Icon,
  ModernTvFourKIcon,
  TimeScheduleIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PrincipalDashboadPage() {
  const { session } = useSession();

  const {
    data: stats,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["all-contents"],
    queryFn: () => getContentStats(),
  });

  if (!isFetched) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-50 w-full" />
          ))}
        </div>
        <Skeleton className={"h-60 w-full"} />
      </div>
    );
  }

  if (error)
    return (
      <NoData title={"Failed to load content."} description={error.message} />
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome, {session?.user?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Review and approve teacher content submissions.
          </p>
        </div>
        <Link href="/principal/pending-approvals">
          <Button>
            <HugeiconsIcon
              icon={ShieldBanIcon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
              className="mr-2 h-4 w-4"
            />
            Review pending
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Content"
          value={stats.total}
          icon={
            <HugeiconsIcon
              icon={ModernTvFourKIcon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
          variant="default"
        />
        <StatsCard
          title="Approved"
          value={stats.approved}
          icon={
            <HugeiconsIcon
              icon={CheckmarkSquare04Icon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
          variant="success"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={
            <HugeiconsIcon
              icon={TimeScheduleIcon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
          variant="warning"
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={
            <HugeiconsIcon
              icon={CancelSquareIcon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
          variant="danger"
        />
      </div>

      {/* Info section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 text-sm font-semibold">Your Role</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Review pending content submissions</li>
            <li>Approve content that meets standards</li>
            <li>Request improvements by rejecting with feedback</li>
            <li>Monitor all content across the institution</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
