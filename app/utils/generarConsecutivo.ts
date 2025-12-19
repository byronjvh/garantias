function generateConsecutivo(prefijo: string) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 5).toUpperCase();

    return `${prefijo}-${yy}${mm}-${rand}`;
}