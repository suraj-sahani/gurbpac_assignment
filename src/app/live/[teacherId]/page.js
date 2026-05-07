"use client";
import NoData from "@/components/no-data";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getLiveTeacherContent } from "@/lib/services/content.service";
import { RadioIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function TeacherLivePage({ params }) {
  const { teacherId } = useParams();

  const {
    data: content,
    isFetched,
    error,
  } = useQuery({
    queryKey: [`teacher-live-${teacherId}`],
    queryFn: () => getLiveTeacherContent(teacherId),
    enabled: !!teacherId,
  });

  if (!teacherId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Teacher not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The teacher broadcast channel you&apos;re looking for doesn&apos;t
            exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[image:var(--gradient-primary)]">
              <HugeiconsIcon
                icon={RadioIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">
                EduCast Live
              </p>
              <p className="text-xs text-muted-foreground">
                Auto-refreshing every 10s
              </p>
            </div>
          </div>
          {content && (
            <Badge
              variant="outline"
              className={"bg-green-200/30 text-green-500"}
            >
              <span className="h-1 w-1 animate-pulse rounded-full bg-green-500" />
              Live
            </Badge>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {!isFetched ? (
          <div className="space-y-4">
            <div className="h-96 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        ) : error ? (
          <NoData title="Something went wrong" description={error} />
        ) : !content ? (
          <NoData
            icon={
              <HugeiconsIcon
                icon={RadioIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              />
            }
            title="No content available"
            description="There is no live broadcast at the moment. Please check back later."
          />
        ) : (
          <article className="space-y-6">
            <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-elevated)]">
              <Image
                width={500}
                height={500}
                src={content.fileUrl}
                alt={content.title}
                className="max-h-[70vh] w-full object-contain bg-muted"
              />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                {content.subject}
              </p>
              <h1 className="mt-1 text-3xl font-bold">{content.title}</h1>
              {content.description && (
                <p className="mt-2 max-w-3xl text-muted-foreground">
                  {content.description}
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                By {content.teacherName}
              </p>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
