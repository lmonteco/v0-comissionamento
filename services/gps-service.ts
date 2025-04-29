/**
 * Service for integrating with the GPS system
 * This is a placeholder implementation that would be replaced with actual API calls
 */

// Type for salesperson data from GPS
export type GPSSalesperson = {
  code: string
  name: string
  active: boolean
  department: string
}

// Mock data for development - would be replaced with actual API calls
const mockGPSSalespeople: GPSSalesperson[] = [
  { code: "V001", name: "Ana Silva", active: true, department: "Vendas" },
  { code: "V002", name: "Bruno Santos", active: true, department: "Vendas" },
  { code: "V003", name: "Carla Oliveira", active: true, department: "Vendas" },
  { code: "V004", name: "Daniel Pereira", active: true, department: "Vendas" },
  { code: "V005", name: "Eduardo Costa", active: true, department: "Vendas" },
  { code: "V006", name: "Fernanda Lima", active: true, department: "Vendas" },
  { code: "V007", name: "Gabriel Souza", active: true, department: "Vendas" },
  { code: "V008", name: "Helena Martins", active: true, department: "Vendas" },
  { code: "V009", name: "Igor Mendes", active: true, department: "Vendas" },
  { code: "V010", name: "Julia Ferreira", active: true, department: "Vendas" },
]

export class GPSService {
  /**
   * Fetch a salesperson by their code
   * @param code The salesperson code
   * @returns The salesperson data or null if not found
   */
  static async getSalespersonByCode(code: string): Promise<GPSSalesperson | null> {
    // In a real implementation, this would make an API call to the GPS system
    // For now, we'll use the mock data
    const salesperson = mockGPSSalespeople.find((sp) => sp.code === code)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return salesperson || null
  }

  /**
   * Search for salespeople by name
   * @param query The search query
   * @returns An array of matching salespeople
   */
  static async searchSalespeople(query: string): Promise<GPSSalesperson[]> {
    // In a real implementation, this would make an API call to the GPS system
    // For now, we'll use the mock data
    const results = mockGPSSalespeople.filter(
      (sp) => sp.name.toLowerCase().includes(query.toLowerCase()) || sp.code.includes(query),
    )

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return results
  }

  /**
   * Get all active salespeople
   * @returns An array of all active salespeople
   */
  static async getAllActiveSalespeople(): Promise<GPSSalesperson[]> {
    // In a real implementation, this would make an API call to the GPS system
    // For now, we'll use the mock data
    const results = mockGPSSalespeople.filter((sp) => sp.active)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return results
  }
}
