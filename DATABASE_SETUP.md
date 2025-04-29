# Database Setup Instructions

This document provides instructions for setting up the database for the Sales Commission Management System.

## Prerequisites

- PostgreSQL installed and running
- Node.js and npm installed
- Prisma CLI installed globally (optional, but recommended)

## Setup Steps

1. Create a new PostgreSQL database:

\`\`\`sql
CREATE DATABASE comissao_db;
\`\`\`

2. Configure environment variables:

Edit the `.env` file and set the `DATABASE_URL` to match your PostgreSQL configuration:

\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/comissao_db?schema=public"
\`\`\`

3. Run database migrations:

\`\`\`bash
npm run db:migrate
\`\`\`

4. Seed the database with initial data:

\`\`\`bash
npm run db:seed
\`\`\`

5. (Optional) Open Prisma Studio to view and manage your data:

\`\`\`bash
npm run db:studio
\`\`\`

## Database Schema

The database schema includes the following tables:

- `User`: User accounts for the system
- `Salesperson`: Salespeople who can be commissioned
- `Product`: Products that can be sold and commissioned
- `ProductType`: Different types and codes for products
- `CommissionRule`: Rules for calculating commissions
- `Goal`: Goals for sales periods
- `AchievementRange`: Ranges for achievement categories
- `CommissionRate`: Commission rates for each product and achievement range
- `QuarterlyBonus`: Bonus calculations for quarterly performance
- `Calculation`: Monthly sales calculations
- `SalespersonCalculation`: Individual calculation results
- `ProductCalculation`: Product calculation results
- `QuarterlyBonusCalculation`: Quarterly bonus calculations
- `SalespersonQuarterlyBonus`: Individual quarterly bonus results
- `Sale`: Individual sales records

## Resetting the Database

If you need to reset the database to its initial state:

\`\`\`bash
npm run db:reset
\`\`\`

This will drop all tables, re-run all migrations, and seed the database with initial data.
