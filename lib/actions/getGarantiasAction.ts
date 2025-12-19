"use server";

import { getGarantiasList } from "@/lib/db/getGarantiasList";

type Params = {
    page?: number;
    sucursalActualId?: number;
    canViewAll: boolean;
};

export async function getGarantiasAction(params: Params) {
    return getGarantiasList(params);
}
