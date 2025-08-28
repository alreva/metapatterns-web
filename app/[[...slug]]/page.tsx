import { notFound } from 'next/navigation'
import { getAllSlugs, getMarkdownBySlug } from '@/lib/markdown'
import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

interface Props {
  params: {
    slug?: string[]
  }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  
  return [
    { slug: [] }, // Home page
    ...slugs.map(slug => ({
      slug: slug.split('/')
    }))
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.join('/') || 'home'
  const data = await getMarkdownBySlug(slug)
  
  if (!data) {
    return {
      title: 'Page Not Found'
    }
  }
  
  return {
    title: `${data.title} - Metapatterns`,
    description: 'A comprehensive guide to software architecture patterns and metapatterns'
  }
}

export default async function Page({ params }: Props) {
  const slug = params.slug?.join('/') || 'home'
  const data = await getMarkdownBySlug(slug)
  
  if (!data) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="flex-1 ml-80 p-8">
          <article className="prose prose-lg dark:prose-invert max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {data.title}
            </h1>
            
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: data.content }} 
            />
          </article>
        </main>
      </div>
    </div>
  )
}