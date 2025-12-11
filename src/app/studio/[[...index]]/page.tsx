"use client"

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Kita buat konfigurasi LANGSUNG di sini (bypass file sanity.config.ts)
// Menggunakan Project ID dari screenshot yang kamu kirim
const config = defineConfig({
  projectId: '2819wsin', 
  dataset: 'production', // Default dataset biasanya 'production'
  
  name: 'craft-studio',
  title: 'Craft Admin',
  basePath: '/studio',
  
  plugins: [structureTool()],
})

// Export Default Component (Ini yang dicari oleh Next.js)
export default function StudioPage() {
  return (
    <div style={{ height: '100vh', maxHeight: '100dvh', overflow: 'hidden' }}>
      <NextStudio config={config} />
    </div>
  )
}