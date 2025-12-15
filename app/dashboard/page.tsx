"use client"
import { Info } from "lucide-react";
import { useDashboard } from "./DashboardContext"
import SelectButton from "./components/SelectButton"
import { useState } from "react";
import { useConfirm } from "../hooks/useConfirm";
import { ConfirmDialog } from "../components/ConfirmDialog";
import PrimaryButton from "../components/PrimaryButton";
import { setUsuarioSucursal } from "@/lib/actions/setUsuarioSucursal";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { verificarSucursal } from "@/lib/actions/verificarSucursal";

export default function DashboardHome() {
    const { sucursales } = useDashboard()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const { user } = useUser()
    const router = useRouter()
    const {
        open,
        confirm,
        handleConfirm,
        handleCancel,
    } = useConfirm();


    const updateSelectedId = (id: number) => {
        setSelectedId(id)
    }

    async function onConfirm() {
        if (!selectedId || !user) return
        await setUsuarioSucursal({
            clerkId: user.id,
            sucursalId: selectedId,
        })

        router.push("/dashboard/garantias")
    }

    return (
        <div className="mt-4 flex flex-col w-full max-w-lg gap-6 bg-card-bg mx-auto p-6 py-8 rounded-md shadow-2xl shadow-black/10">
            <h3 className="font-title text-title-color font-bold">Elige tu sucursal:</h3>
            <ul className="flex flex-col w-full gap-3">
                {sucursales?.map((sucursal) => (
                    <li className="inline-flex" key={sucursal.id}>
                        <SelectButton sucursal={sucursal} selectedId={selectedId} onSelect={updateSelectedId} />
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between gap-2">
                <p className="text-sm flex gap-1 items-center opacity-80"><span><Info className="text-current" size={18} /></span>Define dónde se registran las garantías</p>
                <PrimaryButton disabled={selectedId === null} onClick={() => confirm(onConfirm)} className="py-3">
                    Continuar
                </PrimaryButton>
                <ConfirmDialog
                    open={open}
                    title="Seleccionar Sucursal"
                    description={`¿Estás seguro que deseas seleccionar la sucursal ${sucursales.find(sucursal => sucursal.id === selectedId)?.nombre}?`}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel} />
            </div>

        </div>
    )

}