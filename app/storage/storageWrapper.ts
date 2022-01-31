export function storageWrapper<T>(key: string, pk: keyof T) {
    return (s: Storage) => {
        return {
            get items(): Record<string, any> {
                const items = s.getItem(key);
                if (!items) {
                    return {};
                }
                return JSON.parse(items);
            },
            toggle(item: T) {
                const record = this.items;
                const pkValue = item[pk];
                if (record[pkValue]) {
                    delete record[pkValue];
                } else {
                    record[pkValue] = item;
                }
                s.setItem(key, JSON.stringify(record));
            },
            exists(id: string): boolean {
                return !!this.items[id];
            },
        };
    };
}
