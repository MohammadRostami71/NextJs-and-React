import {useRouter} from "next/router";

const ClientsDetail = () => {
    const router = useRouter();
    const loadHandler = () => {
        router.push('/clients/mohammad/ddd');
    };
    return (
        <div>
            <h1>Clients Detail Page!</h1>
            <button onClick={loadHandler}>Load Project</button>
        </div>
    );
};

export default ClientsDetail;