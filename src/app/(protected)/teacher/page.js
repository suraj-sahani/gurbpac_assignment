"use client";
import { StatsCard } from "@/components/cards/stat-card";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { getTeacherStats } from "@/lib/services/content.service";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons/index";
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome, {session?.user?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and broadcast your educational content.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/teacher/upload-content">
            <Button>
              <HugeiconsIcon
                icon={Upload06Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4 mr-2"
              />
              Upload Content
            </Button>
          </Link>
          <Link href={`/live/${session?.user?.id}`} target="_blank">
            <Button variant="outline">
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="mr-2 h-4 w-4"
              />
              Open Live Page
            </Button>
          </Link>
        </div>
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
          <h3 className="mb-2 text-sm font-semibold">Quick tips</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Upload images (JPG, PNG, GIF) up to 10MB.</li>
            <li>
              Set start and end times to schedule when content broadcasts.
            </li>
            <li>
              Content is visible publicly only after the principal approves it.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
