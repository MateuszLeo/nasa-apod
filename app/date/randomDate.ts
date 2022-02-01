export function getRandomDate(): Date {
    const [start, end] = [new Date(2000, 0, 1), new Date()];
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function dateToString(date: Date): string {
    return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join('-');
}
