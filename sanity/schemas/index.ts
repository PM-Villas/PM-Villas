// File: sanity/schemas/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import property from './property'
import blog from './blog'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [property, blog, author],
}