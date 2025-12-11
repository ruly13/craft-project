import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  projectId: '28l9wsin',
  dataset: 'production',
  name: 'craft-web',
  title: 'Craft Web',
  basePath: '/studio',
  plugins: [structureTool()],
  schema,
})
