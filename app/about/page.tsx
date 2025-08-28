export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-50">
        About MetaPatterns
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-slate-600 dark:text-slate-400">
          This is a demonstration of Next.js with Static Site Generation (SSG), 
          TypeScript, and Tailwind CSS with dark mode support.
        </p>
        
        <h2 className="mt-8 mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Features
        </h2>
        
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Static Site Generation for optimal performance</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for rapid UI development</li>
          <li>Dark mode with carefully selected colors</li>
          <li>Turbopack for fast development builds</li>
        </ul>
        
        <h2 className="mt-8 mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Technology Stack
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">Next.js 15</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">React framework with SSG/SSR support</p>
          </div>
          
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">TypeScript</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Static typing for JavaScript</p>
          </div>
          
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">Tailwind CSS</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Utility-first CSS framework</p>
          </div>
          
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">Turbopack</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Rust-based bundler for fast builds</p>
          </div>
        </div>
      </div>
    </div>
  );
}