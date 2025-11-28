import { Warranty } from "@/types";
import warrantyList from "../../../../GuaranteesExamples.json"
import "./page.module.css"

type Props = {
    params: {
        id: string
    }
    searchParams: Record<string, string | string[] | undefined>;
}


export default async function GarantiaPage({ params }: Props) {
    const { id } = await params
    const warranty = warrantyList.find(el => el.id === Number(id))
    console.log(warranty)

    return (
        <main style={{ padding: 20 }}>
            <div className="h-[11in] max-w-[8.5in] bg-white mx-auto flex flex-col gap-4 p-8">
                <h1>Boleta #{id} {warranty?.nombre}</h1>
                <section className="">
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Fecha:</p> <p className="value">{warranty?.fecha}</p></div>
                        <div className="flex-1 flex column"><p className="label">Número Telefónico:</p> <p className="value">{warranty?.telefono}</p></div>
                    </div>
                    <div className="flex row"><p className="label">Nombre del cliente:</p> <p className="value">{warranty?.nombre}</p></div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Factura:</p> <p className="value">{warranty?.factura}</p></div>
                        <div className="flex-1 flex column"><p className="label">Correo:</p> <p className="value">{warranty?.correo}</p></div>
                    </div>
                </section>
                <section>
                    <div className="flex-1 flex row"><p className="label">Descripcion del Equipo:</p> <p className="value">{warranty?.producto.descripcion}</p></div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">SKU:</p> <p className="value">{warranty?.producto.sku}</p></div>
                        <div className="flex-1 flex column"><p className="label">Equipo enciende:</p> <p className="value">{warranty?.producto.enciende ? "Sí" : "No"}</p></div>
                    </div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Contraseña:</p> <p className="value">{warranty?.producto.contrasena}</p></div>
                        <div className="flex-1 flex column"><p className="label">Se puede formatear:</p> <p className="value">{warranty?.producto.puede_formatear ? "Sí" : "No"}</p></div>
                    </div>
                </section>
                <section>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Procesador:</p> <p className="value">{warranty?.producto.cpu}</p></div>
                        <div className="flex-1 flex column"><p className="label">Tarjeta de video:</p> <p className="value">{warranty?.producto.gpu}</p></div>
                    </div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Memoria RAM:</p> <p className="value">{warranty?.producto.ram.cantidad}</p></div>
                        <div className="flex-1 flex column"><p className="label">Módulos:</p> <p className="value">{warranty?.producto.ram.modulos}</p></div>
                    </div>
                    {warranty?.producto.almacenamiento.map((el, i) => (
                        <div className="flex row" key={i}>
                            <div className="flex-1 flex column"><p className="label">Almacenamiento:</p> <p className="value">{el.cantidad}</p></div>
                            <div className="flex-1 flex column"><p className="label">Tipo:</p> <p className="value">{el.tipo}</p></div>
                        </div>
                    ))}
                </section>
                <section>
                    <div className="flex-1 flex row"><p className="label">Tapas:</p> <p className="value">En caso de ser equipo de escritorio</p></div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Tapa izquierda:</p> <p className="value">{warranty?.producto.tapa_izquierda.material}</p></div>
                        <div className="flex-1 flex column"><p className="label">Tapa derecha:</p> <p className="value">{warranty?.producto.tapa_derecha.material}</p></div>
                    </div>
                </section>
                <section>
                    <div className="flex-1 flex row"><p className="label">Fuente de Poder:</p> <p className="value">{warranty?.producto.psu.descripcion}</p></div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Cantidad de watts:</p> <p className="value">{warranty?.producto.psu.watts}</p></div>
                        <div className="flex-1 flex column"><p className="label">Viene con cable:</p> <p className="value">{warranty?.producto.psu.cable ? "Sí" : "No"}</p></div>
                    </div>
                </section>
                <section>
                    <div className="flex-1 flex row"><p className="label">Cargador:</p> <p className="value">En caso de ser Laptop</p></div>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Viene incluido:</p> <p className="value">{warranty?.producto.cargador.incluido ? "Sí" : "No"}</p></div>
                        <div className="flex-1 flex column"><p className="label">Capacidad:</p> <p className="value">{warranty?.producto.cargador.capacidad}</p></div>
                        <div className="flex-1 flex column"><p className="label">Notas:</p> <p className="value">{warranty?.producto.cargador.notas}</p></div>

                    </div>
                </section>
                <section>
                    <div className="flex-1 flex row"><p className="label">Estado del Equipo</p> <p className="value"></p></div>
                    <div className="flex-1 flex row"><p className="label">Número de serie:</p> <p className="value">{warranty?.producto.serie}</p></div>
                    <div className="flex-1 flex flex-col row"><p className="label">Estado físico y Observaciones:</p> <p className="value">{warranty?.producto.estado_fisico}</p></div>
                    <div className="flex-1 flex flex-col row"><p className="label">Detalle del problema o trabajo a realizar:</p> <p className="value">{warranty?.producto.problema}</p></div>
                </section>
                <section>
                    <div className="flex row">
                        <div className="flex-1 flex column"><p className="label">Firma del Cliente</p> <p className="value"></p></div>
                        <div className="flex-1 flex column"><p className="label">Firma de Recepción</p> <p className="value"></p></div>
                    </div>
                </section>
            </div>
        </main>
    );
}
