export default function Loading() {
  return (
    <div className="py-24 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 mb-8" />
      <div className="h-4 w-full max-w-2xl bg-gray-100 dark:bg-gray-900 mb-2" />
      <div className="h-4 w-5/6 max-w-2xl bg-gray-100 dark:bg-gray-900" />
    </div>
  );
}
