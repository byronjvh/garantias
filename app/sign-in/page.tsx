"use client"
import { authClient } from "@/lib/auth-client";
import { Info } from "lucide-react";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Page() {
    const [loading, setLoading] = useState(false)
    const signIn = async () => {
        setLoading(true)
        const data = await authClient.signIn.social({
            provider: "microsoft",
            callbackURL: "/dashboard",
        }).finally(() => setLoading(false));

    };

    return (
        <div className="w-full max-w-sm flex flex-col mx-auto items-center">
            <img className="w-full max-w-64 mt-4" src="/Tukomer_2.png" alt="" />
            <div className="flex flex-col items-center mt-4 py-8 px-4 bg-card-bg rounded-md shadow-xl/5 border border-gray-400/60">
                <h1 className="font-semibold text-title-color text-2xl">Inicia Sesión</h1>
                <p>Inicia para acceder al sistema de garantías</p>

                <button onClick={signIn} className="mt-4 flex gap-2 items-center border border-gray-400/60 w-full h-12 justify-center rounded-md bg-card-bg font-p cursor-pointer hover:bg-card-bg/70 shadow">
                    {
                        loading ? (
                            <span className="self-center">
                                <ColorRing
                                    visible={true}
                                    height="48"
                                    width="48"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#F97316', '#FDBA74', '#84CC16', '#4D7C0F', '#365314']}
                                />
                            </span>
                        ) : (
                            <>
                                <img className="h-6" src="microsoft.webp" alt="microsoft" />
                                Iniciar con Microsoft
                            </>
                        )
                    }
                </button>
                <div className="flex gap-2 items-center mt-4 text-red-500/70">
                    <Info size={20} />
                    <p className="text-xs">Este sistema es únicamente de uso interno y no está abierto al público</p>
                </div>
            </div>
        </div>
    )
}