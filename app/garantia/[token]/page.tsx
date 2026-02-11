// app/dashboard/garantias/public/[token]/page.tsx

import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { getPublicGarantia } from "@/lib/server/getPublicGarantía";
import { ESTADO_PUBLICO_DESCRIPCION, ESTADO_PUBLICO_LABEL, ESTADO_PUBLICO_MAP, TipoProducto } from "@/types/types";

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
        <div className="mx-auto my-4 w-full max-w-[800px] flex flex-col gap-4 bg-card-bg p-4 pb-8 border border-gray-400/60 rounded shadow-lg/5">

            {/* HEADER */}
            <header className="flex items-center justify-between rounded-md bg-card-bg p-4 border border-gray-400/60">
                <div>
                    <img className="max-w-[150px]" src="/Tukomer_2.png" alt="logo" />
                </div>
                <div className="text-end">
                    <h1 className="text-xl font-title font-semibold text-slate-800">
                        Caso {garantia.consecutivo}
                    </h1>
                    <p className="text-sm text-slate-500">
                        Ingresado el {garantia.fechaIngreso.toLocaleDateString("es-CR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} a las {garantia.fechaIngreso.toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                        · {garantia.sucursalIngreso.nombre}
                    </p>
                </div>
            </header>

            {/* RESUMEN */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Cliente */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Cliente
                    </h3>
                    <p className="text-sm text-slate-800">{garantia.contacto.nombre}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.telefono}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.correo}</p>
                </div>

                {/* Producto */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Producto
                    </h3>
                    <p className="text-sm text-slate-800">
                        {garantia.producto.caracteristicas.descripcion}
                    </p>
                    <p className="text-sm text-slate-500">
                        {garantia.producto.caracteristicas.serie}
                    </p>
                    {
                        // garantia.producto.tipo === TipoProducto.PC && (
                        //     <button className="cursor-pointer mt-0.5 flex items-center gap-0.5 text-sm font-medium bg-orange-500/20 border border-orange-500/40 text-orange-900 hover:brightness-125 transition-all duration-200 ease-out py-0.5 px-2 rounded-full" onClick={() => setOpenSpecs(true)}>Ver ficha <ArrowRight size={18} /></button>
                        // )
                    }
                </div>

                {/* Falla */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Resumen
                    </h3>
                    <p className="text-sm text-slate-800 line-clamp-3">
                        {garantia.descripcion}
                    </p>
                </div>

            </div>
            <section className="mt-2">
                <h2 className="font-semibold font-title text-title-color mb-2">
                    Estado del caso
                </h2>
                <ul className="pl-2 border-t border-gray-400/60 pt-4">
                    {garantia.historial.map((el, i) => (
                        <li key={i} className="border-l-2 pl-4 pt-4 border-accent-2/60 relative">
                            <span className={`${garantia.historial.length - 1 === i ? "h-4 w-4" : "h-3 w-3"} bg-accent-2 absolute -left-px bottom-0 -translate-x-1/2 rounded-full`}></span>
                            <article className={`p-2 py-3 rounded-sm ${garantia.historial.length - 1 === i ? "bg-accent/10" : ""}`}>
                                <h3 className="font-semibold font-title text-title-color">
                                    {
                                        ESTADO_PUBLICO_LABEL[ESTADO_PUBLICO_MAP[el.estado]]
                                    }
                                </h3>
                                <p className="text-sm text-p-color/80">
                                    {
                                        ESTADO_PUBLICO_DESCRIPCION[ESTADO_PUBLICO_MAP[el.estado]]
                                    }
                                </p>
                            </article>
                        </li>
                    ))}
                    {
                        garantia.historial.length < 3 ? (
                            <>
                                <li>
                                    <article className="border-l-2 pl-4 pt-6 border-gray-300 relative">
                                        <span className="h-3 w-3 bg-gray-300 absolute -left-px bottom-0 -translate-x-1/2 rounded-full"></span>
                                        <h3 className="font-semibold font-title text-title-color/50">
                                            {
                                                ESTADO_PUBLICO_LABEL.EN_PROCESO
                                            }
                                        </h3>
                                    </article>
                                </li>
                                <li>
                                    <article className="border-l-2 pl-4 pt-6 border-gray-300 relative">
                                        <span className="h-3 w-3 bg-gray-300 absolute -left-px bottom-0 -translate-x-1/2 rounded-full"></span>
                                        <h3 className="font-semibold font-title text-title-color/50">
                                            {
                                                ESTADO_PUBLICO_LABEL.LISTA_PARA_RETIRO
                                            }
                                        </h3>
                                    </article>
                                </li>
                            </>
                        ) : ESTADO_PUBLICO_MAP[garantia.estadoActual] === ESTADO_PUBLICO_LABEL.LISTA_PARA_RETIRO ? (
                            <>
                            </>
                        ) : (
                            <li>
                                <article className="border-l-2 pl-4 pt-6 border-gray-300 relative">
                                    <span className="h-3 w-3 bg-gray-300 absolute -left-px bottom-0 -translate-x-1/2 rounded-full"></span>
                                    <h3 className="font-semibold font-title text-title-color/50">
                                        {
                                            ESTADO_PUBLICO_LABEL.LISTA_PARA_RETIRO
                                        }
                                    </h3>
                                </article>
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
}
