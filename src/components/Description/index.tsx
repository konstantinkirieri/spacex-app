import React from 'react'
import {favoritesStore, mainStore} from '../../stores'

import {DescriptionLaunches} from './Launches'
import {DescriptionRockets} from './Rockets'

import S from './styles.module.css'
import {observer} from 'mobx-react'

export const Description: React.FC = observer(() => {
  const currentItem = mainStore.currentItem

  return currentItem ? (
    <div key={currentItem.id} className={S.description}>
      <img
        className={S.description__image}
        src={
          'links' in currentItem
            ? currentItem.links.patch.small
              ? currentItem.links.patch.small
              : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
            : currentItem.flickr_images[0]
        }
        alt={currentItem.name}
      />

      <div className={S.description__text}>
        <h2 className={S.description__title}>
          {currentItem.name}
        </h2>
        <div className={S.description__about}>
          {'details' in currentItem
            ? currentItem.details
            : currentItem.description}
        </div>
      </div>

      {currentItem.dataType === 'Launches' ? (
        <DescriptionLaunches launchesItem={currentItem} />
      ) : (
        <DescriptionRockets rocketsItem={currentItem} />
      )}

      <button
        className={S.likeButton}
        onClick={() =>
          favoritesStore.favoritesDataStore?.some(
            (f: {id: string}) => f.id === currentItem.id
          )
            ? (favoritesStore.deleteFromFavorites =
                currentItem.id)
            : (favoritesStore.addToFavorites = currentItem)
        }>
        <i
          className={
            favoritesStore.favoritesDataStore?.some(
              (f: {id: string}) => f.id === currentItem.id
            )
              ? `${S.likeButtonHovered} fas fa-heart`
              : 'far fa-heart'
          }
        />
      </button>
    </div>
  ) : (
    <div className={S.description}>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '100px'
        }}>
        No items
      </h1>
    </div>
  )
})
