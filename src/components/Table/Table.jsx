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
  const [category, setCategory] = useState('Launches')
  const [itemId, setItemId] = useState(0)

  const addToFavorite = (id) => {
    const currentData = category === 'Launches' ? launches : rockets;
    let copyData = [...currentData];
    copyData[id] = {
      ...copyData[id],
      isFavorite: true,
    };
    category === 'Launches' ? setLaunches(copyData) : setRockets(copyData);
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
      />
      <Description
        category={category}
        itemId={itemId}
        rockets={rockets}
        launches={launches}
        addToFavorite={addToFavorite}
      />
    </main>
  )
}
