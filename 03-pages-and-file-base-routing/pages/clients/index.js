import Link from "next/link";

const Clients = () => {
    const clients = [
        {id: 'mohammad', name: 'Mohammad'},
        {id: 'rostami', name: 'Rostami'},
    ];
    return (
        <div>
            <h1>Clients Page</h1>
            <ul>
                {clients.map((client) => (<li key={client.id}>
                    <Link href={{
                        pathname: '/clients/[id]',
                        query: {id: client.id}
                    }}>{client.name}</Link>
                </li>))}
            </ul>
        </div>
    );
};

export default Clients;