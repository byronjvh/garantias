import { warrantyList } from "@/app/data/WarrantyList"
import Warranty from "./components/Warranty"
import "./page.module.css"

type Props = {
    params: {
        id: string
    }
    searchParams: Record<string, string | string[] | undefined>;
}


export default async function WarrantyPage({ params }: Props) {
    const { id } = await params
    const warranty = warrantyList.find(el => el.id === Number(id))


    if (!warranty) return <>No hay Garantía</>
    return (
        <main style={{ padding: 16 }}>
            <Warranty id={id} warranty={warranty} />
        </main>
    );
}
