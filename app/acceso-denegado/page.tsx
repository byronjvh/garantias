"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

export default function Page() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const logOut = async () => {
        setLoading(true)
        const data = await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                    setLoading(false)
                },
            },
        });
    };

    return (
        <div className="text-center mt-8">
            <img className="w-full max-w-64" src="/Tukomer.png" alt="logo" />
            <h1 className="font-semibold text-title-color text-3xl">Acceso no autorizado</h1>
            <p className="text-p-color">Esta plataforma es de uso interno.</p>
            <PrimaryButton className="mt-2" onClick={logOut}>Cerrar Sesión</PrimaryButton>
        </div>
    )
}