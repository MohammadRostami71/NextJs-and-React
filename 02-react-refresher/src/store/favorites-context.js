import {createContext, useState} from "react";

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {}
});

export function FavoriteContextProvider(props) {
    const [userFavorite, setUserFavorite] = useState([]);

    function addFavoriteHandler(favoriteMeetup) {
        setUserFavorite((prevUserFavorite) => {
            return prevUserFavorite.concat(favoriteMeetup);
        });
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorite((prevUserFavorite) => {
            return prevUserFavorite.filter(meetup => meetup.id !== meetupId)
        })
    }

    function itemIsFavoriteHandler(meetupId) {
        return userFavorite.some(meetup => meetup.id === meetupId);
    }

    const context = {
        favorites: userFavorite,
        totalFavorites: userFavorite.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };
    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;
