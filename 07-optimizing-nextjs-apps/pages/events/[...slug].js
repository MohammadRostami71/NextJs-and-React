import {useRouter} from "next/router";
import {getFilteredEvents} from "../../helper/api-util";
import EventList from "../../components/events/event-list";
import {Fragment, useEffect, useState} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";
import useSWR from 'swr'
import Head from "next/head";

const FilteredEvents = () => {
    const [loadedEvents, setLoadedEvents] = useState([]);
    const router = useRouter();
    const filterData = router.query.slug;
    const {data, error} = useSWR('https://nextjs-cd0d2-default-rtdb.firebaseio.com/events.json');
    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }
            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All Events for`}/>
        </Head>
    );

    if (!loadedEvents) {
        return (
            <Fragment>
                {pageHeadData}
                <p className='center'>Loading ...</p>
            </Fragment>
        )
    }
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All Events for ${numYear}/${numMonth}`}/>
        </Head>
    );
    if (isNaN(numYear) || isNaN(numMonth) || error) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p className='center'>Invalid filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>show all events</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    // const events = props.events;
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p className='center'>no event found!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>show all events</Button>
                </div>
            </Fragment>
        )
    }
    // const date = new Date(props.date.year, props.date.month - 1);
    const date = new Date(numYear, numMonth - 1);
    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>

    );
};

// export async function getServerSideProps(context) {
//     const {params} = context;
//     const filterData = params.slug;
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;
//     if (isNaN(numYear) || isNaN(numMonth)) {
//         return {
//             props: {
//                 hasError: true
//             }
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         };
//     }
//     const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth});
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     };
// }

export default FilteredEvents;