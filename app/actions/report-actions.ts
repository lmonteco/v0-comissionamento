"use server"

import prisma from "@/lib/db"

/**
 * Generate team report
 */
export async function generateTeamReport(calculationId: string) {
  try {
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
      include: {
        product_calculations: true,
      },
    })

    if (!calculation) {
      return {
        success: false,
        message: "Apuração não encontrada",
      }
    }

    // Get quarterly bonus for this period if any
    const quarterlyBonus = await prisma.quarterlyBonusCalculation.findFirst({
      where: {
        reference_year: calculation.reference_year,
        reference_quarter: Math.ceil(calculation.reference_month / 3),
        status: "aprovada",
      },
      include: {
        salesperson_bonuses: true,
      },
    })

    const totalQuarterlyBonus = quarterlyBonus
      ? quarterlyBonus.salesperson_bonuses.reduce((sum, bonus) => sum + Number(bonus.bonus_value), 0)
      : 0

    // Generate report data
    const reportData = {
      calculation,
      productCalculations: calculation.product_calculations,
      totalCommission: Number(calculation.commission_total),
      totalQuarterlyBonus,
    }

    // In a real implementation, this would generate an actual XLSX file
    // For now, we'll just return the data
    return {
      success: true,
      message: "Relatório gerado com sucesso",
      data: reportData,
    }
  } catch (error) {
    console.error("Error generating team report:", error)
    return {
      success: false,
      message: "Erro ao gerar relatório de equipe",
    }
  }
}

/**
 * Generate individual report
 */
export async function generateIndividualReport(calculationId: string, salespersonId: string) {
  try {
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
    })

    if (!calculation) {
      return {
        success: false,
        message: "Apuração não encontrada",
      }
    }

    const salesperson = await prisma.salesperson.findUnique({
      where: { id: salespersonId },
    })

    if (!salesperson) {
      return {
        success: false,
        message: "Vendedor não encontrado",
      }
    }

    // Get salesperson calculation
    const salespersonCalculation = await prisma.salespersonCalculation.findFirst({
      where: {
        calculation_id: calculationId,
        salesperson_id: salespersonId,
      },
    })

    if (!salespersonCalculation) {
      return {
        success: false,
        message: "Cálculo de comissão não encontrado para este vendedor",
      }
    }

    // Get quarterly bonus for this period if any
    const quarterlyBonus = await prisma.quarterlyBonusCalculation.findFirst({
      where: {
        reference_year: calculation.reference_year,
        reference_quarter: Math.ceil(calculation.reference_month / 3),
        status: "aprovada",
      },
      include: {
        salesperson_bonuses: {
          where: {
            salesperson_id: salespersonId,
          },
        },
      },
    })

    const bonusValue =
      quarterlyBonus && quarterlyBonus.salesperson_bonuses.length > 0
        ? Number(quarterlyBonus.salesperson_bonuses[0].bonus_value)
        : 0

    // Mock product details for this salesperson
    // In a real implementation, this would come from the database
    const productDetails = [
      {
        description: "PF Participativo",
        value: Number(salespersonCalculation.produced_value) * 0.5,
        commission: Number(salespersonCalculation.commission_value) * 0.5,
      },
      {
        description: "Migração",
        value: Number(salespersonCalculation.produced_value) * 0.3,
        commission: Number(salespersonCalculation.commission_value) * 0.3,
      },
      {
        description: "PJ Empresarial",
        value: Number(salespersonCalculation.produced_value) * 0.2,
        commission: Number(salespersonCalculation.commission_value) * 0.2,
      },
    ]

    // Generate report data
    const reportData = {
      calculation,
      salesperson: {
        code: salesperson.code,
        name: salesperson.name,
      },
      productDetails,
      totalCommission: Number(salespersonCalculation.commission_value),
      quarterlyBonus: bonusValue,
    }

    // In a real implementation, this would generate an actual XLSX file
    // For now, we'll just return the data
    return {
      success: true,
      message: "Relatório gerado com sucesso",
      data: reportData,
    }
  } catch (error) {
    console.error("Error generating individual report:", error)
    return {
      success: false,
      message: "Erro ao gerar relatório individual",
    }
  }
}
