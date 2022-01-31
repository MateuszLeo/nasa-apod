import { LoadableImage } from './Image';

interface ThumbnailProps {
    src: string;
}

export function Thumbnail(props: ThumbnailProps): JSX.Element {
    return <LoadableImage size={'S'} src={props.src} />;
}
