import { STATUSES } from "@/app/dashboard/components/WarrantyStatus";
import { Status } from "@/types";


const statusValues = Object.values(STATUSES) as string[];

export function isStatus(s: unknown): s is Status {
    return typeof s === "string" && statusValues.includes(s);
}

export function ensureStatus(s: unknown, fallback: Status = STATUSES.pending): Status {
    return isStatus(s) ? s : fallback;
}
