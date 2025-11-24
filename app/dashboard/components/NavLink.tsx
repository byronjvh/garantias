import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    children: React.ReactNode;
    name: string;
    url: string
};

export default function NavLink({ children, name, url }: Props) {
    const pathname = usePathname();
    const normalizedUrl = normalizePath(url)
    const isActive = pathname.startsWith(normalizedUrl);
    return (
        <li className=""><Link href={url} className={`p-2 w-full hover:bg-gray-300 inline-flex items-center gap-2 text-lg rounded ${isActive ? "font-bold" : ""}`}><span>{children}</span>{name}</Link></li>
    )
}

function normalizePath(path: string) {
    return new URL(path, "http://x").pathname;
}