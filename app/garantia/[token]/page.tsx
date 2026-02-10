// app/dashboard/garantias/public/[token]/page.tsx

import { getPublicGarantia } from "@/lib/server/getPublicGarantía";

interface PageProps {
    params: Promise<{ token: string }>;
}

export default async function Page({ params }: PageProps) {
    const { token } = await params;

    const garantia = await getPublicGarantia(token);

    if (!garantia) {
        return <div>Garantía no encontrada</div>;
    }

    return (
        <div>
            <h1>Caso {garantia.consecutivo}</h1>
            <p>Estado: {garantia.estadoActual}</p>
        </div>
    );
}
