import { prisma } from "@/lib/prisma"

export async function seedSucursales() {
    const sucursales = [
        {
            nombre: "CEDI",
            direccion: "Sabanilla de Montes de Oca, San José, Costa Rica",
            prefijo: "CD"
        },
        {
            nombre: "San Pedro",
            direccion: "Frente al Restaurante Il Padrino, Calle 67A entre Ruta 2 y Av8, San Pedro, San José",
            prefijo: "SP"
        },
        {
            nombre: "Paseo de las Flores",
            direccion: "Mall Paseo de las Flores, Heredia",
            prefijo: "PF"
        },
        {
            nombre: "City Mall",
            direccion: "City Mall, Alajuela",
            prefijo: "CM"
        },
        {
            nombre: "Cartago",
            direccion: "Mall Paseo Metrópoli, Cartago",
            prefijo: "CA"
        },
        {
            nombre: "Heredia Centro",
            direccion: "100mts Oeste, 40101 Parque Juan de Jesús Flores Umaña, Heredia",
            prefijo: "HC"
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
