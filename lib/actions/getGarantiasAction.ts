"use server";

import { getGarantiasList } from "@/lib/db/getGarantiasList";
import { EstadoGarantia } from "@/types/types";

type Params = {
    page?: number;
    search?: string;
    estado?: EstadoGarantia | null;
    sucursal?: string | null;
    sucursalActualId?: number;
    canViewAll: boolean;
};

export async function getGarantiasAction(params: Params) {
    return getGarantiasList(params);
}
