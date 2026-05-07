import Image from "next/image";
import PropTypes from "prop-types"; // 1. Import PropTypes
import { Card, CardContent } from "../ui/card";
import { formatDateTime, cn } from "@/lib/utils"; // Added cn as it was used but not imported
import { Badge } from "../ui/badge";
import ContentStatusBadge from "../badge/content-status-badge";
import ContentScheduleBadge from "../badge/content-schedule-badge";

export default function ContentCard({ content }) {
  const {
    title,
    subject,
    description,
    status,
    startTime,
    endTime,
    rejectionReason,
    fileUrl,
  } = content;

  return (
    <Card className="overflow-hidden border-border/60 shadow-[var(--shadow-card)] py-2 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] rounded-xl">
      <Image
        src={fileUrl}
        alt={title}
        className="h-44 w-full object-cover"
        width={200}
        height={200}
      />

      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight">{title}</h3>
            <p className="text-xs text-muted-foreground">{subject}</p>
          </div>
          <ContentStatusBadge status={status} />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <ContentScheduleBadge start={startTime} end={endTime} />
          <span>
            {formatDateTime(startTime)} → {formatDateTime(endTime)}
          </span>
        </div>
        {status === "rejected" && rejectionReason && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive">
            <strong>Rejected:</strong> {rejectionReason}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

ContentCard.propTypes = {
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
