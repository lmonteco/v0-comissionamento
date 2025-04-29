"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { PrismaClient } from "@prisma/client"

// This is just a type definition, the actual Prisma client is instantiated in lib/db.ts
type DatabaseContextType = {
  db: PrismaClient
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined)

export function DatabaseProvider({
  children,
  prismaClient,
}: {
  children: ReactNode
  prismaClient: PrismaClient
}) {
  return <DatabaseContext.Provider value={{ db: prismaClient }}>{children}</DatabaseContext.Provider>
}

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}
