import { createStorageScope } from './createStorageScope';

describe('createStorageScope', () => {
    const setItemSpy = jest.fn();
    const getItemSpy = jest.fn();
    const scopedStorage = createStorageScope<{ id: number }>(
        'scope',
        'id',
    )({
        setItem: setItemSpy,
        getItem: getItemSpy,
    });

    beforeEach(jest.resetAllMocks);

    it('gets items', () => {
        const expected = { 1: { id: 1 } };
        getItemSpy.mockReturnValueOnce(JSON.stringify(expected));

        expect(scopedStorage.items).toEqual(expected);
        expect(getItemSpy).toHaveBeenCalledWith('scope');
    });

    it('deletes item on toggle', () => {
        getItemSpy.mockReturnValueOnce(JSON.stringify({ 1: { id: 1 } }));

        scopedStorage.toggle({ id: 1 });

        expect(setItemSpy).toHaveBeenCalledWith('scope', JSON.stringify({}));
    });

    it('adds item on toggle', () => {
        getItemSpy.mockReturnValueOnce(JSON.stringify({}));

        scopedStorage.toggle({ id: 1 });

        expect(setItemSpy).toHaveBeenCalledWith('scope', JSON.stringify({ 1: { id: 1 } }));
    });

    it.each([
        [{}, false],
        [{ 1: { id: 1 } }, true],
    ])('checks if item exists', (value, expected) => {
        getItemSpy.mockReturnValueOnce(JSON.stringify(value));

        expect(scopedStorage.exists(1)).toBe(expected);
        expect(getItemSpy).toHaveBeenCalledWith('scope');
    });
});
