import {useState} from 'react'

import {Categories} from '../Category/Category'
import List from '../List/List'
import {Description} from '../Description/Description'

import {launchesData} from '../../mocks/launches'
import {rocketsData} from '../../mocks/rockets'

import S from './styles.module.css'

export default function Table() {
  const [rockets, setRockets] = useState(rocketsData);
  const [launches, setLaunches] = useState(launchesData);
  const [category, setCategory] = useState('Launches');
  const [itemId, setItemId] = useState(0);

  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (id) => {
    const currentData = category === 'Launches' ? launches : rockets;
    const setFavoriteDate = Date.now();

    let copyData = [...currentData];
    copyData[id] = {
      ...copyData[id],
      favoriteDate: setFavoriteDate,
      isFavorite: true,
    };

    if(category === 'Launches') setLaunches(copyData);
    if(category === 'Rockets') setRockets(copyData);

    setFavorites(prev => {
      return [
        ...prev,
        copyData[id]
      ]
    });
  };

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
      />
    </main>
  )
}
