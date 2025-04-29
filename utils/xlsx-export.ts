import type { Calculation, ProductCalculation } from "@prisma/client"

// Type for team report data
export type TeamReportData = {
  calculation: Calculation
  productCalculations: ProductCalculation[]
  totalCommission: number
  totalQuarterlyBonus: number
}

// Type for individual report data
export type IndividualReportData = {
  calculation: Calculation
  salesperson: {
    code: string
    name: string
  }
  productDetails: {
    description: string
    value: number
    commission: number
  }[]
  totalCommission: number
  quarterlyBonus: number
}

/**
 * Generate XLSX data for team report
 */
export function generateTeamReportXLSX(data: TeamReportData): Uint8Array {
  // In a real implementation, this would use a library like exceljs or xlsx
  // to generate an actual XLSX file

  // For now, we'll just return a mock Uint8Array
  return new Uint8Array([1, 2, 3, 4, 5])
}

/**
 * Generate XLSX data for individual report
 */
export function generateIndividualReportXLSX(data: IndividualReportData): Uint8Array {
  // In a real implementation, this would use a library like exceljs or xlsx
  // to generate an actual XLSX file

  // For now, we'll just return a mock Uint8Array
  return new Uint8Array([1, 2, 3, 4, 5])
}

/**
 * Convert XLSX data to a downloadable blob URL
 */
export function xlsxToBlob(data: Uint8Array): string {
  const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  return URL.createObjectURL(blob)
}
