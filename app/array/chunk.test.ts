import { chunk } from './chunk';

describe('chunk', () => {
    it.each([
        [[], []],
        [[1], [[1]]],
        [[1, 2], [[1, 2]]],
        [
            [1, 2, 3],
            [[1, 2], [3]],
        ],
    ])('chunks an array', (input, expected) => {
        expect(chunk(input, 2)).toEqual(expected);
    });
});
