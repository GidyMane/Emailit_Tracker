// /lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Add a global variable to store the Prisma client
// This is necessary because Next.js hot-reloading can create multiple instances
// of the PrismaClient in development, which leads to too many connections.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // In production, we'll create a new client
  prisma = new PrismaClient()
} else {
  // In development, we'll use the global variable to prevent creating new clients on hot-reload
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma