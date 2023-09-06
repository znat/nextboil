// pages/api/graphql.ts

import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'

import { schema } from '../../graphql/schema'
export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
  plugins: []
})

export const config = {
  api: {
    bodyParser: false
  }
}