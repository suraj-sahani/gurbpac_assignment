"use client";
import { StatsCard } from "@/components/cards/stat-card";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { getContentStats } from "@/lib/services/content.service";
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Principal Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {session?.user.name}
        </p>
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

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/principal/pending-approvals">
          <Button className="w-full" size="lg" variant="default">
            <HugeiconsIcon
              icon={CheckmarkCircle03Icon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4 mr-2"
            />
            Review Pending Content ({stats.pending})
          </Button>
        </Link>
        <Link href="/principal/all-content">
          <Button className="w-full" size="lg" variant="outline">
            <HugeiconsIcon
              icon={ViewIcon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4 mr-2"
            />
            View All Content
          </Button>
        </Link>
      </div>

      {/* Info section */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
        <h2 className="font-semibold text-blue-900 mb-2">Your Role</h2>
        <p className="text-sm text-blue-800 mb-4">
          As a principal, you review and approve content submitted by teachers.
          Make sure all content meets quality standards and is appropriate for
          broadcasting.
        </p>
        <ul className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li>Review pending content submissions</li>
          <li>Approve content that meets standards</li>
          <li>Request improvements by rejecting with feedback</li>
          <li>Monitor all content across the institution</li>
        </ul>
      </div>
    </div>
  );
}
