import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const draws = pgTable('draws', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id')
    .notNull()
    .references(() => sessions.id),
  drawNumbers: varchar('draw_numbers', { length: 20 }), // comma-separated e.g. "1,2,3,4,5"
  playerNumbers: varchar('player_numbers', { length: 20 }),
  matchCount: integer('match_count'),
  createdAt: timestamp('created_at').defaultNow(),
})
