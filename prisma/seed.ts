import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      // In a real app, hash the password
      password: "admin123",
      role: "admin",
    },
  })

  console.log("Created admin user:", adminUser)

  // Create salespeople
  const salespeople = [
    { code: "V001", name: "Ana Silva", is_commissioned: true },
    { code: "V002", name: "Bruno Santos", is_commissioned: true },
    { code: "V003", name: "Carla Oliveira", is_commissioned: true },
    { code: "V004", name: "Daniel Pereira", is_commissioned: false },
    { code: "V005", name: "Eduardo Costa", is_commissioned: true },
    { code: "V006", name: "Fernanda Lima", is_commissioned: true },
    { code: "V007", name: "Gabriel Souza", is_commissioned: false },
    { code: "V008", name: "Helena Martins", is_commissioned: true },
  ]

  for (const person of salespeople) {
    await prisma.salesperson.upsert({
      where: { code: person.code },
      update: {},
      create: {
        code: person.code,
        name: person.name,
        is_commissioned: person.is_commissioned,
      },
    })
  }

  console.log("Created salespeople")

  // Create products
  const pfParticipativo = await prisma.product.upsert({
    where: { id: "prod_pfparticipativo" },
    update: {},
    create: {
      id: "prod_pfparticipativo",
      description: "PF Participativo",
      counts_for_goal: true,
      is_commissioned: true,
      product_types: {
        create: [
          {
            type: "Modalidade",
            codes: ["001", "002"],
          },
          {
            type: "Tipo de Plano",
            codes: ["PF"],
          },
        ],
      },
    },
  })

  const migracao = await prisma.product.upsert({
    where: { id: "prod_migracao" },
    update: {},
    create: {
      id: "prod_migracao",
      description: "Migração",
      counts_for_goal: true,
      is_commissioned: true,
      product_types: {
        create: [
          {
            type: "Modalidade",
            codes: ["003"],
          },
          {
            type: "Tipo de Plano",
            codes: ["PF", "PJ"],
          },
        ],
      },
    },
  })

  const opcional = await prisma.product.upsert({
    where: { id: "prod_opcional" },
    update: {},
    create: {
      id: "prod_opcional",
      description: "Opcional",
      counts_for_goal: false,
      is_commissioned: true,
      product_types: {
        create: [
          {
            type: "Módulo de Cobertura",
            codes: ["OPC1", "OPC2", "OPC3"],
          },
        ],
      },
    },
  })

  const pjEmpresarial = await prisma.product.upsert({
    where: { id: "prod_pjempresarial" },
    update: {},
    create: {
      id: "prod_pjempresarial",
      description: "PJ Empresarial",
      counts_for_goal: true,
      is_commissioned: true,
      product_types: {
        create: [
          {
            type: "Modalidade",
            codes: ["004", "005"],
          },
          {
            type: "Tipo de Plano",
            codes: ["PJ"],
          },
        ],
      },
    },
  })

  console.log("Created products")

  // Create commission rule
  const currentRule = await prisma.commissionRule.upsert({
    where: { id: "rule_2025_02" },
    update: {},
    create: {
      id: "rule_2025_02",
      rule_id: "R-2025-02",
      start_date: new Date("2025-04-01"),
      is_active: true,
    },
  })

  const previousRule = await prisma.commissionRule.upsert({
    where: { id: "rule_2025_01" },
    update: {},
    create: {
      id: "rule_2025_01",
      rule_id: "R-2025-01",
      start_date: new Date("2025-01-01"),
      end_date: new Date("2025-03-31"),
      is_active: false,
    },
  })

  console.log("Created commission rules")

  // Create goal and achievement ranges
  const goal = await prisma.goal.upsert({
    where: { id: "goal_2025_02" },
    update: {},
    create: {
      id: "goal_2025_02",
      rule_id: currentRule.id,
      value: 250000.0,
      achievement_ranges: {
        create: [
          {
            min_percentage: 0,
            max_percentage: 70,
            category: "Não atingida",
          },
          {
            min_percentage: 70,
            max_percentage: 90,
            category: "Parcial",
          },
          {
            min_percentage: 90,
            max_percentage: 100,
            category: "Meta",
          },
          {
            min_percentage: 100,
            max_percentage: 120,
            category: "Superação",
          },
          {
            min_percentage: 120,
            max_percentage: null,
            category: "Excelência",
          },
        ],
      },
    },
  })

  console.log("Created goal and achievement ranges")

  // Get achievement ranges for setting up commission rates
  const achievementRanges = await prisma.achievementRange.findMany({
    where: {
      goal_id: goal.id,
    },
  })

  // Create commission rates for each product and achievement range
  const products = [pfParticipativo, migracao, pjEmpresarial, opcional]
  const commissionRates = {
    "PF Participativo": {
      "Não atingida": 0,
      Parcial: 1,
      Meta: 2,
      Superação: 3,
      Excelência: 4,
    },
    Migração: {
      "Não atingida": 0,
      Parcial: 0.5,
      Meta: 1,
      Superação: 1.5,
      Excelência: 2,
    },
    "PJ Empresarial": {
      "Não atingida": 0,
      Parcial: 1.5,
      Meta: 2.5,
      Superação: 3.5,
      Excelência: 4.5,
    },
    Opcional: {
      "Não atingida": 0,
      Parcial: 2,
      Meta: 3,
      Superação: 4,
      Excelência: 5,
    },
  }

  for (const product of products) {
    for (const range of achievementRanges) {
      const rate = commissionRates[product.description][range.category]

      await prisma.commissionRate.upsert({
        where: {
          id: `rate_${product.id}_${range.id}`,
        },
        update: {},
        create: {
          id: `rate_${product.id}_${range.id}`,
          product_id: product.id,
          achievement_range_id: range.id,
          rate: rate,
        },
      })
    }
  }

  console.log("Created commission rates")

  // Create quarterly bonus
  const quarterlyBonus = await prisma.quarterlyBonus.upsert({
    where: { id: "bonus_2025" },
    update: {},
    create: {
      id: "bonus_2025",
      value: 5000.0,
      min_percentage: 95,
      is_active: true,
    },
  })

  console.log("Created quarterly bonus")

  // Create calculation examples
  const march2025Calculation = await prisma.calculation.upsert({
    where: { id: "calc_2025_03" },
    update: {},
    create: {
      id: "calc_2025_03",
      calculation_id: "AP-2025-03",
      rule_id: previousRule.id,
      reference_month: 3,
      reference_year: 2025,
      start_date: new Date("2025-03-01"),
      end_date: new Date("2025-03-31"),
      goal_value: 220000.0,
      achieved_value: 240000.0,
      achievement_percentage: 109,
      achievement_category: "Superação",
      commission_total: 7200.0,
      status: "concluída",
      product_calculations: {
        create: [
          {
            product_description: "PF Participativo",
            value: 120000.0,
            commission_rate: 3,
            commission_value: 3600.0,
          },
          {
            product_description: "Migração",
            value: 50000.0,
            commission_rate: 1.5,
            commission_value: 750.0,
          },
          {
            product_description: "PJ Empresarial",
            value: 70000.0,
            commission_rate: 3.5,
            commission_value: 2450.0,
          },
          {
            product_description: "Opcional",
            value: 10000.0,
            commission_rate: 4,
            commission_value: 400.0,
          },
        ],
      },
    },
  })

  console.log("Created calculation example")

  // Create salesperson calculation examples
  const salespersonData = [
    { code: "V001", name: "Ana Silva", value: 45000.0, commission: 1350.0 },
    { code: "V002", name: "Bruno Santos", value: 38000.0, commission: 1140.0 },
    { code: "V003", name: "Carla Oliveira", value: 52000.0, commission: 1560.0 },
    { code: "V005", name: "Eduardo Costa", value: 35000.0, commission: 1050.0 },
    { code: "V006", name: "Fernanda Lima", value: 42000.0, commission: 1260.0 },
    { code: "V008", name: "Helena Martins", value: 28000.0, commission: 840.0 },
  ]

  for (const sp of salespersonData) {
    const person = await prisma.salesperson.findUnique({
      where: { code: sp.code },
    })

    if (person) {
      await prisma.salespersonCalculation.create({
        data: {
          calculation_id: march2025Calculation.id,
          salesperson_id: person.id,
          produced_value: sp.value,
          commission_value: sp.commission,
        },
      })
    }
  }

  console.log("Created salesperson calculation examples")

  // Create quarterly bonus calculation
  const q1BonusCalc = await prisma.quarterlyBonusCalculation.upsert({
    where: { id: "qbonus_2025_q1" },
    update: {},
    create: {
      id: "qbonus_2025_q1",
      bonus_id: quarterlyBonus.id,
      reference_quarter: 1,
      reference_year: 2025,
      start_date: new Date("2025-01-01"),
      end_date: new Date("2025-03-31"),
      achieved_percentage: 103,
      is_approved: true,
      status: "aprovada",
    },
  })

  // Add monthly calculations for the quarterly bonus
  await prisma.quarterlyMonthlyCalculation.createMany({
    data: [
      {
        quarterly_calculation_id: q1BonusCalc.id,
        month: 1,
        year: 2025,
        achievement_percentage: 90,
      },
      {
        quarterly_calculation_id: q1BonusCalc.id,
        month: 2,
        year: 2025,
        achievement_percentage: 110,
      },
      {
        quarterly_calculation_id: q1BonusCalc.id,
        month: 3,
        year: 2025,
        achievement_percentage: 109,
      },
    ],
  })

  console.log("Created quarterly monthly calculations")

  // Add 1000.00 quarterly bonus for each commissioned salesperson except Helena (V008)
  for (const sp of salespersonData.slice(0, 5)) {
    const person = await prisma.salesperson.findUnique({
      where: { code: sp.code },
    })

    if (person) {
      await prisma.salespersonQuarterlyBonus.create({
        data: {
          quarterly_calculation_id: q1BonusCalc.id,
          salesperson_id: person.id,
          bonus_value: 1000.0,
        },
      })
    }
  }

  console.log("Created quarterly bonus calculation")

  console.log("Seed completed successfully")
}

main()
  .catch((e) => {
    console.error("Error during seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
