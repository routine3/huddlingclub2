export type AttendanceBadgeProps = {
  status?: "yes" | "no";
  className?: string;
};

export default function AttendanceBadge({ status = "yes", className }: AttendanceBadgeProps) {
  return (
    <span className={[
      "inline-flex items-center justify-center rounded-pill px-control-compact py-inline-sm typography-label-md",
      status === "yes" ? "bg-info-subtle text-info-strong" : "bg-background-subtle text-text-secondary",
      className,
    ].filter(Boolean).join(" ")}>
      {status === "yes" ? "참석" : "불참"}
    </span>
  );
}
