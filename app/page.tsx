export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
          Welcome to MetaPatterns
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          A modern Next.js application built with TypeScript, Tailwind CSS, and
          optimized for static site generation with Turbopack.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Static Site Generation
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Pre-rendered pages at build time for optimal performance and SEO.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Dark Mode Ready
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Built-in dark mode support with carefully selected color schemes.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Turbopack Powered
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Lightning-fast development builds with Next.js Turbopack bundler.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-50">
          Getting Started
        </h2>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
          <code className="text-sm text-slate-900 dark:text-slate-50">
            npm run dev --turbo
          </code>
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Start the development server with Turbopack for fast refresh and instant builds.
        </p>
      </section>
    </div>
  );
}