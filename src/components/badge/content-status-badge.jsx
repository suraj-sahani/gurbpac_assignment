import PropTypes from "prop-types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const statusMap = {
  pending: {
    label: "Pending",
    className: "bg-amber-300/15 text-amber-600 border-amber-400/30",
  },
  approved: {
    label: "Approved",
    className: "bg-green-400/15 text-green-600 border-green-400/30",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-400/15 text-red-600 border-red-400/30",
  },
};

export default function ContentStatusBadge({ status }) {
  const m = statusMap[status] || statusMap.pending;
  console.log(m);
  return (
    <Badge variant="outline" className={cn("font-medium", m.className)}>
      {m.label}
    </Badge>
  );
}

// PropTypes for ContentStatusBadge
ContentStatusBadge.propTypes = {
  status: PropTypes.oneOf(["pending", "approved", "rejected"]).isRequired,
};
