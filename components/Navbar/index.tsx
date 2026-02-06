import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative">
             <div className="absolute inset-0 bg-red-500 rounded-full border-2 border-zinc-900 group-hover:rotate-12 transition-transform overflow-hidden">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-900 z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-zinc-900 rounded-full z-20"></div>
             </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors">
            Pokedex
          </span>
        </Link>

        <div className="flex gap-4">
            <Link 
                href="/" 
                className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
                Home
            </Link>
        </div>
      </div>
    </nav>
  );
}
