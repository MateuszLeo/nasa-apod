import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { LoadableImage } from './LoadableImage';

describe('<LoadableImage/>', () => {
    const image = new Image();
    const imageSpy = jest.spyOn(global, 'Image');
    imageSpy.mockReturnValue(image);

    beforeEach(jest.clearAllMocks);

    afterEach(cleanup);

    it('renders an spinner', async () => {
        render(<LoadableImage initialImageState={'loading'} src={''} alt={'alt'} />);

        expect(screen.getByTestId('spinner')).toBeDefined();
        expect(() => screen.getByAltText('alt')).toThrow();
        expect(() => screen.getByText("Couldn't load a image.")).toThrow();
    });

    it('renders an img', async () => {
        render(<LoadableImage initialImageState={'loading'} src={''} alt={'alt'} />);

        fireEvent.load(image);

        expect(screen.getByAltText('alt')).toBeDefined();
        expect(() => screen.getByTestId('spinner')).toThrow();
        expect(() => screen.getByText("Couldn't load a image.")).toThrow();
    });

    it('renders an error', async () => {
        render(<LoadableImage initialImageState={'loading'} src={''} alt={'alt'} />);

        fireEvent.error(image);

        expect(screen.getByText("Couldn't load a image.")).toBeDefined();
        expect(() => screen.getByAltText('alt')).toThrow();
        expect(() => screen.getByTestId('spinner')).toThrow();
    });
});
