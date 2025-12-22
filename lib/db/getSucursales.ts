import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { Sucursal } from "@/types/types";

export const getSucursales = cache(async (): Promise<Sucursal[]> => {
    const sucursales = await prisma.sucursal.findMany({
        select: {
            id: true,
            nombre: true,
        },
        orderBy: {
            nombre: "asc",
        },
    });

    return sucursales;
});
