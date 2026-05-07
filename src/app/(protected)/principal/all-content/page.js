"use client";

import ContentScheduleBadge from "@/components/badge/content-schedule-badge";
import ContentStatusBadge from "@/components/badge/content-status-badge";
import NoData from "@/components/no-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
import { getAllContent } from "@/lib/services/content.service";
import { formatDateTime } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function AllContentPage() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: contents,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["all-content", debouncedSearch, status],
    queryFn: () => getAllContent({ search: debouncedSearch, status }),
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Input
            placeholder="Search by title, subject, or teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-muted-foreground">
            {contents?.length || 0} item(s)
          </span>
        </CardContent>
      </Card>

      {!isFetched ? (
        <Skeleton className="h-72 w-full" />
      ) : error ? (
        <NoData title="Failed to load" description={error} />
      ) : !contents.length ? (
        <NoData title="No content matches your filters" />
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Image
                      height={48}
                      width={64}
                      src={c.fileUrl}
                      alt={c.title}
                      className="h-12 w-16 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.subject}</TableCell>
                  <TableCell>{c.teacherName}</TableCell>
                  <TableCell className="space-y-1">
                    <ContentScheduleBadge start={c.startTime} end={c.endTime} />
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(c.startTime)} →{" "}
                      {formatDateTime(c.endTime)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <ContentStatusBadge status={c.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
