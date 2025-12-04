interface Props {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function PrimaryButton({ text, onClick }: Props) {
    return (
        <button onClick={onClick} className="bg-accent cursor-pointer px-3 py-2 text-sm font-bold text-white hover:brightness-110 ease-out transition-all duration-200 rounded">{text}</button>
    )
}