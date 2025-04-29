"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

/**
 * Create a new appraisal period
 */
export async function createAppraisal(referenceMonth: number, referenceYear: number, startDate: Date, endDate: Date) {
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

    // Generate calculation ID (AP-YYYY-MM)
    const calculationId = `AP-${referenceYear}-${referenceMonth.toString().padStart(2, "0")}`

    // Check if appraisal already exists
    const existingAppraisal = await prisma.calculation.findFirst({
      where: {
        calculation_id: calculationId,
      },
    })

    if (existingAppraisal) {
      return {
        success: false,
        message: "Já existe uma apuração para este período",
      }
    }

    // Create the calculation
    const calculation = await prisma.calculation.create({
      data: {
        calculation_id: calculationId,
        rule_id: activeRule.id,
        reference_month: referenceMonth,
        reference_year: referenceYear,
        start_date: startDate,
        end_date: endDate,
        goal_value: 0, // Will be updated when verifying achievement
        achieved_value: 0, // Will be updated when verifying achievement
        achievement_percentage: 0, // Will be updated when verifying achievement
        achievement_category: "", // Will be updated when verifying achievement
        commission_total: 0, // Will be updated when calculating commission
        status: "pendente",
      },
    })

    revalidatePath("/apuracao/definir-data")

    return {
      success: true,
      message: "Período de apuração criado com sucesso",
      data: calculation,
    }
  } catch (error) {
    console.error("Error creating appraisal:", error)
    return {
      success: false,
      message: "Erro ao criar período de apuração",
    }
  }
}

/**
 * Verify goal achievement for an appraisal
 */
export async function verifyAchievement(calculationId: string) {
  try {
    // Get the calculation
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
      include: {
        rule: true,
      },
    })

    if (!calculation) {
      return {
        success: false,
        message: "Apuração não encontrada",
      }
    }

    // Get the goal for the rule
    const goal = await prisma.goal.findFirst({
      where: { rule_id: calculation.rule_id },
      include: {
        achievement_ranges: {
          orderBy: { min_percentage: "asc" },
        },
      },
    })

    if (!goal) {
      return {
        success: false,
        message: "Meta não encontrada para esta regra",
      }
    }

    // TODO: In a real implementation, this would fetch data from GPS
    // For now, we'll use mock data
    const mockAchievedValue = goal.value * (Math.random() * 0.5 + 0.8) // Between 80% and 130% of goal
    const achievementPercentage = (mockAchievedValue / goal.value) * 100

    // Determine achievement category
    let achievementCategory = ""
    for (const range of goal.achievement_ranges) {
      if (
        achievementPercentage >= range.min_percentage &&
        (range.max_percentage === null || achievementPercentage < range.max_percentage)
      ) {
        achievementCategory = range.category
        break
      }
    }

    // Update the calculation
    const updatedCalculation = await prisma.calculation.update({
      where: { id: calculationId },
      data: {
        goal_value: goal.value,
        achieved_value: mockAchievedValue,
        achievement_percentage: achievementPercentage,
        achievement_category: achievementCategory,
      },
      include: {
        rule: true,
      },
    })

    revalidatePath("/apuracao/verificar-atingimento")

    return {
      success: true,
      message: "Atingimento de meta verificado com sucesso",
      data: updatedCalculation,
    }
  } catch (error) {
    console.error("Error verifying achievement:", error)
    return {
      success: false,
      message: "Erro ao verificar atingimento de meta",
    }
  }
}

/**
 * Calculate commission for an appraisal
 */
export async function calculateCommission(calculationId: string) {
  try {
    // Get the calculation
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
      include: {
        rule: true,
      },
    })

    if (!calculation) {
      return {
        success: false,
        message: "Apuração não encontrada",
      }
    }

    if (!calculation.achievement_category) {
      return {
        success: false,
        message: "Verifique o atingimento de meta antes de calcular o comissionamento",
      }
    }

    // Get the goal and achievement ranges
    const goal = await prisma.goal.findFirst({
      where: { rule_id: calculation.rule_id },
      include: {
        achievement_ranges: {
          where: { category: calculation.achievement_category },
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

    if (!goal || goal.achievement_ranges.length === 0) {
      return {
        success: false,
        message: "Meta ou faixa de atingimento não encontrada",
      }
    }

    const achievementRange = goal.achievement_ranges[0]

    // Get all commissioned salespeople
    const salespeople = await prisma.salesperson.findMany({
      where: { is_commissioned: true },
    })

    // TODO: In a real implementation, this would fetch data from GPS
    // For now, we'll use mock data to distribute sales among salespeople
    let totalCommission = 0
    const productCalculations = []
    const salespersonCalculations = []

    // Create product calculations
    for (const rate of achievementRange.commission_rates) {
      // Mock product value (random distribution of total achieved value)
      const productValue = calculation.achieved_value * (Math.random() * 0.3 + 0.1) // 10-40% of total
      const commissionValue = (productValue * rate.rate) / 100
      totalCommission += commissionValue

      productCalculations.push({
        calculation_id: calculationId,
        product_description: rate.product.description,
        value: productValue,
        commission_rate: rate.rate,
        commission_value: commissionValue,
      })
    }

    // Create salesperson calculations (distribute commission among salespeople)
    for (const salesperson of salespeople) {
      // Mock produced value (random distribution)
      const producedValue = calculation.achieved_value * (Math.random() * 0.2 + 0.05) // 5-25% of total
      const commissionValue = totalCommission * (producedValue / calculation.achieved_value)

      salespersonCalculations.push({
        calculation_id: calculationId,
        salesperson_id: salesperson.id,
        produced_value: producedValue,
        commission_value: commissionValue,
      })
    }

    // Create all product calculations
    await prisma.productCalculation.createMany({
      data: productCalculations,
    })

    // Create all salesperson calculations
    await prisma.salespersonCalculation.createMany({
      data: salespersonCalculations,
    })

    // Update the calculation with the total commission
    const updatedCalculation = await prisma.calculation.update({
      where: { id: calculationId },
      data: {
        commission_total: totalCommission,
        status: "concluída",
      },
    })

    revalidatePath("/apuracao/apurar-comissionamento")

    return {
      success: true,
      message: "Comissionamento calculado com sucesso",
      data: updatedCalculation,
    }
  } catch (error) {
    console.error("Error calculating commission:", error)
    return {
      success: false,
      message: "Erro ao calcular comissionamento",
    }
  }
}

/**
 * Calculate quarterly bonus
 */
export async function calculateQuarterlyBonus(quarter: number, year: number) {
  try {
    // Get the active quarterly bonus
    const activeBonus = await prisma.quarterlyBonus.findFirst({
      where: { is_active: true },
    })

    if (!activeBonus) {
      return {
        success: false,
        message: "Nenhuma premiação trimestral ativa encontrada",
      }
    }

    // Determine the months for this quarter
    const months = []
    const startMonth = (quarter - 1) * 3 + 1
    for (let i = 0; i < 3; i++) {
      months.push(startMonth + i)
    }

    // Get calculations for these months
    const calculations = await prisma.calculation.findMany({
      where: {
        reference_month: { in: months },
        reference_year: year,
        status: "concluída",
      },
    })

    if (calculations.length < 3) {
      return {
        success: false,
        message: `Apurações incompletas para o ${quarter}º trimestre de ${year}. Encontradas ${calculations.length} de 3 necessárias.`,
      }
    }

    // Calculate total achievement percentage
    let totalAchievementPercentage = 0
    for (const calc of calculations) {
      totalAchievementPercentage += calc.achievement_percentage
    }

    // Determine if bonus is approved
    const isApproved = totalAchievementPercentage >= activeBonus.min_percentage * 3

    // Determine quarter date range
    const startDate = new Date(year, startMonth - 1, 1)
    const endDate = new Date(year, startMonth + 2, 0) // Last day of the last month

    // Create quarterly bonus calculation
    const quarterlyCalculation = await prisma.quarterlyBonusCalculation.create({
      data: {
        bonus_id: activeBonus.id,
        reference_quarter: quarter,
        reference_year: year,
        start_date: startDate,
        end_date: endDate,
        achieved_percentage: totalAchievementPercentage / 3, // Average
        is_approved: isApproved,
        status: isApproved ? "aprovada" : "rejeitada",
        monthly_calculations: {
          create: calculations.map((calc) => ({
            month: calc.reference_month,
            year: calc.reference_year,
            achievement_percentage: calc.achievement_percentage,
          })),
        },
      },
    })

    // If approved, create bonus for each commissioned salesperson
    if (isApproved) {
      // Get all commissioned salespeople
      const salespeople = await prisma.salesperson.findMany({
        where: { is_commissioned: true },
      })

      // Create bonus for each salesperson
      const bonusPerSalesperson = activeBonus.value / salespeople.length

      for (const salesperson of salespeople) {
        await prisma.salespersonQuarterlyBonus.create({
          data: {
            quarterly_calculation_id: quarterlyCalculation.id,
            salesperson_id: salesperson.id,
            bonus_value: bonusPerSalesperson,
          },
        })
      }
    }

    revalidatePath("/apuracao/apurar-premiacao-trimestral")

    return {
      success: true,
      message: isApproved
        ? "Premiação trimestral aprovada e calculada com sucesso"
        : "Premiação trimestral não aprovada. Percentual mínimo não atingido.",
      data: quarterlyCalculation,
    }
  } catch (error) {
    console.error("Error calculating quarterly bonus:", error)
    return {
      success: false,
      message: "Erro ao calcular premiação trimestral",
    }
  }
}

/**
 * Get all calculations
 */
export async function getAllCalculations() {
  try {
    const calculations = await prisma.calculation.findMany({
      orderBy: [{ reference_year: "desc" }, { reference_month: "desc" }],
      include: {
        rule: true,
      },
    })

    return {
      success: true,
      data: calculations,
    }
  } catch (error) {
    console.error("Error fetching calculations:", error)
    return {
      success: false,
      message: "Erro ao buscar apurações",
    }
  }
}

/**
 * Get calculation details
 */
export async function getCalculationDetails(calculationId: string) {
  try {
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
      include: {
        product_calculations: true,
        salesperson_calculations: {
          include: {
            salesperson: true,
          },
        },
      },
    })

    if (!calculation) {
      return {
        success: false,
        message: "Apuração não encontrada",
      }
    }

    return {
      success: true,
      data: calculation,
    }
  } catch (error) {
    console.error("Error fetching calculation details:", error)
    return {
      success: false,
      message: "Erro ao buscar detalhes da apuração",
    }
  }
}
