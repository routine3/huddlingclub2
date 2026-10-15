export type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-stack-lg left-1/2 z-20 w-[calc(100%-var(--spacing-40))] max-w-[var(--size-section-header)] -translate-x-1/2 rounded-control bg-surface-inverse px-stack-md py-control-x text-center typography-body-md text-text-inverse"
      role="status"
    >
      {message}
    </div>
  );
}
