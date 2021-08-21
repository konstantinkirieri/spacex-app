import React, {useState} from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {favoritesStore, launchesStore, mainStore, rocketsStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

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
  const selectedCategory = mainStore.selectedCategory;
  const selectedItemId = mainStore.selectedItemId;

  const [listStyle, setListStyle] = useState({})
  const [visibleDescription, setVisibleDescription] = useState(false)

  const getCurrentData: any = () => {
    if (selectedCategory === 'Launches')
       return selectedItemId
        ? launchesDataStore.filter(
            (item: {id: string}) => item.id === selectedItemId
          )
        : [launchesDataStore[0]]

    if (selectedCategory === 'Rockets')
      return selectedItemId
        ? rocketsDataStore.filter(
            (item: {id: string}) => item.id === selectedItemId
          )
        : [rocketsDataStore[0]]

    if (selectedCategory === 'Favorites')
      return selectedItemId
        ? favoritesDataStore.filter(
            (item: {id: string}) => item.id === selectedItemId
          )
        : favoritesDataStore.length !== 0
        ? [favoritesDataStore[0]]
        : null
    return null
  }

  // const handlerChangeCategory = (name: string): void => {
  //   setSelectedItemId(null)
  //   handleGoBack()
  // }

  // const handlerClickItem = (id: null | string): void => {
  //   setSelectedItemId(id)
  //   getCurrentData()
  //   if (getWidth() < 750) {
  //     setListStyle({display: 'none'})
  //   }
  //   setVisibleDescription(true)
  // }

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
      <Categories />
      <div className={S.list} onScroll={scrollDiv} style={listStyle}>
        {launchesStore.launchesDataStore.length === 0 ||
        rocketsStore.rocketsDataStore.length === 0 ? (
          <CircularProgress />
        ) : (
          <List />
        )}
      </div>
      {(getWidth() > 750 || visibleDescription) && (
        <div className={S.description}>
          {getCurrentData() ? (
              launchesStore.launchesDataStore.length === 0 ||
                rocketsStore.rocketsDataStore.length === 0 ? (
                <CircularProgress key={0} />
              ) : (
                getCurrentData().map((item: any) => {
                  return(
                  <Description
                    key={item.id}
                    id={item.id}
                    currentData={item}
                    name={item.name}
                    description={
                      'details' in item ? item.details : item.description
                    }
                    thumbnail={
                      'links' in item
                        ? item.links.patch.small
                        : item.flickr_images[0]
                    }
                    addToFavorite={
                      item.dataType === 'Launches'
                        ? launchesStore.addToFavorites
                        : rocketsStore.addToFavorites
                    }
                    deleteFromFavorites={favoritesStore.deleteFromStore}
                    onGoBack={handleGoBack}
                  />)
                })
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
