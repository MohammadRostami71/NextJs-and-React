import {getAllEvents} from "../../helper/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";

const AllEvents = (props) => {
    const {events} = props;
    const router = useRouter();
    const findEventHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };
    return (
        <div>
            <EventsSearch onSearch={findEventHandler}/>
            <EventList items={events}/>
        </div>
    );
};

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: {
            events: events
        },
        revalidate: 10
    };
}

export default AllEvents;