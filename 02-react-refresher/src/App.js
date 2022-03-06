import {Route,Switch} from "react-router-dom";
import AllMeetupsPages from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <Layout>
            <Switch>
            <Route path='/' exact component={AllMeetupsPages}/>
            <Route component={NewMeetupPage}  path='/new-meetup'/>
            <Route component={FavoritesPage}  path='/favorites'/>
            </Switch>

        </Layout>
    );
}

export default App;
