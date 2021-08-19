import React, {useEffect, useState} from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {Categories} from '../Category/Category'
import {List} from '../List/List'
import {Description} from '../Description/Description'

import {ILaunchesData, IRocketsData} from '../../interfaces'

import { CircularProgress, ListItem } from '@material-ui/core';
import S from './styles.module.css'

function getWidth(): number {
  return window.innerWidth;
}

export const Table: React.FC<any> = observer(({launchesStore, rocketsStore, favoritesStore}) => {

  useEffect(() => {
    launchesStore.loadLaunches()
    rocketsStore.loadRockets()
  }, []);

  const launchesDataStore = toJS(launchesStore.launchesDataStore);
  const rocketsDataStore = toJS(rocketsStore.rocketsDataStore);
  const favoritesDataStore = toJS(favoritesStore.favoritesDataStore).sort((a: any, b: any) => b.favoriteDate - a.favoriteDate);

  const [selectedCategory, setSelectedCategory] =
    useState<string>('Launches')
  const [selectedItemId, setSelectedItemId] = useState<
    null | string
  >(null)
  const [listStyle, setListStyle] = useState({})
  const [visibleDescription, setVisibleDescription] = useState(false)

  const getItemsByCategory: () => Array<
    ILaunchesData | IRocketsData
  > | null = () => {
    switch (selectedCategory) {
      case 'Launches':
        return launchesDataStore;
      case 'Rockets':
        return rocketsDataStore
      case 'Favorites':
        return favoritesDataStore
      default:
        return null
    }
  }



  const getCurrentData: () => Array<ILaunchesData | IRocketsData> | null = () => {
    switch (selectedCategory) {
      case 'Launches':
        return selectedItemId
          ? launchesDataStore.filter(
              (item: {id: string}) =>
                item.id === selectedItemId
            )
          : [launchesDataStore[0]]
      case 'Rockets':
        return selectedItemId
          ? rocketsDataStore.filter(
              (item: {id: string}) =>
                item.id === selectedItemId
            )
          : [rocketsDataStore[0]]
      case 'Favorites':
        return selectedItemId
          ? favoritesDataStore.filter(
              (item: {id: string}) =>
                item.id === selectedItemId
            )
          : favoritesDataStore.length !== 0
          ? [favoritesDataStore[0]]
          : null
      default:
        return null
    }
  }

  const handlerChangeCategory = (name: string): void => {
    setSelectedCategory(name)
    setSelectedItemId(null)
    handleGoBack()
  }

  const handlerClickItem = (id: null | string): void => {
    setSelectedItemId(id)
    if(getWidth() < 750) {
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

  return <main className={S.main}>
      <Categories
        onChangeCategory={handlerChangeCategory}
      />
      <div className={S.list} onScroll={scrollDiv} style={listStyle}>
        {
      // launchesStore.isLoading || rocketsStore.isLoading ?
        launchesStore.launchesDataStore.length === 0 ?

        <CircularProgress/> :

        <List
          data={getItemsByCategory()}
          selectedCategory={selectedCategory}
          onClickItem={handlerClickItem}
          favorites={favoritesDataStore}
        />}
        {launchesStore.isLoading && <CircularProgress/>}
      </div>
      {(getWidth() > 750 || visibleDescription)&& <div className={S.description}>
      {getCurrentData() ? (
        getCurrentData()?.map((item) => {
          return (
            launchesStore.launchesDataStore.length === 0 || rocketsStore.rocketsDataStore.length === 0  ?
            
            <CircularProgress/> :

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
              addToFavorite={
                item.dataType === 'Launches'
                  ? launchesStore.addToFavorites
                  : rocketsStore.addToFavorites
              }
              deleteFromFavorites={favoritesStore.deleteFromStore}
              moreDetails={item}
              favorites={favoritesDataStore}
              rocketsDataStore={rocketsDataStore}
              onGoBack={handleGoBack}
            />
          )
        })
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
      </div>}
    </main>
})
