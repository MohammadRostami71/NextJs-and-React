import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";

const FilteredEvents = () => {
    const router = useRouter();
    const filterData = router.query.slug;
    if (!filterData) {
        return <p className='center'>Loading ...</p>
    }
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if (isNaN(numYear) || isNaN(numMonth)) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className='center'>Invalid filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>show all events</Button>
                </div>
            </Fragment>
        )
    }
    const events = getFilteredEvents({year: numYear, month: numMonth});
    if (!events || events.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className='center'>no event found!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>show all events</Button>
                </div>
            </Fragment>
        )
    }
    const date = new Date(numYear, numMonth - 1);
    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={events}/>
        </Fragment>

    );
};

export default FilteredEvents;