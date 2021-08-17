import React, {useState} from 'react'
import {useLocalStorage} from '../../hooks'

import {Categories} from '../Category/Category'
import {List} from '../List/List'
import {Description} from '../Description/Description'

import {launchesData} from '../../mocks/launches'
import {rocketsData} from '../../mocks/rockets'

import S from './styles.module.css'
import {ILaunchesData, IRocketsData} from '../../interfaces'

export const Table: React.FC = () => {
  //TODO нормально протипизировать
  const [rockets, setRockets] = useState<any[]>(rocketsData)
  const [launches, setLaunches] = useState<any[]>(launchesData)
  const [selectedCategory, setSelectedCategory] = useState<string>('Launches')
  const [selectedItemId, setSelectedItemId] = useState<null | string>(null)
  const [favorites, setFavorites] = useLocalStorage(
    'favorites',
    [],
  )

  const getItemsByCategory: (() => Array <ILaunchesData | IRocketsData> | null) = () => {
    switch (selectedCategory) {
      case 'Launches':
        return launches
      case 'Rockets':
        return rockets
      case 'Favorites':
        return favorites.length !== 0 ? favorites : null
      default:
        return null
    }
  };


  const getCurrentData: (() => Array<ILaunchesData | IRocketsData> | null) = () => {
    switch (selectedCategory) {
      case 'Launches':
        return selectedItemId
          ? launches.filter(
              (item: {id: string}) =>
                item.id === selectedItemId,
            )
          : [launches[0]]
      case 'Rockets':
        return selectedItemId
          ? rockets.filter(
              (item: {id: string}) =>
                item.id === selectedItemId,
            )
          : [rockets[0]]
      case 'Favorites':
        return selectedItemId
          ? favorites.filter(
              (item: {id: string}) =>
                item.id === selectedItemId,
            )
          : favorites.length !== 0
          ? [favorites[0]]
          : null
      default:
        return null
    }
  }

  const addToFavorite = (
    id: string | null,
    dataType: 'Rockets' | 'Launches',
  ): void => {
    const currentData: ILaunchesData[] | IRocketsData[] =
      dataType === 'Launches' ? launches : rockets
    const setFavoriteDate = Date.now()

    // Copy data and modify item
    const copyData = [...currentData]
    const index = copyData.findIndex(
      (item: {id: string}) => item.id === id,
    )

    copyData[index] = {
      ...copyData[index],
      favoriteDate: setFavoriteDate
    }

    // Add changed item to favorites state
    setFavorites([...favorites, copyData[index]])

    if (selectedCategory === 'Launches')
      setLaunches(copyData)
    if (selectedCategory === 'Rockets') setRockets(copyData)
  }

  const deleteFromFavorites = (
    id: string | null,
    dataType: 'Rockets' | 'Launches',
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
      favoriteDate: null
    }
    if (selectedCategory === 'Launches')
      setLaunches(copyData)
    if (selectedCategory === 'Rockets') setRockets(copyData)

    // Delete from favorites state
    const copyFavorite: Array<ILaunchesData | IRocketsData> = [
      ...favorites,
    ]
    const indexFavoriteItem = favorites.findIndex(
      (item: {id: string}) => item.id === id,
    )
    copyFavorite.splice(indexFavoriteItem, 1)
    setFavorites(copyFavorite)
  }

  const handlerChangeCategory = (name: string): void => {
    setSelectedCategory(name)
    setSelectedItemId(null)
  }

  const handlerClickItem = (id: null | string): void => {
    setSelectedItemId(id)
  }

  return (
    <main className={S.main}>
      <Categories
        onChangeCategory={handlerChangeCategory}
      />

      <div className={S.list}>
        <div className={S.items}>
          <List
            data={getItemsByCategory()}
            selectedCategory={selectedCategory}
            onClickItem={handlerClickItem}
            favorites={favorites}
          />
        </div>
      </div>

      {getCurrentData() ? (
        getCurrentData()?.map((item) => {
          return (
            <Description
              key={item.id}
              id={item.id}
              name={item.name}
              description={
                item.dataType === 'Launches'
                  ? item.details
                  : item.description
              }
              thumbnail={
                item.dataType === 'Launches'
                  ? item.links.patch.small
                  : item.flickr_images
              }
              dataType={item.dataType}
              addToFavorite={addToFavorite}
              deleteFromFavorites={deleteFromFavorites}
              moreDetails={item}
              favorites={favorites}
            />
          )
        })
      ) : (
        <div style={{width: '100%'}}>
          <h1
            style={{
              textAlign: 'center',
              marginTop: '100px',
            }}>
            No items
          </h1>
        </div>
      )}
    </main>
  )
}
