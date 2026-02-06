import { DOCUMENT_TYPE, DocumentType } from "@/app/components/PrintDialog";
import { addYears, daysBetween } from "@/app/utils/date";
import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { GarantiaDetails } from "@/types/garantiaDetails"
import { TipoProducto } from "@/types/types";

type Props = {
    warranty: GarantiaDetails,
    id: string,
    documentType: DocumentType,
}

const ingresoConfig = {
    title: "Comprobante de Ingreso de Equipo",
};

export default function WarrantyReceipt({ warranty, documentType, id }: Props) {
    const dictionary: Record<DocumentType, { title: string }> = {
        [DOCUMENT_TYPE.ENTREGA]: {
            title: "Comprobante de Entrega de Equipo",
        },
        [DOCUMENT_TYPE.INGRESO]: ingresoConfig,
        [DOCUMENT_TYPE.INGRESO_AMPLIADO]: ingresoConfig
    }

    return (
        <div id={id} className="pdf-receipt">
            <div className="pdf-header">
                <div>
                    <img className="pdf-logo" src="/logo.png" alt="CR Tech" />
                    <h1 className="pdf-subtitle"> Sucursal {warranty.sucursalIngreso.nombre}</h1>
                    <p className="pdf-title">{dictionary[documentType].title}</p>
                </div>

                <div className="pdf-header-right">
                    <p className="pdf-label">Ingreso Nº</p>
                    <p className="pdf-number">{warranty.consecutivo}</p>
                    <p className="pdf-date">Fecha: {warranty.fechaIngreso.toLocaleString("es-CR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}</p>
                </div>
            </div>

            <section className="pdf-section">
                <h2 className="pdf-section-title">Datos del Cliente</h2>
                <div className="pdf-grid-2">
                    <p><strong>Nombre:</strong> {warranty.contacto.nombre}</p>
                    <p><strong>Teléfono:</strong> {warranty.contacto.telefono}</p>
                    <p className="pdf-span-2">
                        <strong>Correo:</strong> {warranty.contacto.correo}
                    </p>
                </div>
            </section>

            {
                (documentType === DOCUMENT_TYPE.INGRESO || documentType === DOCUMENT_TYPE.INGRESO_AMPLIADO) && (
                    <>
                        <section className="pdf-section">
                            <h2 className="pdf-section-title">Información del Ingreso</h2>
                            <div className="pdf-grid-2">
                                <p><strong>Factura:</strong> {warranty.factura}</p>
                                <p><strong>Sucursal:</strong> {warranty.sucursalIngreso.nombre}</p>
                                <p><strong>Fecha:</strong> {warranty.fechaIngreso.toLocaleString("es-CR")}</p>
                                <p className="pdf-span-2">
                                    <strong>Estado actual:</strong> {humanizeEstadoGarantia(warranty.estadoActual)}
                                </p>
                            </div>
                        </section>
                        <section className="pdf-section">
                            <h2 className="pdf-section-title">Equipo Ingresado</h2>
                            <div className="pdf-grid-2">
                                <p><strong>Descripción:</strong> {warranty.producto.caracteristicas.descripcion}</p>
                                <p><strong>Tipo:</strong> {warranty.producto.tipo === TipoProducto.PC ? "PC o Laptop" : warranty.producto.tipo}</p>
                                {warranty.producto.caracteristicas.accesorios && (
                                    <p><strong>Accesorios:</strong> {warranty.producto.caracteristicas.accesorios}</p>
                                )}
                                {
                                    warranty.producto.tipo === TipoProducto.PC && documentType === DOCUMENT_TYPE.INGRESO_AMPLIADO && (
                                        <>
                                            <p><strong>Procesador:</strong> {warranty.producto.caracteristicas.hardware?.cpu}</p>
                                            <p><strong>Tarjeta de video:</strong> {warranty.producto.caracteristicas.hardware?.gpu}</p>
                                            <p><strong>Memoria RAM:</strong> {warranty.producto.caracteristicas.hardware?.ram?.modulos} modulos, total {warranty.producto.caracteristicas.hardware?.ram?.total} </p>
                                            <p><strong>Almacenamiento:</strong>
                                                {
                                                    warranty.producto.caracteristicas.hardware?.almacenamiento?.map((disco, i) => (
                                                        <span key={i}>
                                                            {i > 0 ? ", " : " "} {disco.tipo} {disco.capacidad}
                                                        </span>
                                                    ))
                                                }
                                            </p>

                                        </>
                                    )
                                }
                            </div>
                        </section>
                        <section className="pdf-section">
                            <h2 className="pdf-section-title">Falla Reportada</h2>
                            <p>{warranty.descripcion}</p>
                        </section>

                        <section className="pdf-section">
                            <h2 className="pdf-section-title">Condición Física</h2>
                            <p>{warranty.producto.caracteristicas.estadoFisico}</p>
                        </section>
                        <section className="pdf-term">
                            <h2 className="pdf-term-title">
                                RESUMEN DE TÉRMINOS Y CONDICIONES DE GARANTÍA
                            </h2>
                            <p className="pdf-term-p">
                                La garantía es válida únicamente en Costa Rica presentando la factura original. El plazo para reclamos es de 30 días naturales desde la compra o desde que se conoció el daño oculto, según Ley 7472.
                            </p>
                            <ul className="pdf-list">
                                <li className="pdf-list-item">
                                    El equipo se reemplazará por fallas de fábrica dentro de las primeras 24 horas.
                                </li>
                                <li className="pdf-list-item">
                                    El tiempo de reparación puede tomar hasta 30 días hábiles según lo estipulado por la ley para la revisión y diagnóstico del equipo.
                                </li>
                                <li className="pdf-list-item">
                                    La garantía no cubre daños por mal uso, modificación, reparaciones no autorizadas, problemas de software (virus), picos de voltaje o daños por líquidos.
                                </li>
                                <li className="pdf-list-item">
                                    Tukomer S.R.L. aplica las políticas de garantía del fabricante original.
                                </li>
                                <li className="pdf-list-item">
                                    Es responsabilidad del cliente respaldar toda su información personal. Tukomer S.R.L. no se hace responsable por la pérdida de datos durante la reparación.
                                </li>
                                <li className="pdf-list-item">
                                    Si el equipo no es reclamado 90 días después de ser notificado, pasará a ser propiedad de Tukomer S.R.L. para cubrir costos.
                                </li>
                            </ul>

                        </section>
                    </>
                )
            }

            {
                documentType === DOCUMENT_TYPE.ENTREGA && (
                    <>
                        <section className="pdf-section">
                            <h2 className="pdf-section-title">Información de la entrega</h2>
                            <div className="pdf-grid-2">
                                <p><strong>Fecha de ingreso:</strong> {warranty.fechaIngreso.toLocaleString("es-CR")}</p>
                                <p><strong>Fecha de entrega:</strong> {new Date().toLocaleString()}</p>
                                <p><strong>Producto:</strong> {warranty.producto.caracteristicas.descripcion}</p>
                                <p className="pdf-span-2">
                                    <strong>Estado actual:</strong> {humanizeEstadoGarantia(warranty.estadoActual)}
                                </p>
                            </div>
                        </section>
                        <p style={{ marginBottom: "4px" }}>El cliente declara recibir el equipo descrito anteriormente y los accesorios correspondientes a su entera
                            satisfacción.
                        </p>
                        <section className="pdf-section">
                            <div className="pdf-report">
                                <h2 style={{ paddingInline: "8px" }} className="pdf-section-title">Reporte Técnico de Entrega/Reparación</h2>
                                <div style={{ paddingInline: "8px" }} className="">
                                    <p>{warranty.reporteTecnico?.[0]}</p>
                                </div>
                            </div>
                        </section>
                        <section className="pdf-section">
                            <h2 className="pdf-section-title">EXTENSIÓN DE GARANTÍA</h2>
                            <div className="">
                                <p>El plazo de su garantía ha sido extendido según el Art. 43 de la Ley 7472, que suspende el plazo durante el tiempo que el bien
                                    esté en reparación.</p>
                            </div>
                            <div style={{ marginTop: "4px" }} className="pdf-grid-2 pdf-box">
                                <p>
                                    <strong>Fecha de ingreso:</strong> {warranty.fechaIngreso.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Estado de entrega:</strong> {new Date().toLocaleString("es-CR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                                <p>
                                    <strong>Días suspendidos:</strong> {daysBetween(warranty.fechaIngreso, new Date())}
                                </p>
                                <p>
                                    <strong>Nueva fecha de vencimiento:</strong> {addYears(new Date(), 1).toLocaleString("es-CR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </section>
                    </>
                )
            }



            <div className="pdf-signatures">
                <div className="pdf-sign">
                    <div className="pdf-sign-line">Firma Cliente</div>
                </div>
                <div className="pdf-sign">
                    <div className="pdf-sign-line">Firma Técnico</div>
                </div>
            </div>

            <p className="pdf-footer">
                Gracias por confiar en CR TECH
            </p>
        </div>

    );
}
