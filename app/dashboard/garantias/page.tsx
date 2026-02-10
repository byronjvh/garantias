"use client"
import Link from "next/link";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useDashboard } from "../DashboardContext";
import WarrantyStatus, { ESTADO_GARANTIA_OPTION_STYLE } from "../components/WarrantyStatus";
import { ContactoGarantia, EstadoGarantia, ESTADOS_GARANTIA, ProductoGarantiaBase, ProductoGarantiaPC, TipoProducto } from "@/types/types";
import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getGarantiasAction } from "@/lib/actions/getGarantiasAction";
// import { getRol } from "@/lib/actions/getRol";
import { Rol } from "@/lib/generated/prisma/enums";
import { ColorRing } from "react-loader-spinner";
import { getRol } from "@/app/actions";
import { searchFilter, statusFilter, sucursalFilter } from "@/app/logic/filters";
import { useDebounce } from "@/app/hooks/useDebounce";


export type GarantiaItem = {
    id: number;
    consecutivo?: string
    resumen: string;
    estadoActual: EstadoGarantia;
    fechaIngreso: Date;
    contacto: ContactoGarantia;
    producto: {
        tipo: TipoProducto;
        caracteristicas: ProductoGarantiaBase | ProductoGarantiaPC;
    }
    sucursalActual: {
        nombre: string;
    };
    sucursalIngreso: {
        nombre: string;
    };
};

export default function GarantiasPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const { sucursales } = useDashboard();
    const [items, setItems] = useState<GarantiaItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [statusToFilter, setStatusToFilter] = useState<EstadoGarantia | null>(null);
    const [sucursalToFilter, setSucursalToFilter] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [sucursalActualId, setSucursalActualId] = useState<number | undefined>(
        sucursales[0]?.id
    );

    const debouncedSearch = useDebounce(searchQuery, 400);

    const handleStatusToFilter = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const status = e.target.value as EstadoGarantia;
        if (!status) return setStatusToFilter(null)
        setStatusToFilter(status)
    };
    const handleSucursalToFilter = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const sucursal = e.target.value as string;
        if (!sucursal) return setSucursalToFilter(null)
        setSucursalToFilter(sucursal)
    };

    const filteredItems = sucursalFilter(statusFilter(searchFilter(items, debouncedSearch), statusToFilter), sucursalToFilter)

    const allSelected =
        filteredItems.length > 0 &&
        selectedIds.length === filteredItems.length;

    const partiallySelected =
        selectedIds.length > 0 &&
        selectedIds.length < filteredItems.length;

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        (async () => {
            const { rol } = await getRol();
            const canViewAll = rol === Rol.TECNICO_2 || rol === Rol.TI;

            const { items } = await getGarantiasAction({
                page,
                search: debouncedSearch,
                estado: statusToFilter,
                sucursal: sucursalToFilter,
                canViewAll,
                sucursalActualId,
            }).finally(() => setLoading(false));

            if (!cancelled) {
                setItems(items);
            }

        })();

        setSelectedIds([]);
        return () => {
            cancelled = true;
        };
    }, [debouncedSearch, page, statusToFilter, sucursalToFilter, sucursalActualId]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        if (!query) setSearchQuery("")
        setSearchQuery(query)
    }

    return (
        <>
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-title font-bold text-xl">Garantías de tiendas</h1>
                    <PrimaryButton onClick={() => {

                    }}>
                        Crear Nueva
                    </PrimaryButton>
                </div>
                <div className="grid grid-cols-4 gap-4 center">
                    <div className="flex items-center rounded bg-card-bg border border-gray-400/60 focus-within:ring-2 focus-within:ring-primary/30">
                        <Search size={18} className="ml-2 opacity-60" />
                        <input
                            onChange={handleSearch}
                            className="p-2 w-full focus:outline-none bg-transparent"
                            placeholder="Buscar por producto, cliente o caso"
                            type="text"
                        />
                    </div>
                    <select
                        onChange={handleStatusToFilter}
                        className="px-3 py-2 rounded cursor-pointer bg-card-bg border border-gray-400/60 focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="" className="capitalize bg-card-bg">Todos los Estados</option>
                        {
                            ESTADOS_GARANTIA?.map((estado, i) => (
                                <option value={estado} className={`bg-card-bg ${ESTADO_GARANTIA_OPTION_STYLE[estado]}`} key={i}>
                                    {humanizeEstadoGarantia(estado)}
                                </option>
                            ))
                        }
                    </select>
                    <select
                        onChange={handleSucursalToFilter}
                        className="px-3 py-2 rounded cursor-pointer bg-card-bg border border-gray-400/60 focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="" className="bg-card-bg" >Todas las Tiendas</option>
                        {
                            sucursales?.map((sucursal) => (
                                <option className="bg-card-bg" key={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))
                        }
                    </select>
                    <div>
                        <span>tag</span>
                    </div>
                </div>
            </header>
            <div>
                <div className="bg-card-bg p-4 border-x border-t border-gray-400/60 grid grid-cols-[.5fr_1fr_5fr_3fr_3fr_2fr_2fr] gap-6 text-sm uppercase items-center">
                    <div>
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-primary cursor-pointer"
                            checked={allSelected}
                            ref={el => {
                                if (el) el.indeterminate = partiallySelected;
                            }}
                            onChange={e => {
                                if (e.target.checked) {
                                    setSelectedIds(filteredItems.map(g => g.id));
                                } else {
                                    setSelectedIds([]);
                                }
                            }}
                        />
                    </div>
                    <p className="opacity-70">N° Caso</p>
                    <p className="opacity-70">Descripción</p>
                    <p className="opacity-70">Producto</p>
                    <p className="opacity-70">Estado</p>
                    <p className="opacity-70">Sucursal</p>
                    <p className="opacity-70">Fecha</p>
                </div>
                <ul className="bg-card-bg flex flex-col gap-4 p-2 py-4 rounded-b border border-gray-400/60 divide-y divide-gray-200 h-[500px] overflow-y-scroll">
                    {
                        loading ? (
                            <span className="self-center">
                                <ColorRing
                                    visible={true}
                                    height="60"
                                    width="60"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#F97316', '#FDBA74', '#84CC16', '#4D7C0F', '#365314']}
                                />
                            </span>
                        ) : (
                            filteredItems?.map((garantia) => (
                                <li key={garantia.id}>
                                    <article className="p-2 py-4 grid grid-cols-[.5fr_1fr_5fr_3fr_3fr_2fr_2fr] gap-6 text-sm items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-primary cursor-pointer"
                                                checked={selectedIds.includes(garantia.id)}
                                                onChange={e => {
                                                    setSelectedIds(prev =>
                                                        e.target.checked
                                                            ? [...prev, garantia.id]
                                                            : prev.filter(id => id !== garantia.id)
                                                    );
                                                }}
                                            />
                                        </div>
                                        <p className="">{garantia.consecutivo}</p>
                                        <div className="w-full max-w-[340px] gap-0.5 ">
                                            <Link
                                                href={`/dashboard/garantias/${garantia.id}`}
                                                className="block hover:underline"
                                            >
                                                <p className="font-medium leading-tight">
                                                    {garantia.resumen}
                                                </p>
                                                <p className="text-xs opacity-70">
                                                    {garantia.contacto.nombre}
                                                </p>
                                            </Link>
                                        </div>
                                        <p>{garantia.producto.caracteristicas.descripcion}</p>
                                        <div className="">
                                            <WarrantyStatus estado={garantia.estadoActual} />
                                        </div>
                                        <p>{garantia.sucursalActual.nombre}</p>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium">
                                                {garantia.fechaIngreso.toLocaleDateString("es-CR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {garantia.fechaIngreso.toLocaleTimeString("es-CR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </article>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </>
    );
}
