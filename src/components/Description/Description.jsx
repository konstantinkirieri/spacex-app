import DescriptionLaunches from "../DescriptionLaunches/DescriptionLaunches";
import DescriptionRockets from "../DescriptionRockets/DescriptionRockets";
import DescriptionFavorites from "../DescriptionFavorites/DescriptionFavorites";

export default function Description ({itemId, category, launches, rockets, addToFavorite, deleteFromFavorites, favorites}) {

  const switchDescription = () => {
    switch (category) {
      case 'Launches':
        return <DescriptionLaunches
                data={launches}
                rockets={rockets}
                itemId={itemId}
                addToFavorite={addToFavorite}
                deleteFromFavorites={deleteFromFavorites}
               />
      case 'Rockets':
        return <DescriptionRockets
                data={rockets}
                itemId={itemId}
                addToFavorite={addToFavorite}
                deleteFromFavorites={deleteFromFavorites}
               />
      case 'Favorites':
        return <DescriptionFavorites
                  data={favorites}
                  itemId={itemId}
                  addToFavorite={addToFavorite}
                  deleteFromFavorites={deleteFromFavorites}
               />
      default:
        return <></>
    }
  };

  return (
      switchDescription(category)
  )
}

