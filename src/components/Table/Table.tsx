import {useState} from 'react'

import Categories from '../Category/Category'
import List from '../List/List'
import Description from '../Description/Description'

import {launchesData} from '../../mocks/launches'
import {rocketsData} from '../../mocks/rockets'

import S from './styles.module.css'

function useLocalStorage(
  key: string,
  obj: any,
): [any, (value: any) => void] {
  const [local, setLocal] = useState(() => {
    const ls = localStorage.getItem(key)
    if (!ls) return obj
    try {
      return JSON.parse(ls)
    } catch {
      return obj
    }
  })
  return [
    local,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
      setLocal(newValue)
    },
  ]
}

export default function Table() {
  const [rockets, setRockets] = useState(rocketsData)
  const [launches, setLaunches] = useState(launchesData)
  const [category, setCategory] = useState('Launches')
  const [itemId, setItemId] = useState(0)
  const [favorites, setFavorites] = useLocalStorage(
    'favorites',
    [],
  ) //local

  const addToFavorite = (
    id: string,
    dataType: string,
  ): void => {
    const currentData =
      dataType === 'Launches' ? launches : rockets
    const setFavoriteDate = Date.now()

    // Copy data and modify item
    const copyData = [...currentData]
    const index = copyData.findIndex(
      (item) => item.id === id,
    )
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

  const deleteFromFavorites = (
    id: string,
    dataType: string,
  ): void => {
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
