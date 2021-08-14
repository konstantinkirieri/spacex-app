import React,{useState} from 'react'
import {useLocalStorage} from "../../hooks";

import {Categories} from '../Category/Category'
import List from '../List/List'
import {Description} from '../Description/Description'

import {launchesData} from '../../mocks/launches'
import {rocketsData} from '../../mocks/rockets'

import S from './styles.module.css'

export const Table: React.FC = () => {
  //TODO нормально протипизировать
  const [rockets, setRockets] = useState<any[]>(rocketsData)
  const [launches, setLaunches] = useState<any[]>(launchesData)
  //TODO лучше использовать union литералов как тип: 'Launches' | 'Rockets'
  const [category, setCategory] = useState<string>('Launches')
  //TODO для обозначения не выбранного итема лучше использовать null, а не цифру 0: null | string
  const [itemId, setItemId] = useState<number | string>(0)
  const [favorites, setFavorites] = useLocalStorage(
    'favorites',
    [],
  ) //local

  const addToFavorite = (id: string, dataType: string): void => {

    const currentData = dataType === 'Launches' ? launches : rockets;
    const setFavoriteDate = Date.now();

    // Copy data and modify item
    const copyData = [...currentData];
    const index = copyData.findIndex((item) => item.id === id);

    copyData[index] = {
      ...copyData[index],
      favoriteDate: setFavoriteDate,
      isFavorite: true,
    }

    // Add changed item to favorites state
    setFavorites([...favorites, copyData[index]])

    if (dataType === 'Launches') setLaunches(copyData)
    if (dataType === 'Rockets') setRockets(copyData)
  }

  const deleteFromFavorites = (id: string, dataType: string): void => {
    // Delete from data
    const currentData =
      dataType === 'Launches' ? launches : rockets
    const copyData = [...currentData]
    const index = copyData.findIndex(
      (item) => item.id === id,
    )
    copyData[index] = {
      ...copyData[index],
      favoriteDate: null,
      isFavorite: false,
    }
    if (dataType === 'Launches') setLaunches(copyData)
    if (dataType === 'Rockets') setRockets(copyData)

    // Delete from favorites state
    const copyFavorite = [...favorites]
    const indexFavoriteItem = favorites.findIndex(
      (item: any) => item.id === id,
    )
    copyFavorite.splice(indexFavoriteItem, 1)
    setFavorites(copyFavorite)
  }

  const handlerChangeCategory = (name: string): void => {
    setCategory(name)
    setItemId(0)
  }

  const handlerChangeItem = (id: number): void => {
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
