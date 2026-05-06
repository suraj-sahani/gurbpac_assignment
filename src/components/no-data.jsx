import { InboxIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import PropTypes from "prop-types";

export default function NoData({
  icon = (
    <HugeiconsIcon
      icon={InboxIcon}
      size={24}
      color="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6 text-muted-foreground"
    />
  ),
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-card px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

NoData.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
};

NoData.defaultProps = {
  icon: (
    <HugeiconsIcon
      icon={InboxIcon}
      size={24}
      color="currentColor"
      strokeWidth={1.5}
    />
  ),
};
