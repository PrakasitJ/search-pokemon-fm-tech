import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-9xl mb-4 opacity-10 font-black dark:text-gray-100">404</div>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Page Not Found</h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        The Pokemon or page you serve looking for doesn't exist. It might have fled!
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
      >
        Return Home
      </Link>
    </div>
  );
}
