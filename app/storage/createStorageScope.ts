type ScopedStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function createStorageScope<T extends Record<string, any>>(scopeKey: string, pkKey: keyof T) {
    return (s: ScopedStorage) => {
        return {
            get items(): Record<T[keyof T], T> {
                const items = s.getItem(scopeKey);
                if (!items) {
                    return {} as Record<T[keyof T], T>;
                }
                return JSON.parse(items);
            },
            toggle(item: T) {
                const record = this.items;
                const pkValue = item[pkKey];
                if (record[pkValue]) {
                    delete record[pkValue];
                } else {
                    record[pkValue] = item;
                }
                s.setItem(scopeKey, JSON.stringify(record));
            },
            exists(id: T[keyof T]): boolean {
                return !!this.items[id];
            },
        };
    };
}
