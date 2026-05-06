"use client";
import { StatsCard } from "@/components/cards/stat-card";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { getTeacherStats } from "@/lib/services/content.service";
import {
  CancelSquareIcon,
  CheckmarkSquare04Icon,
  File02Icon,
  ModernTvFourKIcon,
  TimeScheduleIcon,
  Upload06Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// CSR Page Example
export default function TeacherDashboard() {
  const { session } = useSession();

  const {
    data: stats,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["teacher-stats", session?.user?.id],
    queryFn: () => getTeacherStats(session?.user.id),
    enabled: !!session?.user?.id,
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
          Teacher Dashboard
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
        <Link href="/teacher/upload-content">
          <Button className="w-full" size="lg" variant="default">
            <HugeiconsIcon
              icon={Upload06Icon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4 mr-2"
            />
            Upload New Content
          </Button>
        </Link>
        <Link href="/teacher/my-content">
          <Button className="w-full" size="lg" variant="outline">
            <HugeiconsIcon
              icon={File02Icon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4 mr-2"
            />
            View My Content
          </Button>
        </Link>
      </div>

      {/* Info section */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
        <h2 className="font-semibold text-blue-900 mb-2">How it works</h2>
        <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li>Upload your content (images only: JPG, PNG, GIF)</li>
          <li>Add a title, subject, and description</li>
          <li>Set when your content will be active</li>
          <li>Principal reviews and approves your content</li>
          <li>Content goes live once approved</li>
        </ol>
      </div>
    </div>
  );
}
