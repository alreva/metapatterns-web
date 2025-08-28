interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      id: 1,
      title: "Getting Started with Next.js and SSG",
      date: "2025-01-15",
      excerpt: "Learn how to leverage static site generation for better performance and SEO.",
    },
    {
      id: 2,
      title: "Implementing Dark Mode with Tailwind CSS",
      date: "2025-01-14",
      excerpt: "A comprehensive guide to adding dark mode support to your Next.js application.",
    },
    {
      id: 3,
      title: "Turbopack: The Future of Web Bundling",
      date: "2025-01-13",
      excerpt: "Explore the benefits of using Turbopack for faster development builds.",
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-50">
        Blog
      </h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
              {post.title}
            </h2>
            <time className="text-sm text-slate-500 dark:text-slate-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {post.excerpt}
            </p>
            <a
              href={`/blog/${post.id}`}
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}