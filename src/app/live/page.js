"use client";

import NoData from "@/components/no-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getLiveTeachers } from "@/lib/services/content.service";
import { ArrowRightBigIcon } from "@hugeicons/core-free-icons/index";
import { Login01Icon } from "@hugeicons/core-free-icons/index";
import { RadioIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function LiveBroadCastsPage() {
  const {
    data: liveContent,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["live-content"],
    queryFn: getLiveTeachers,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] shadow-sm">
              <HugeiconsIcon
                icon={RadioIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">EduCast</p>
              <p className="text-xs text-muted-foreground">
                Live classroom broadcasts
              </p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <HugeiconsIcon
                icon={Login01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="size-4"
              />
              Staff sign in
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 max-w-2xl">
          <Badge variant="outline" className={"h-6"}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Live now
          </Badge>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore live broadcasts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse classes currently broadcasting. Tap any class to view the
            live content.
          </p>
        </div>

        {!isFetched ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <NoData title="Unable to load broadcasts" description={error} />
        ) : !liveContent.length ? (
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
            title="No live broadcasts right now"
            description="Check back soon — new sessions appear here as teachers go live."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveContent.map((t) => (
              <Link
                key={t.teacherId}
                href={`/live/${t.teacherId}`}
                className="group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={t.content.fileUrl}
                    alt={t.content.title}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 inline-flex items-center text-green-600 font-semibold gap-1.5 rounded-full bg-card/90  backdrop-blur animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Live
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    {t.subject}
                  </p>
                  <h3 className="mt-1 line-clamp-1 font-semibold leading-tight">
                    {t.content.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {t.teacherName}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Watch{" "}
                      <HugeiconsIcon
                        icon={ArrowRightBigIcon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                    </span>
                  </div>
                </CardContent>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl border-t px-4 py-6">
        <p className="text-xs text-muted-foreground">
          EduCast — Content Broadcasting System
        </p>
      </footer>
    </div>
  );
}
