import React, {useEffect, useState} from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {Categories} from '../Category/Category'
import {List} from '../List/List'
import {Description} from '../Description/Description'

import {ILaunchesData, IRocketsData} from '../../interfaces'

import S from './styles.module.css'

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
  }

  const handlerClickItem = (id: null | string): void => {
    setSelectedItemId(id)
  }

  return launchesStore.isLoading || rocketsStore.isLoading ? <h1>...Loading</h1> : (
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
            favorites={favoritesDataStore}
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
              addToFavorite={
                item.dataType === 'Launches'
                  ? launchesStore.addToFavorites
                  : rocketsStore.addToFavorites
              }
              deleteFromFavorites={favoritesStore.deleteFromStore}
              moreDetails={item}
              favorites={favoritesDataStore}
              rocketsDataStore={rocketsDataStore}
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
    </main>
  )
})
