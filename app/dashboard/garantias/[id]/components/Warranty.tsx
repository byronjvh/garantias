import { Garantia as WarrantyType } from "@/types"

type Props = {
    id: string,
    warranty: WarrantyType
}

export default function Warranty({ id, warranty }: Props) {

    return (
        <div id="pdf" className="h-[11in] w-[8.5in] bg-white flex flex-col gap-4 p-10 text-xs">

        </div >
    )
}
// export default function Warranty({ id, warranty }: Props) {

//     return (
//         <div id="pdf" className="h-[11in] w-[8.5in] bg-white flex flex-col gap-4 p-10 text-xs">
//             <section className="header flex overflow-hidden justify-between items-center">
//                 <img src="/header.webp" className="h-full w-[350px] object-cover object-right" alt=" " />
//                 <div className="py-4 pr-10">
//                     <h3 className="font-bold text-lg">Orden de Servicio #{id}</h3>
//                     <p>
//                         Correo: soporte.yoses@crtechstore.com <br />
//                         Teléfono CR TECH: 2234-1032 <br />
//                         TUKOMER S.R.L <br />
//                         Ced.Juridica: 3-102-870210
//                     </p>
//                 </div>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-3">Fecha:</p> <p className="value col-span-3">{warranty?.fechas.ingreso}</p>
//                 <p className="label col-span-3">Número Telefónico:</p> <p className="value col-span-3">{warranty?.contacto.telefono}</p>
//                 <p className="label col-span-4">Nombre del cliente:</p> <p className="value name col-span-8">{warranty?.contacto.nombre}</p>
//                 <p className="label col-span-3">Factura:</p> <p className="value col-span-3">{warranty?.factura}</p>
//                 <p className="label col-span-3">Correo:</p> <p className="value col-span-3">{warranty?.contacto.correo}</p>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-4">Descripcion del Equipo:</p> <p className="value col-span-8">{warranty?.producto.descripcion}</p>
//                 <p className="label col-span-3">Equipo enciende:</p> <p className="value col-span-3">{warranty?.producto.encendido?.enciende ? "Sí" : "No"}</p>
//                 <p className="label col-span-3">Contraseña:</p> <p className="value col-span-3">{warranty?.producto.contrasena}</p>
//                 <p className="label col-span-3">Se puede formatear:</p> <p className="value col-span-3">{warranty?.producto.puede_formatear ? "Sí" : "No"}</p>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-3">Procesador:</p> <p className="value col-span-3">{warranty?.producto.cpu}</p>
//                 <p className="label col-span-3">Tarjeta de video:</p> <p className="value col-span-3">{warranty?.producto.gpu}</p>
//                 <p className="label col-span-3">Memoria RAM:</p> <p className="value col-span-3">{warranty?.producto.ram.cantidad}</p>
//                 <p className="label col-span-3">Módulos:</p> <p className="value col-span-3">{warranty?.producto.ram.modulos}</p>

//                 {warranty?.producto.almacenamiento.map((el, i) => (
//                     <div key={i} className="grid grid-cols-12 gap-px col-span-12">
//                         <p className="label col-span-3">Almacenamiento:</p> <p className="value col-span-3">{el.cantidad}</p>
//                         <p className="label col-span-3">Tipo:</p> <p className="value col-span-3">{el.tipo}</p>
//                     </div>
//                 ))}
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-4">Tapas:</p> <p className="value col-span-8">En caso de ser equipo de escritorio</p>
//                 <p className="label col-span-3">Tapa izquierda:</p> <p className="value col-span-3">{warranty?.producto.tapa_izquierda.material}</p>
//                 <p className="label col-span-3">Tapa derecha:</p> <p className="value col-span-3">{warranty?.producto.tapa_derecha.material}</p>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-4">Fuente de Poder:</p> <p className="value col-span-8">{warranty?.producto.psu.descripcion}</p>
//                 <p className="label col-span-3">Cantidad de watts:</p> <p className="value col-span-3">{warranty?.producto.psu.watts}</p>
//                 <p className="label col-span-3">Viene con cable:</p> <p className="value col-span-3">{warranty?.producto.psu.cable ? "Sí" : "No"}</p>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-4">Cargador:</p> <p className="value col-span-8">En caso de ser Laptop</p>
//                 <p className="label col-span-2">Viene incluido:</p> <p className="value col-span-2">{warranty?.producto.cargador.incluido ? "Sí" : "No"}</p>
//                 <p className="label col-span-2">Capacidad:</p> <p className="value col-span-2">{warranty?.producto.cargador.capacidad}</p>
//                 <p className="label col-span-2">Notas:</p> <p className="value col-span-2">{warranty?.producto.cargador.notas}</p>
//             </section >
//             <section className="warranty-section grid-rows-[repeat(3,1fr)_auto_1fr_auto]">
//                 <p className="label col-span-4">Estado del Equipo</p> <p className="value col-span-8"></p>
//                 <p className="label col-span-4">Número de serie:</p> <p className="value col-span-8">{warranty?.producto.serie}</p>
//                 <p className="label col-span-12">Estado físico y Observaciones:</p> <p className="value col-span-12">{warranty?.producto.estado_fisico}</p>
//                 <p className="label col-span-12">Detalle del problema o trabajo a realizar:</p> <p className="value col-span-12">{warranty?.producto.problema}</p>
//             </section>
//             <section className="warranty-section">
//                 <p className="label col-span-3">Firma del Cliente</p> <p className="value col-span-3"></p>
//                 <p className="label col-span-3">Firma de Recepción</p> <p className="value col-span-3"></p>
//             </section>
//         </div >
//     )
// }