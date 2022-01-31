export function chunk<T>(xs: T[], size: number): T[][] {
    const chunks = [];
    let start = 0;
    let end = size;
    let next = [];
    while ((next = xs.slice(start, end)).length) {
        chunks.push(next);
        start = end;
        end += size;
    }
    return chunks;
}
