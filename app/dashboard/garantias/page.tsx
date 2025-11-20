import { Pencil, Trash2 } from "lucide-react";

export default function Garantias() {
    return (
        <>
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-title font-bold text-lg">Lista de garantías</h1>
                    <a href="" className="bg-accent px-3 py-2 text-sm font-bold text-white hover:brightness-110 ease-out transition-all duration-200 rounded">
                        Crear Nueva
                    </a>
                </div>
                <div className="flex justify-between bg-card-bg p-2 rounded text-sm border border-gray-300">
                    <select id="filter-select">
                        <option value="">Filtrar por... </option>
                    </select>
                </div>
            </header>
            <ul className="bg-card-bg flex flex-col gap-4 p-2 py-4 rounded border border-gray-300">
                <li>
                    <article className="p-2 grid grid-cols-[minmax(100px,340px)_1fr_1fr_1fr] gap-2 text-sm">
                        <div className="flex flex-col justify-center w-full max-w-[340px] gap-0.5 ">
                            <h4 className="font-bold text-accent-2">Juan Pablo</h4>
                            <p className="text-xs ">Descripción corta de la garantía para identificarla mejor</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <select className="" id="state-select">
                                <option value="">Pendiente </option>
                                <option value="">Resuelta </option>
                                <option value="">En espera </option>
                            </select>
                        </div>
                        <p className="flex items-center justify-center">19/11/2025</p>
                        <div className="flex items-center justify-end gap-2">
                            <button><Pencil size={20} /></button>
                            <button><Trash2 size={20} /></button>
                        </div>
                    </article>
                </li>
                <li>
                    <article className="p-2 grid grid-cols-[minmax(100px,340px)_1fr_1fr_1fr] gap-2 text-sm">
                        <div className="flex flex-col justify-center w-full max-w-[340px] gap-0.5 ">
                            <h4 className="font-bold text-accent-2">Juan Pablo</h4>
                            <p className="text-xs ">Descripción corta de la garantía para identificarla mejor</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <select className="" id="state-select">
                                <option value="">Pendiente </option>
                                <option value="">Resuelta </option>
                                <option value="">En espera </option>
                            </select>
                        </div>
                        <p className="flex items-center justify-center">19/11/2025</p>
                        <div className="flex items-center justify-end gap-2">
                            <button><Pencil size={20} /></button>
                            <button><Trash2 size={20} /></button>
                        </div>
                    </article>
                </li>
                <li>
                    <article className="p-2 grid grid-cols-[minmax(100px,340px)_1fr_1fr_1fr] gap-2 text-sm">
                        <div className="flex flex-col justify-center w-full max-w-[340px] gap-0.5 ">
                            <h4 className="font-bold text-accent-2">Juan Pablo</h4>
                            <p className="text-xs ">Descripción corta de la garantía para identificarla mejor</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <select className="" id="state-select">
                                <option value="">Pendiente </option>
                                <option value="">Resuelta </option>
                                <option value="">En espera </option>
                            </select>
                        </div>
                        <p className="flex items-center justify-center">19/11/2025</p>
                        <div className="flex items-center justify-end gap-2">
                            <button><Pencil size={20} /></button>
                            <button><Trash2 size={20} /></button>
                        </div>
                    </article>
                </li>
            </ul>
        </>
    )
}