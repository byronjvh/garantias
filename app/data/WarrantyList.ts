import raw from "../../GuaranteesExamples.json";
import { ensureStatus } from "../utils/guards";
import { Warranty } from "@/types";

export const warrantyList: Warranty[] = (raw as any[]).map(item => ({
    ...item,
    status: ensureStatus(item.status),
}));