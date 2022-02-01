import type { MediaDisplayProps } from './MediaDisplay';
import { MediaDisplay } from './MediaDisplay';

interface ThumbnailProps {
    src: string;
    alt: string;
    mediaType: MediaDisplayProps['type'];
}

export function Thumbnail(props: ThumbnailProps): JSX.Element {
    return <MediaDisplay initialImageState={'loading'} alt={props.alt} src={props.src} type={props.mediaType} />;
}
