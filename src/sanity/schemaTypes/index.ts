import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { category } from './category'
import { product } from './product'
import { team } from './team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, product, team],
}
