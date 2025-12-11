import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  projectId: '2819wsin',
  dataset: 'production',
  name: 'craft-studio',
  title: 'Craft Admin',
  basePath: '/studio',
  plugins: [structureTool()],
})
