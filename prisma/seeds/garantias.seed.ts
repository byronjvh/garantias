import { EstadoGarantia, Rol } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function seedGarantias() {
    await prisma.garantia.upsert({
        where: { consecutivo: "CD-0001" },
        update: {},
        create: {
            consecutivo: "CD-0001",
            resumen: "Laptop no enciende después de actualización",
            descripcion:
                "El equipo dejó de encender luego de una actualización del sistema operativo.",
            estadoActual: EstadoGarantia.EN_REVISION_CEDI,
            factura: "INV-889123",

            contacto: {
                nombre: "Gabriel",
                correo: "gabriel@example.com",
                telefono: "88888888",
            },

            producto: {
                tipo: "LAPTOP",
                descripcion: "Laptop Gamer ASUS TUF",
                serie: "SNAS123456",
                encendido: {
                    enciende: false,
                    puedeFormatear: true,
                },
                hardware: {
                    cpu: "Ryzen 7 4800H",
                    gpu: "RTX 3050 Ti",
                    ram: {
                        modulos: 2,
                        total: "16GB",
                    },
                    almacenamiento: [
                        {
                            tipo: "NVMe",
                            capacidad: "512GB",
                        },
                    ],
                },
                cargador: "90W Original",
            },

            sucursalId: 1,
            sucursalNombre: "CEDI",
            sucursalPrefijo: "CD",

            cuentaDuenaId: 10,
            ingresadoPorId: 2,

            fechaIngreso: new Date("2025-03-22T10:30:00Z"),

            historial: {
                create: [
                    {
                        estado: EstadoGarantia.INGRESADA,
                        usuarioId: 2,
                        usuarioRol: Rol.ASESOR,
                        usuarioNombre: "Usuario 2",
                        fecha: new Date("2025-03-22T10:30:00Z"),
                    },
                    {
                        estado: EstadoGarantia.EN_REVISION_SUCURSAL,
                        usuarioId: 3,
                        usuarioRol: Rol.TECNICO,
                        usuarioNombre: "Usuario 3",
                        fecha: new Date("2025-03-22T12:00:00Z"),
                    },
                    {
                        estado: EstadoGarantia.ESCALADA_A_CEDI,
                        usuarioId: 3,
                        usuarioRol: Rol.TECNICO,
                        usuarioNombre: "Usuario 3",
                        fecha: new Date("2025-03-23T09:15:00Z"),
                    },
                    {
                        estado: EstadoGarantia.EN_REVISION_CEDI,
                        usuarioId: 4,
                        usuarioRol: Rol.TECNICO_2,
                        usuarioNombre: "Usuario 4",
                        fecha: new Date("2025-03-24T08:40:00Z"),
                    },
                ],
            },
        },
    });

    await prisma.garantia.upsert({
        where: { consecutivo: "SJ-0042" },
        update: {},
        create: {
            consecutivo: "SJ-0042",
            resumen: "PC no da video después de mantenimiento",
            descripcion:
                "Luego de una limpieza interna el equipo dejó de dar imagen.",
            estadoActual: EstadoGarantia.EN_REVISION_SUCURSAL,
            factura: "INV-889124",

            contacto: {
                nombre: "Luis Rodríguez",
                correo: "luisr@example.com",
                telefono: "89991234",
            },

            producto: {
                tipo: "ESCRITORIO",
                descripcion: "PC Gaming armado",
                serie: "PC-ARM-8891",
                encendido: {
                    enciende: true,
                },
                hardware: {
                    cpu: "Intel Core i5-10400",
                    gpu: "GTX 1660 Super",
                    ram: {
                        modulos: 2,
                        total: "16GB",
                    },
                    almacenamiento: [
                        { tipo: "SSD", capacidad: "512GB" },
                        { tipo: "HDD", capacidad: "1TB" },
                    ],
                    psu: "ASUS 700W",
                },
            },

            sucursalId: 2,
            sucursalNombre: "San José Centro",
            sucursalPrefijo: "SJ",

            cuentaDuenaId: 5,
            ingresadoPorId: 8,

            fechaIngreso: new Date("2025-04-01T09:10:00Z"),

            historial: {
                create: [
                    {
                        estado: EstadoGarantia.INGRESADA,
                        usuarioId: 8,
                        usuarioRol: Rol.ASESOR,
                        usuarioNombre: "Usuario 8",
                        fecha: new Date("2025-04-01T09:10:00Z"),
                    },
                    {
                        estado: EstadoGarantia.EN_REVISION_SUCURSAL,
                        usuarioId: 11,
                        usuarioRol: Rol.TECNICO,
                        usuarioNombre: "Usuario 11",
                        fecha: new Date("2025-04-01T11:45:00Z"),
                    },
                ],
            },
        },
    });

    console.log("Garantías creadas o ya existentes ✔️");
}
