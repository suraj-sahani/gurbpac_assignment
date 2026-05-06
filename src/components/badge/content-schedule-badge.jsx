import PropTypes from "prop-types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ContentScheduleBadge({ start, end }) {
  const now = Date.now();
  const s = new Date(start);
  const e = new Date(end);

  let label = "Scheduled";
  let cls = "bg-blue-300/30 text-blue-500 border-blue-500/30";

  if (now > e) {
    label = "Expired";
    cls = "bg-red-400/30 text-red-500 border-red-500/30";
  } else if (now >= s && now <= e) {
    label = "Active";
    cls = "bg-green-400/30 text-green-600 border-green-400/30";
  }

  return (
    <Badge variant="outline" className={cn("font-medium", cls)}>
      {label}
    </Badge>
  );
}

// PropTypes for ContentScheduleBadge
ContentScheduleBadge.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
};
