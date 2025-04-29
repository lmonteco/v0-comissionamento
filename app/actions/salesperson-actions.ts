"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { GPSService } from "@/services/gps-service"

/**
 * Add a new salesperson with data from GPS
 */
export async function addSalesperson(code: string, isCommissioned: boolean) {
  try {
    // Check if salesperson already exists
    const existingSalesperson = await prisma.salesperson.findUnique({
      where: { code },
    })

    if (existingSalesperson) {
      return {
        success: false,
        message: "Vendedor com este código já existe",
      }
    }

    // Fetch salesperson data from GPS
    const gpsData = await GPSService.getSalespersonByCode(code)

    if (!gpsData) {
      return {
        success: false,
        message: "Vendedor não encontrado no GPS",
      }
    }

    // Create the salesperson
    const salesperson = await prisma.salesperson.create({
      data: {
        code,
        name: gpsData.name,
        is_commissioned: isCommissioned,
      },
    })

    revalidatePath("/regras/vendedores")

    return {
      success: true,
      message: "Vendedor adicionado com sucesso",
      data: salesperson,
    }
  } catch (error) {
    console.error("Error adding salesperson:", error)
    return {
      success: false,
      message: "Erro ao adicionar vendedor",
    }
  }
}

/**
 * Update a salesperson's commission status
 */
export async function updateSalespersonCommissionStatus(id: string, isCommissioned: boolean) {
  try {
    const salesperson = await prisma.salesperson.update({
      where: { id },
      data: { is_commissioned: isCommissioned },
    })

    revalidatePath("/regras/vendedores")

    return {
      success: true,
      message: "Status de comissionamento atualizado com sucesso",
      data: salesperson,
    }
  } catch (error) {
    console.error("Error updating salesperson commission status:", error)
    return {
      success: false,
      message: "Erro ao atualizar status de comissionamento",
    }
  }
}

/**
 * Delete a salesperson
 */
export async function deleteSalesperson(id: string) {
  try {
    await prisma.salesperson.delete({
      where: { id },
    })

    revalidatePath("/regras/vendedores")

    return {
      success: true,
      message: "Vendedor excluído com sucesso",
    }
  } catch (error) {
    console.error("Error deleting salesperson:", error)
    return {
      success: false,
      message: "Erro ao excluir vendedor",
    }
  }
}

/**
 * Get all salespeople
 */
export async function getAllSalespeople() {
  try {
    const salespeople = await prisma.salesperson.findMany({
      orderBy: { name: "asc" },
    })

    return {
      success: true,
      data: salespeople,
    }
  } catch (error) {
    console.error("Error fetching salespeople:", error)
    return {
      success: false,
      message: "Erro ao buscar vendedores",
    }
  }
}

/**
 * Search for salespeople in GPS
 */
export async function searchGPSSalespeople(query: string) {
  try {
    const results = await GPSService.searchSalespeople(query)

    return {
      success: true,
      data: results,
    }
  } catch (error) {
    console.error("Error searching GPS salespeople:", error)
    return {
      success: false,
      message: "Erro ao buscar vendedores no GPS",
    }
  }
}
