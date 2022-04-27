import {getFeaturedEvents} from "../helper/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";

export default function Home(props) {
    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name='description' content='Mohammad rostami'/>
            </Head>
            <EventList items={props.events}/>
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}
