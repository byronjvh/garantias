"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";


console.log("Si entré al fichero de getRol")
export async function getRol() {
    console.log("Entré a la action")
    try {
        console.log("Entré al try")
        // 1. Obtén la sesión CORRECTAMENTE
        const session = await auth.api.getSession({
            headers: await headers() // you need to pass the headers object.
        })
        console.log("Obtuve la session", session)
        
        // 2. Verifica que haya sesión
        if (!session?.user?.id) {
            return { success: false, error: "No autenticado" };
        }
        
        const authId = session.user.id;
        
        // 3. Busca el usuario en tu base de datos
        const usuario = await prisma.usuario.findUnique({
            where: { authId },
            select: { sucursalId: true, id: true },
        });

        if (!usuario?.sucursalId || !usuario?.id) {
            return { success: false, error: "Usuario no encontrado en sucursal" };
        }

        // 4. Obtén el rol
        const rol = await prisma.usuarioSucursal.findUnique({
            where: {
                usuarioId_sucursalId: {
                    usuarioId: usuario.id,
                    sucursalId: usuario.sucursalId,
                },
            },
            select: {
                rol: true,
            },
        });

        return {
            success: true,
            rol: rol?.rol || "sin-rol"
        };
        
    } catch (error) {
        console.error("Error en getRol:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Error desconocido" 
        };
    }
}