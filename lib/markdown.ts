import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

interface NavigationItem {
  title: string
  slug: string
}

interface NavigationSection {
  title: string
  slug: string
  items: NavigationItem[]
}

const contentDirectory = path.join(process.cwd(), 'content')

// Create a map of file names to their full paths for quick lookup
let fileMap: Map<string, string> | null = null

function getFileMap(): Map<string, string> {
  if (fileMap) return fileMap
  
  fileMap = new Map()
  const files = getAllMarkdownFiles()
  
  for (const file of files) {
    // Get the base name without extension
    const baseName = path.basename(file, '.md')
    // Store the slug path for this file
    const slug = filePathToSlug(file)
    fileMap.set(baseName, slug)
    
    // Also store without spaces (for files like "Shared Repository" -> "SharedRepository")
    const noSpaces = baseName.replace(/\s+/g, '')
    if (noSpaces !== baseName) {
      fileMap.set(noSpaces, slug)
    }
    
    // Also store with dashes (for files like "Shared Repository" -> "Shared-Repository")
    const withDashes = baseName.replace(/\s+/g, '-')
    if (withDashes !== baseName) {
      fileMap.set(withDashes, slug)
    }
  }
  
  return fileMap
}

// Generate anchor IDs from heading text
function generateAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .replace(/^-|-$/g, '') // Remove leading/trailing dashes
}

// Add anchor IDs to headings - convert to HTML with id attributes
function addHeadingAnchors(htmlContent: string): string {
  return htmlContent.replace(/<(h[1-6])>(.+?)<\/h[1-6]>/g, (match, tag, title) => {
    const anchorId = generateAnchorId(title)
    return `<${tag} id="${anchorId}">${title}</${tag}>`
  })
}

// Convert wiki-style links <filename> to proper URLs
function convertWikiLinks(content: string): string {
  const map = getFileMap()
  
  return content
    // Remove embedded navigation tables - more comprehensive pattern
    .replace(/\|\s*[^|]*<<[^|]*\|[^|]*\^[^|]*\^[^|]*\|[^|]*>>[^|]*\|\s*[\r\n]+\|\s*[-\s|]+\|\s*/g, '')
    // Remove any remaining markdown table rows with navigation symbols
    .replace(/\|\s*[^|]*(?:<<|>>|\^)[^|]*\|[^|]*(?:<<|>>|\^)[^|]*\|[^|]*(?:<<|>>|\^)[^|]*\|\s*/g, '')
    // Convert <filename#section> to proper URL with section
    .replace(/\[([^\]]+)\]\(<([^>]+)#([^>]+)>\)/g, (match, text, filename, section) => {
      const slug = map.get(filename) || map.get(filename.replace(/\s+/g, ''))
      if (slug) {
        return `[${text}](/${slug}#${section})`
      }
      // Fallback to lowercase with dashes
      return `[${text}](/${filename.toLowerCase().replace(/\s+/g, '-')}#${section})`
    })
    // Convert <filename> to proper URL
    .replace(/\[([^\]]+)\]\(<([^>]+)>\)/g, (match, text, filename) => {
      const slug = map.get(filename) || map.get(filename.replace(/\s+/g, ''))
      if (slug) {
        return `[${text}](/${slug})`
      }
      // Fallback to lowercase with dashes
      return `[${text}](/${filename.toLowerCase().replace(/\s+/g, '-')})`
    })
    // Fix image paths to be relative to public
    // Remove 'img/' prefix and add '/content/' prefix
    .replace(/src="img\/([^"]+)"/g, 'src="/content/$1"')
    .replace(/src="Pictures\//g, 'src="/content/Pictures/')
}

// Get all markdown files recursively
export function getAllMarkdownFiles(): string[] {
  const files: string[] = []
  
  function scanDirectory(dir: string) {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory()) {
        scanDirectory(fullPath)
      } else if (item.isFile() && item.name.endsWith('.md')) {
        const relativePath = path.relative(contentDirectory, fullPath)
        files.push(relativePath)
      }
    }
  }
  
  scanDirectory(contentDirectory)
  return files
}

// Convert file path to URL slug
export function filePathToSlug(filePath: string): string {
  return filePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .toLowerCase()
    .replace(/[^a-z0-9\/]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Convert slug back to file path for lookup
export function slugToFilePath(slug: string): string {
  const files = getAllMarkdownFiles()
  
  // Handle special cases
  if (slug === '' || slug === 'home') {
    return 'Home.md'
  }
  
  // Try exact match first (case insensitive)
  const exactMatch = files.find(file => 
    filePathToSlug(file) === slug
  )
  if (exactMatch) return exactMatch
  
  // Try partial matches
  const partialMatch = files.find(file =>
    file.toLowerCase().includes(slug.replace(/-/g, ' '))
  )
  if (partialMatch) return partialMatch
  
  // Default fallback
  return files[0] || 'Home.md'
}

// Get markdown content and metadata
export interface MarkdownData {
  content: string
  data: Record<string, unknown>
  slug: string
  title: string
  filePath: string
}

export async function getMarkdownBySlug(slug: string): Promise<MarkdownData | null> {
  try {
    const filePath = slugToFilePath(slug)
    const fullPath = path.join(contentDirectory, filePath)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Convert wiki-style links
    const processedContent = convertWikiLinks(content)
    
    // Process markdown to HTML
    const processedMarkdown = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(processedContent)
    
    // Add anchor IDs to headings and remove the last table if it contains navigation symbols
    let htmlContent = addHeadingAnchors(processedMarkdown.toString())
    
    // Remove the last table if it contains << >> ^ symbols (navigation table)
    const tables = htmlContent.match(/<table[\s\S]*?<\/table>/gi)
    if (tables && tables.length > 0) {
      const lastTable = tables[tables.length - 1]
      if (lastTable.includes('&lt;&lt;') || lastTable.includes('&gt;&gt;') || lastTable.includes('^') || 
          lastTable.includes('&#x3C;&#x3C;') || lastTable.includes('&#x3E;&#x3E;')) {
        htmlContent = htmlContent.replace(lastTable, '')
      }
    }
    
    // Extract title from filename or frontmatter
    const title = data.title || path.basename(filePath, '.md')
    
    return {
      content: htmlContent,
      data,
      slug: filePathToSlug(filePath),
      title,
      filePath
    }
  } catch (error) {
    console.error('Error processing markdown:', error)
    return null
  }
}

// Get all possible slugs for static generation
export function getAllSlugs(): string[] {
  const files = getAllMarkdownFiles()
  return files.map(filePathToSlug)
}

// Get navigation structure from Home.md
export async function getNavigation() {
  const homeData = await getMarkdownBySlug('home')
  if (!homeData) return []
  
  // Parse the content to extract navigation structure
  // This is a simplified parser - you might want to make it more robust
  const lines = homeData.content.split('\n')
  const nav: NavigationSection[] = []
  
  let currentSection: NavigationSection | null = null
  
  for (const line of lines) {
    if (line.startsWith('<h3>')) {
      const match = line.match(/<h3><a href="\/([^"]+)">([^<]+)<\/a><\/h3>/)
      if (match) {
        currentSection = {
          title: match[2],
          slug: match[1],
          items: []
        }
        nav.push(currentSection)
      }
    } else if (line.includes('<li><a href="/') && currentSection) {
      const match = line.match(/<a href="\/([^"]+)">([^<]+)<\/a>/)
      if (match) {
        currentSection.items.push({
          title: match[2],
          slug: match[1]
        })
      }
    }
  }
  
  return nav
}