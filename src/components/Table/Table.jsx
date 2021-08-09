import {useState} from 'react'

import Categories from '../Category/Category'
import List from '../List/List'
import Description from '../Description/Description'

import {launchesData} from '../../mocks/launches'
import {rocketsData} from '../../mocks/rockets'

import S from './styles.module.css'

export default function Table() {
  const [rockets, setRockets] = useState(rocketsData);
  const [launches, setLaunches] = useState(launchesData);
  const [category, setCategory] = useState('Launches');
  const [itemId, setItemId] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (id, dataType) => {
      const currentData = dataType === 'Launches' ? launches : rockets;
      const setFavoriteDate = Date.now();

      // Copy data and modify item
      const copyData = [...currentData];
      const index = copyData.findIndex(item => item.id === id);
      copyData[index] = {
          ...copyData[index],
          favoriteDate: setFavoriteDate,
          isFavorite: true,
      };
      // Add changed item to favorites state
      setFavorites(prev => {
          return [
            ...prev,
            copyData[index]
          ]
      });

      if(dataType === 'Launches') setLaunches(copyData);
      if(dataType === 'Rockets') setRockets(copyData);
  };

  const deleteFromFavorites = (id, dataType) => {
      // Delete from data
      const currentData = dataType === 'Launches' ? launches : rockets;
      const copyData = [...currentData];
      const index = copyData.findIndex(item => item.id === id);
      copyData[index] = {
          ...copyData[index],
          favoriteDate: null,
          isFavorite: false,
      };
      if(dataType === 'Launches') setLaunches(copyData);
      if(dataType === 'Rockets') setRockets(copyData);

      // Delete from favorites state
      const copyFavorite = [...favorites];
      const indexFavoriteItem = favorites.findIndex(item => item.id === id);
      copyFavorite.splice(indexFavoriteItem, 1);
      setFavorites(copyFavorite);
  }

  const handlerChangeCategory = (name) => {
    setCategory(name)
    setItemId(0)
  }

  const handlerChangeItem = (id) => {
    setItemId(id)
  }

  return (
    <main className={S.main}>
      <Categories
        onChangeCategory={handlerChangeCategory}
      />
      <List
        category={category}
        onChangeItem={handlerChangeItem}
        rockets={rockets}
        launches={launches}
        favorites={favorites}
      />
      <Description
        category={category}
        itemId={itemId}
        rockets={rockets}
        launches={launches}
        favorites={favorites}
        addToFavorite={addToFavorite}
        deleteFromFavorites={deleteFromFavorites}
      />
    </main>
  )
}
