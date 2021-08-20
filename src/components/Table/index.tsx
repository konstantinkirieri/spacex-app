import React, {useState} from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {favoritesStore, launchesStore, rocketsStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

import {ILaunchesData, IRocketsData} from '../../interfaces'

import {CircularProgress} from '@material-ui/core'
import S from './styles.module.css'

const getWidth = (): number => {
  return window.innerWidth
}

export const Table: React.FC<any> = observer(() => {
  const launchesDataStore = toJS(launchesStore.launchesDataStore)
  const rocketsDataStore = toJS(rocketsStore.rocketsDataStore)
  const favoritesDataStore = toJS(favoritesStore.favoritesDataStore).sort(
    (a: any, b: any) => b.favoriteDate - a.favoriteDate
  )

  const [selectedCategory, setSelectedCategory] = useState<string>('Launches')
  const [selectedItemId, setSelectedItemId] = useState<null | string>(null)
  const [listStyle, setListStyle] = useState({})
  const [visibleDescription, setVisibleDescription] = useState(false)
  const [currentData, setCurrentData]: [any, any] = useState(null)

  const getItemsByCategory: () => Array<ILaunchesData | IRocketsData> | null =
    () => {
      switch (selectedCategory) {
        case 'Launches':
          return launchesDataStore
        case 'Rockets':
          return rocketsDataStore
        case 'Favorites':
          return favoritesDataStore
        default:
          return null
      }
    }

  const getCurrentData: () => void  = () => {
    if (selectedCategory === 'Launches') {
       selectedItemId
        ? setCurrentData(launchesDataStore.find(
            (item: {id: string}) => item.id === selectedItemId
          ))
        : setCurrentData(launchesDataStore[0])

    } else if (selectedCategory === 'Rockets') {
      return selectedItemId
        ? setCurrentData(rocketsDataStore.find(
            (item: {id: string}) => item.id === selectedItemId
          ))
        : setCurrentData(rocketsDataStore[0])

    } else if (selectedCategory === 'Favorites') {
      return selectedItemId
        ? setCurrentData(favoritesDataStore.find(
            (item: {id: string}) => item.id === selectedItemId
          ))
        : favoritesDataStore.length !== 0
        ? setCurrentData(favoritesDataStore[0])
        : null
    }
  }

  const handlerChangeCategory = (name: string): void => {
    setSelectedCategory(name)
    setSelectedItemId(null)
    handleGoBack()
  }

  const handlerClickItem = (id: null | string): void => {
    setSelectedItemId(id)
    getCurrentData()
    if (getWidth() < 750) {
      setListStyle({display: 'none'})
    }
    setVisibleDescription(true)
  }

  const handleGoBack = (): void => {
    setListStyle({display: 'flex'})
    setVisibleDescription(false)
  }

  function scrollDiv(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
      launchesStore.loadLaunches()
    }
  }

  return (
    <main className={S.main}>
      <Categories onChangeCategory={handlerChangeCategory} />
      <div className={S.list} onScroll={scrollDiv} style={listStyle}>
        {launchesStore.launchesDataStore.length === 0 ||
        rocketsStore.rocketsDataStore.length === 0 ? (
          <CircularProgress />
        ) : (
          <List
            data={getItemsByCategory()}
            selectedCategory={selectedCategory}
            onClickItem={handlerClickItem}
          />
        )}
      </div>
      {(getWidth() > 750 || visibleDescription) && (
        <div className={S.description}>
          {currentData ? (
              launchesStore.launchesDataStore.length === 0 ||
                rocketsStore.rocketsDataStore.length === 0 ? (
                <CircularProgress key={0} />
              ) : (
                <Description
                  key={currentData.id}
                  id={currentData.id}
                  currentData={currentData}
                  name={currentData.name}
                  description={
                    'details' in currentData ? currentData.details : currentData.description
                  }
                  thumbnail={
                    'links' in currentData
                      ? currentData.links.patch.small
                      : currentData.flickr_images[0]
                  }
                  addToFavorite={
                    currentData.dataType === 'Launches'
                      ? launchesStore.addToFavorites
                      : rocketsStore.addToFavorites
                  }
                  deleteFromFavorites={favoritesStore.deleteFromStore}
                  onGoBack={handleGoBack}
                />
              )
          ) : (
            <div style={{width: '100%'}}>
              <h1
                style={{
                  textAlign: 'center',
                  marginTop: '100px'
                }}>
                No items
              </h1>
            </div>
          )}
        </div>
      )}
    </main>
  )
})
