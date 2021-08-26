import React from 'react'
import {observer} from 'mobx-react'
import {ILaunchesData, IRocketsData} from '../../interfaces'
import {
  favoritesStore,
  mainStore,
  searchStore
} from '../../stores'

import {Search} from './Search'

import S from './styles.module.css'

export const List: React.FC = observer(() => {
  const currentData = mainStore.currentData

  const successFailure = (success: boolean | null) => {
    if (success === null) return 'Status: No data'

    if (success) {
      return (
        <>
          Status:
          <span className={S.success}> Success</span>
        </>
      )
    } else {
      return (
        <>
          Status:
          <span className={S.failure}> Failure</span>
        </>
      )
    }
  }

  const unixTimeToNormal = (unix_time: number) => {
    const milliseconds = unix_time * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    return dateObject.toLocaleString('ru-RU')
  }

  return (
    <>
      {mainStore.currentCategory === 'Favorites' && (
        <Search />
      )}
      {currentData ? (
        searchStore.filteredData.map((item: ILaunchesData | IRocketsData) => {
          return (
            <div
              key={item.id}
              className={S.item}
              onClick={() => {
                mainStore.changeItemId = item.id
                mainStore.toggleSidebar(false)
              }}>
              <img
                className={S.img}
                src={
                  item.dataType === 'Launches'
                    ? item.links.patch.small
                      ? item.links.patch.small
                      : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
                    : item.flickr_images[0]
                }
                alt={item.name}
              />
              <div className={S.body}>
                <h3 className={S.title}>{item.name}</h3>
                <div className={S.description}>
                  <div>
                    {item.dataType === 'Launches' &&
                    item.hasOwnProperty('success')
                      ? successFailure(item.success)
                      : 'Status: No data'}
                  </div>
                  {item.dataType === 'Launches'
                    ? `Launch: ${unixTimeToNormal(
                        item.date_unix
                      )}`
                    : item.description}
                </div>
              </div>
              {mainStore.currentCategory !== 'Favorites' &&
                favoritesStore.favoritesDataStore?.some(
                  (f: {id: string}) => f.id === item.id
                ) && (
                  <i className={`${S.like} fas fa-heart`} />
                )}
            </div>
          )
        })
      ) : (
        <p>Not found items</p>
      )}
    </>
  )
})
