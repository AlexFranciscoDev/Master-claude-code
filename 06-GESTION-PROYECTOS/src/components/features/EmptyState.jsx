export function EmptyState({ message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-10 text-center">
      <p className="text-sm text-text-muted">{message}</p>
      {action}
    </div>
  )
}
