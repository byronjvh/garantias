"use client";

import { Sucursal } from "@/types";
import { createContext, useContext } from "react";

type DashboardContextType = {
    sucursales: Sucursal[]
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({
    value,
    children,
}: {
    value: DashboardContextType;
    children: React.ReactNode;
}) {
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("useDashboard debe usarse dentro de DashboardProvider");
    }

    return context;
}
