export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
