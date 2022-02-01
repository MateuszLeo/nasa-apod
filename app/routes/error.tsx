import { useNavigate } from 'remix';

import { Error } from '../components';

export default function Err(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div>
            <Error title={"Couldn't fetch a data."} onRetry={() => navigate('/', { replace: true })} />
        </div>
    );
}
