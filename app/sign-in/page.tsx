"use client"
import { authClient } from "@/lib/auth-client";
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
        <div className="w-full max-w-md flex flex-col items-center gap-2 pt-4 px-2 mx-auto">
            <img className="w-full" src="/Tukomer.png" alt="" />
            <button onClick={signIn} className="flex gap-2 items-center border border-gray-400/60 w-64 h-12 justify-center rounded-md bg-card-bg font-p cursor-pointer hover:bg-card-bg/70 shadow">
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
        </div>
    )
}