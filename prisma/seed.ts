import { prisma } from "@/lib/prisma"
import { seedSucursales } from "./seeds/sucursales.seed"
import { seedUsuarios } from "./seeds/usuarios.seed"
import { seedGarantias } from "./seeds/garantias.seed"

async function main() {
    await seedSucursales()
    await seedUsuarios()
    await seedGarantias()
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })
