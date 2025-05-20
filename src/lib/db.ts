import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '@/db/schema'

export const getDb = () => {
  const { DATABASE_URL } = process.env
  const sql = neon(DATABASE_URL!)
  return drizzle(sql, { schema })
}
