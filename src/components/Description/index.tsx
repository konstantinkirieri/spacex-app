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
            : currentItem.flickr_images[0]
        }
        alt={currentItem.name}
      />

      <div className={S.description__text}>
        <h2 className={S.description__title}>{currentItem.name}</h2>
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
            ? favoritesStore.deleteFromStore(currentItem.id)
            : favoritesStore.addToStore(currentItem)
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
    <div style={{width: '100%'}}>
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
