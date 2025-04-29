"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

type AchievementRangeInput = {
  minPercentage: number
  maxPercentage: number | null
  category: string
}

type CommissionRateInput = {
  productId: string
  rates: {
    category: string
    rate: number
  }[]
}

/**
 * Add a new goal with achievement ranges and commission rates
 */
export async function addGoal(
  ruleId: string,
  value: number,
  achievementRanges: AchievementRangeInput[],
  commissionRates: CommissionRateInput[],
) {
  try {
    // Create the goal with achievement ranges
    const goal = await prisma.goal.create({
      data: {
        rule_id: ruleId,
        value,
        achievement_ranges: {
          create: achievementRanges.map((range) => ({
            min_percentage: range.minPercentage,
            max_percentage: range.maxPercentage,
            category: range.category,
          })),
        },
      },
      include: {
        achievement_ranges: true,
      },
    })

    // Get all achievement ranges to create commission rates
    const ranges = await prisma.achievementRange.findMany({
      where: { goal_id: goal.id },
    })

    // Create commission rates for each product and achievement range
    for (const productRate of commissionRates) {
      for (const rate of productRate.rates) {
        const range = ranges.find((r) => r.category === rate.category)
        if (range) {
          await prisma.commissionRate.create({
            data: {
              product_id: productRate.productId,
              achievement_range_id: range.id,
              rate: rate.rate,
            },
          })
        }
      }
    }

    revalidatePath("/regras/metas")

    return {
      success: true,
      message: "Meta adicionada com sucesso",
      data: goal,
    }
  } catch (error) {
    console.error("Error adding goal:", error)
    return {
      success: false,
      message: "Erro ao adicionar meta",
    }
  }
}

/**
 * Update a goal with achievement ranges and commission rates
 */
export async function updateGoal(
  goalId: string,
  value: number,
  achievementRanges: AchievementRangeInput[],
  commissionRates: CommissionRateInput[],
) {
  try {
    // First, delete existing achievement ranges (this will cascade delete commission rates)
    await prisma.achievementRange.deleteMany({
      where: { goal_id: goalId },
    })

    // Update the goal and create new achievement ranges
    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: {
        value,
        achievement_ranges: {
          create: achievementRanges.map((range) => ({
            min_percentage: range.minPercentage,
            max_percentage: range.maxPercentage,
            category: range.category,
          })),
        },
      },
      include: {
        achievement_ranges: true,
      },
    })

    // Get all achievement ranges to create commission rates
    const ranges = await prisma.achievementRange.findMany({
      where: { goal_id: goal.id },
    })

    // Create commission rates for each product and achievement range
    for (const productRate of commissionRates) {
      for (const rate of productRate.rates) {
        const range = ranges.find((r) => r.category === rate.category)
        if (range) {
          await prisma.commissionRate.create({
            data: {
              product_id: productRate.productId,
              achievement_range_id: range.id,
              rate: rate.rate,
            },
          })
        }
      }
    }

    revalidatePath("/regras/metas")

    return {
      success: true,
      message: "Meta atualizada com sucesso",
      data: goal,
    }
  } catch (error) {
    console.error("Error updating goal:", error)
    return {
      success: false,
      message: "Erro ao atualizar meta",
    }
  }
}

/**
 * Get the current active goal with achievement ranges and commission rates
 */
export async function getCurrentGoal() {
  try {
    // Get the active commission rule
    const activeRule = await prisma.commissionRule.findFirst({
      where: { is_active: true },
    })

    if (!activeRule) {
      return {
        success: false,
        message: "Nenhuma regra de comissionamento ativa encontrada",
      }
    }

    // Get the goal for the active rule
    const goal = await prisma.goal.findFirst({
      where: { rule_id: activeRule.id },
      include: {
        achievement_ranges: {
          orderBy: { min_percentage: "asc" },
          include: {
            commission_rates: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    })

    if (!goal) {
      return {
        success: false,
        message: "Nenhuma meta encontrada para a regra ativa",
      }
    }

    return {
      success: true,
      data: goal,
    }
  } catch (error) {
    console.error("Error fetching current goal:", error)
    return {
      success: false,
      message: "Erro ao buscar meta atual",
    }
  }
}
