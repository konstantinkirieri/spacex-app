import React from "react";

import {DescriptionLaunches} from '../DescriptionLaunches/DescriptionLaunches'
import {DescriptionRockets} from '../DescriptionRockets/DescriptionRockets'
import {DescriptionFavorites} from '../DescriptionFavorites/DescriptionFavorites'

interface DescriptionProps {
  itemId: string | number,
  category: string,
  launches: any[],
  rockets: any[],
  addToFavorite: (id: string, dataType: string) => void,
  deleteFromFavorites: (id: string, dataType: string) => void,
  favorites: []
}

export const Description: React.FC<DescriptionProps> = ({
  itemId,
  category,
  launches,
  rockets,
  addToFavorite,
  deleteFromFavorites,
  favorites,
}) => {

  const switchDescription = (category: string) => {
    switch (category) {
      case 'Launches':
        return (
          <DescriptionLaunches
            data={launches}
            rockets={rockets}
            favorites={favorites}
            itemId={itemId}
            addToFavorite={addToFavorite}
            deleteFromFavorites={deleteFromFavorites}
          />
        )
      case 'Rockets':
        return (
          <DescriptionRockets
            data={rockets}
            favorites={favorites}
            itemId={itemId}
            addToFavorite={addToFavorite}
            deleteFromFavorites={deleteFromFavorites}
          />
        )
      case 'Favorites':
        return (
          <DescriptionFavorites
            data={favorites}
            itemId={itemId}
            addToFavorite={addToFavorite}
            deleteFromFavorites={deleteFromFavorites}
          />
        )
      default:
        return <></>
    }
  }

  return switchDescription(category)
}
