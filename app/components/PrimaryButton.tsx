import styles from "./PrimaryButton.module.css"

interface Props {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    loading?: boolean
}

export default function PrimaryButton({ text, onClick, loading }: Props) {
    return (
        <button onClick={onClick} className="bg-accent cursor-pointer px-4 py-2 text-sm font-bold text-white hover:brightness-110 ease-out transition-all duration-200 rounded relative">
            <p className={`inline ${loading ? "opacity-0" : "opacity-100"}`}>{text}</p>
            <div className={`loading-effect flex flex-nowrap absolute left-1/2 top-1/2 -translate-1/2 ${loading ? "inline" : "hidden"}`}>
                Cargando...
            </div>
        </button>
    )
}