export default function Loading() {
  return (
    <div className="py-24 max-w-3xl animate-pulse">
      <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 mb-6" />
      <div className="h-4 w-full bg-gray-100 dark:bg-gray-900 mb-2" />
      <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-900" />
    </div>
  );
}
