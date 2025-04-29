"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

/**
 * Add or update quarterly bonus configuration
 */
export async function setQuarterlyBonus(value: number, minPercentage: number) {
  try {
    // Check if there's an active bonus
    const activeBonus = await prisma.quarterlyBonus.findFirst({
      where: { is_active: true },
    })

    if (activeBonus) {
      // Update existing bonus
      const bonus = await prisma.quarterlyBonus.update({
        where: { id: activeBonus.id },
        data: {
          value,
          min_percentage: minPercentage,
        },
      })

      revalidatePath("/regras/premiacao-trimestral")

      return {
        success: true,
        message: "Premiação trimestral atualizada com sucesso",
        data: bonus,
      }
    } else {
      // Create new bonus
      const bonus = await prisma.quarterlyBonus.create({
        data: {
          value,
          min_percentage: minPercentage,
          is_active: true,
        },
      })

      revalidatePath("/regras/premiacao-trimestral")

      return {
        success: true,
        message: "Premiação trimestral criada com sucesso",
        data: bonus,
      }
    }
  } catch (error) {
    console.error("Error setting quarterly bonus:", error)
    return {
      success: false,
      message: "Erro ao configurar premiação trimestral",
    }
  }
}

/**
 * Get the current active quarterly bonus
 */
export async function getCurrentQuarterlyBonus() {
  try {
    const bonus = await prisma.quarterlyBonus.findFirst({
      where: { is_active: true },
    })

    return {
      success: true,
      data: bonus,
    }
  } catch (error) {
    console.error("Error fetching quarterly bonus:", error)
    return {
      success: false,
      message: "Erro ao buscar premiação trimestral",
    }
  }
}
