import { Card } from "@/components/ui/card";
import PropTypes from "prop-types";

export function StatsCard({
  title,
  value,
  icon,
  description,
  variant = "default",
}) {
  return (
    <Card className={`p-6 ring-none! rounded-xl shadow min-h-[150px]`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-md font-medium`}>{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && <div className={`text-2xl`}>{icon}</div>}
      </div>
    </Card>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node,
  description: PropTypes.string,
  variant: PropTypes.oneOf(["default", "success", "warning", "danger"]),
};
