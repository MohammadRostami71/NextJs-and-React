import {useEffect, useState} from "react";
import useSWR from 'swr'

const LastSales = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);
    const {data, error} = useSWR('https://nextjs-cd0d2-default-rtdb.firebaseio.com/sales.json');
    useEffect(() => {
        if (data) {
            const convertSalesData = [];
            for (const key in data) {
                convertSalesData.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                });
            }
            setSales(convertSalesData);
        }
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-cd0d2-default-rtdb.firebaseio.com/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             const convertSalesData = [];
    //             for (const key in data) {
    //                 convertSalesData.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 });
    //             }
    //             setSales(convertSalesData);
    //             setIsLoading(false);
    //         })
    // }, []);
    if (error) return <div>failed to load</div>
    if (!data && !sales) return <div>loading...</div>
    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>
                {sale.username} - ${sale.volume}
            </li>)}
        </ul>
    );
};

export async function getStaticProps() {
    const response = await fetch('https://nextjs-cd0d2-default-rtdb.firebaseio.com/sales.json');
    const data = await response.json();
    const convertSalesData = [];
    for (const key in data) {
        convertSalesData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        });
    }
    return {
        props: {
            sales: convertSalesData
        }
    }
}

export default LastSales;