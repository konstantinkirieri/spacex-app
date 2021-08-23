import React from 'react'
import {observer} from 'mobx-react'
import {favoritesStore, mainStore, searchStore} from '../../stores'

import {Search} from './Search'

import S from './styles.module.css'

export const List: React.FC = observer(() => {
  const currentData = mainStore.currentData
  return (
    <>
      {mainStore.currentCategory === 'Favorites' && <Search />}
      {currentData ? (
        searchStore.filteredData.map((item: any) => {
          return (
            <div
              key={item.id}
              className={S.item}
              onClick={() => {
                mainStore.changeItemId = item.id
                mainStore.toggleSidebar()
              }}>
              <img
                className={S.img}
                src={
                  item.dataType === 'Launches'
                    ? item.links.patch.small
                    : item.flickr_images[0]
                }
                alt={item.name}
              />
              <div className={S.body}>
                <h3 className={S.title}>{item.name}</h3>
                <div className={S.description}>
                  {item.dataType === 'Launches' ? (
                    item.success ? (
                      <span className={S.success}>Success. </span>
                    ) : (
                      <span className={S.failure}>Failure. </span>
                    )
                  ) : undefined}
                  {item.dataType === 'Launches'
                    ? item.details
                    : item.description}
                </div>
              </div>
              {mainStore.currentCategory !== 'Favorites' &&
                favoritesStore.favoritesDataStore?.some(
                  (f: {id: string}) => f.id === item.id
                ) && <i className={`${S.like} fas fa-heart`} />}
            </div>
          )
        })
      ) : (
        <p>Not found items</p>
      )}
    </>
  )
})
