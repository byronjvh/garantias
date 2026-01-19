import { EstadoGarantia, Rol } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { TipoProducto } from "@/types/types";

function buildConsecutivo(
    prefijo: string,
    id: number,
    fecha: Date
) {
    const yyyy = fecha.getFullYear()
    const yy = yyyy.toString().slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");

    // Ej: CD-202503-12
    return `${prefijo}-${mm}${yy}-${id}`;
}

export async function seedGarantias() {
    const sucursalCEDI = await prisma.sucursal.findUnique({
        where: { prefijo: "CD" },
    });

    const sucursalSP = await prisma.sucursal.findUnique({
        where: { prefijo: "SP" },
    });

    if (!sucursalCEDI || !sucursalSP) {
        throw new Error("❌ Sucursales requeridas no existen");
    }

    await prisma.$transaction(async (tx) => {
        // ===============================
        // GARANTÍA 1 – CEDI
        // ===============================
        const fecha1 = new Date("2025-03-22T10:30:00Z");

        const garantia1 = await tx.garantia.create({
            data: {
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

                sucursalActualId: sucursalCEDI.id,
                sucursalIngresoId: sucursalCEDI.id,
                producto: {
                    tipo: TipoProducto.PC,
                    caracteristicas: {
                        descripcion: "Laptop Gamer ASUS TUF",
                        estadoFisico: "Marcas de uso",
                        serie: "SNAS123456",
                        encendido: {
                            enciende: false,
                            puedeFormatear: true,
                        },
                        hardware: {
                            cpu: "Ryzen 7 4800H",
                            gpu: "RTX 3050 Ti",
                            ram: { modulos: 2, total: "16GB" },
                            almacenamiento: [{ tipo: "NVMe", capacidad: "512GB" }],
                        },
                    }
                },

                cuentaDuenaId: 10,
                ingresadoPorId: 2,
                fechaIngreso: fecha1,

                sucursales: {
                    create: {
                        sucursalId: sucursalCEDI.id,
                    },
                },

                historial: {
                    create: [
                        {
                            estado: EstadoGarantia.INGRESADA,
                            sucursalId: sucursalCEDI.id,
                            usuarioId: 2,
                            usuarioRol: Rol.ASESOR,
                            usuarioNombre: "Usuario 2",
                            fecha: fecha1,
                        },
                        {
                            estado: EstadoGarantia.EN_REVISION_CEDI,
                            sucursalId: sucursalCEDI.id,
                            usuarioId: 4,
                            usuarioRol: Rol.TECNICO_2,
                            usuarioNombre: "Usuario 4",
                            fecha: new Date("2025-03-24T08:40:00Z"),
                        },
                    ],
                },
            },
        });

        await tx.garantia.update({
            where: { id: garantia1.id },
            data: {
                consecutivo: buildConsecutivo(
                    sucursalCEDI.prefijo,
                    garantia1.id,
                    fecha1
                ),
            },
        });

        // ===============================
        // GARANTÍA 2 – SAN PEDRO
        // ===============================
        const fecha2 = new Date("2025-04-01T09:37:00Z");

        const garantia2 = await tx.garantia.create({
            data: {
                resumen: "PC se queda pegada",
                descripcion: "Después de un rato de jugar el equipo se congela",
                estadoActual: EstadoGarantia.EN_REVISION_SUCURSAL,
                factura: "INV-8892312",

                sucursalActualId: sucursalSP.id,
                sucursalIngresoId: sucursalSP.id,
                contacto: {
                    nombre: "Maria Hernández",
                    correo: "mariah22@example.com",
                    telefono: "88888888",
                },

                producto: {
                    tipo: TipoProducto.PC,
                    caracteristicas: {
                        descripcion: "PC La Mítica",
                        estadoFisico: "Rayón en la tapa trasera",
                        serie: "NA",
                        encendido: {
                            enciende: true,
                            puedeFormatear: true,
                        },
                        hardware: {
                            cpu: "Ryzen 7 7700X",
                            gpu: "RTX 5070 Ti",
                            ram: { modulos: 2, total: "32GB" },
                            almacenamiento: [{ tipo: "NVMe", capacidad: "1TB" }],
                        },
                    }
                },

                cuentaDuenaId: 10,
                ingresadoPorId: 2,
                fechaIngreso: fecha2,

                sucursales: {
                    create: {
                        sucursalId: sucursalSP.id,
                    },
                },

                historial: {
                    create: [
                        {
                            estado: EstadoGarantia.INGRESADA,
                            sucursalId: sucursalSP.id,
                            usuarioId: 4,
                            usuarioRol: Rol.ASESOR,
                            usuarioNombre: "Usuario 4",
                            fecha: fecha2,
                        },
                        {
                            estado: EstadoGarantia.EN_REVISION_SUCURSAL,
                            sucursalId: sucursalSP.id,
                            usuarioId: 9,
                            usuarioRol: Rol.TECNICO,
                            usuarioNombre: "Usuario 9",
                            fecha: new Date("2025-04-04T11:40:00Z"),
                        },
                    ],
                },
            },
        });

        await tx.garantia.update({
            where: { id: garantia2.id },
            data: {
                consecutivo: buildConsecutivo(
                    sucursalSP.prefijo,
                    garantia2.id,
                    fecha2
                ),
            },
        });
    });

    console.log("Garantías creadas correctamente ✔️");
}
