"use client"
import { authClient } from "@/lib/auth-client";

export default function Page() {

    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "microsoft",
            callbackURL: "/dashboard",
        });
        console.log(data.data)
    };

    return (
        <div className="w-full max-w-md flex flex-col items-center gap-2 pt-4 px-2 mx-auto">
            <img className="w-full" src="/Tukomer.png" alt="" />
            <button onClick={signIn}>Iniciar con Microsoft</button>
        </div>
    )
}