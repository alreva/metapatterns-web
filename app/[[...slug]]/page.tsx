import { notFound } from 'next/navigation'
import { getAllSlugs, getMarkdownBySlug, getNavigation } from '@/lib/markdown'
import Navigation from '@/components/Navigation'
import BottomNavigation from '@/components/BottomNavigation'
import ThemeToggle from '@/components/ThemeToggle'
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
  const navigationData = await getNavigation()
  
  if (!data) {
    notFound()
  }
  
  return (
    <div className="layout-container">
      {/* Sidebar Navigation */}
      <Navigation navigationData={navigationData} />
      
      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="breadcrumb-current">{data.title}</span>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="article-container">
          <article>
            <header className="article-header">
              <h1 className="article-title">
                {data.title}
              </h1>
              <div className="article-meta">
                Architecture Pattern Guide
              </div>
            </header>
            
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: data.content }} 
            />
            
            <BottomNavigation currentSlug={slug} navigationData={navigationData} />
          </article>
        </div>
      </main>
    </div>
  )
}