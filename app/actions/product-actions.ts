"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

type ProductTypeInput = {
  type: string
  codes: string[]
}

/**
 * Add a new product
 */
export async function addProduct(
  description: string,
  countsForGoal: boolean,
  isCommissioned: boolean,
  productTypes: ProductTypeInput[],
) {
  try {
    const product = await prisma.product.create({
      data: {
        description,
        counts_for_goal: countsForGoal,
        is_commissioned: isCommissioned,
        product_types: {
          create: productTypes.map((pt) => ({
            type: pt.type,
            codes: pt.codes,
          })),
        },
      },
      include: {
        product_types: true,
      },
    })

    revalidatePath("/regras/produtos")

    return {
      success: true,
      message: "Produto adicionado com sucesso",
      data: product,
    }
  } catch (error) {
    console.error("Error adding product:", error)
    return {
      success: false,
      message: "Erro ao adicionar produto",
    }
  }
}

/**
 * Update a product
 */
export async function updateProduct(
  id: string,
  description: string,
  countsForGoal: boolean,
  isCommissioned: boolean,
  productTypes: ProductTypeInput[],
) {
  try {
    // First, delete existing product types
    await prisma.productType.deleteMany({
      where: { product_id: id },
    })

    // Then update the product and create new product types
    const product = await prisma.product.update({
      where: { id },
      data: {
        description,
        counts_for_goal: countsForGoal,
        is_commissioned: isCommissioned,
        product_types: {
          create: productTypes.map((pt) => ({
            type: pt.type,
            codes: pt.codes,
          })),
        },
      },
      include: {
        product_types: true,
      },
    })

    revalidatePath("/regras/produtos")

    return {
      success: true,
      message: "Produto atualizado com sucesso",
      data: product,
    }
  } catch (error) {
    console.error("Error updating product:", error)
    return {
      success: false,
      message: "Erro ao atualizar produto",
    }
  }
}

/**
 * Update product goal and commission status
 */
export async function updateProductStatus(id: string, countsForGoal: boolean, isCommissioned: boolean) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        counts_for_goal: countsForGoal,
        is_commissioned: isCommissioned,
      },
    })

    revalidatePath("/regras/produtos")

    return {
      success: true,
      message: "Status do produto atualizado com sucesso",
      data: product,
    }
  } catch (error) {
    console.error("Error updating product status:", error)
    return {
      success: false,
      message: "Erro ao atualizar status do produto",
    }
  }
}

/**
 * Get all products
 */
export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        product_types: true,
      },
      orderBy: { description: "asc" },
    })

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      success: false,
      message: "Erro ao buscar produtos",
    }
  }
}
