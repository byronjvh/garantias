import { prisma } from "@/lib/prisma"

async function main() {
    const sucursales = [
        {
            nombre: "CEDI",
            direccion: "Sabanilla de Montes de Oca, San José, Costa Rica"
        },
        {
            nombre: "San Pedro",
            direccion: "Frente al Restaurante Il Padrino, Calle 67A entre Ruta 2 y Av8, San Pedro, San José"
        },
        {
            nombre: "Paseo de las Flores",
            direccion: "Mall Paseo de las Flores, Heredia"
        },
        {
            nombre: "City Mall",
            direccion: "City Mall, Alajuela"
        },
        {
            nombre: "Cartago",
            direccion: "Mall Paseo Metrópoli, Cartago"
        },
        {
            nombre: "Heredia",
            direccion: "100mts Oeste, 40101 Parque Juan de Jesús Flores Umaña, Heredia"
        },
    ]

    for (const sucursal of sucursales) {
        await prisma.sucursal.upsert({
            where: { nombre: sucursal.nombre },
            update: {},
            create: sucursal,
        })
    }

    console.log("Sucursales creadas o ya existentes ✔️")
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })
