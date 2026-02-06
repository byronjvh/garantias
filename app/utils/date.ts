export function daysBetween(dateA: Date, dateB: Date): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utcA = Date.UTC(
        dateA.getFullYear(),
        dateA.getMonth(),
        dateA.getDate()
    );

    const utcB = Date.UTC(
        dateB.getFullYear(),
        dateB.getMonth(),
        dateB.getDate()
    );

    return Math.floor((utcB - utcA) / MS_PER_DAY);
}

export function addYears(date: Date, years: number): Date {
    const result = new Date(date);
    const originalMonth = result.getMonth();

    result.setFullYear(result.getFullYear() + years);

    // Corrige fechas inválidas (ej: 29/02)
    if (result.getMonth() !== originalMonth) {
        result.setDate(0); // último día del mes anterior
    }

    return result;
}
