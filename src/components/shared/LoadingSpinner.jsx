export default function LoadingSpinner({ duration = 5000 }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-sm text-muted-foreground">Loading movies...</p>
    </div>
  );
}