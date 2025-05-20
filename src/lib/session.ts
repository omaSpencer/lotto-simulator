'use server'

import { cookies } from 'next/headers'

import { sessions } from '@/db/schema'

import { getDb } from '@/lib/db'

export async function getOrCreateSessionId(): Promise<number> {
  const db = getDb()
  const cookieStore = await cookies()
  const existing = cookieStore.get('sessionId')

  if (existing) {
    const id = parseInt(existing.value, 10)
    if (!isNaN(id)) return id
  }

  const [newSession] = await db.insert(sessions).values({}).returning()
  cookieStore.set('sessionId', String(newSession.id), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, //? 30 nap
  })

  return newSession.id
}

export async function getSessionIdFromCookie(): Promise<number | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('sessionId')
  const id = parseInt(cookie?.value ?? '', 10)
  return isNaN(id) ? null : id
}
