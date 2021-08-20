import React from 'react'
import {favoritesStore, rocketsStore} from '../../stores'

import {DescriptionLaunches} from './Launches'
import {DescriptionRockets} from './Rockets'

import S from './styles.module.css'

interface DescriptionProps {
  id: null | string
  itemIndex: number
  name: string
  description: string
  thumbnail: string
  dataType: 'Launches' | 'Rockets'
  addToFavorite: (id: string | null) => void
  onGoBack: () => void
  deleteFromFavorites: (id: string | null) => void
}

export const Description: React.FC<DescriptionProps> = ({
  id,
  itemIndex,
  name,
  description,
  thumbnail,
  dataType,
  addToFavorite,
  onGoBack,
  deleteFromFavorites
}) => {
  return (
    <div key={id} className={S.description}>
      <img className={S.description__image} src={thumbnail} alt={name} />

      <div className={S.description__text}>
        <h2 className={S.description__title}>{name}</h2>
        <div className={S.description__about}>{description}</div>
      </div>

      {dataType === 'Launches' ? (
        <DescriptionLaunches itemIndex={itemIndex} />
      ) : (
        <DescriptionRockets
          dataRocket={rocketsStore.rocketsDataStore[itemIndex]}
        />
      )}

      <button className={S.goBackButton} onClick={onGoBack}>
        <i className="fas fa-arrow-alt-circle-left" />
      </button>
      <button
        className={S.likeButton}
        onClick={() =>
          favoritesStore.favoritesDataStore?.some(
            (f: {id: string}) => f.id === id
          )
            ? deleteFromFavorites(id)
            : addToFavorite(id)
        }>
        <i
          className={
            favoritesStore.favoritesDataStore?.some(
              (f: {id: string}) => f.id === id
            )
              ? `${S.likeButtonHovered} fas fa-heart`
              : 'far fa-heart'
          }
        />
      </button>
    </div>
  )
}
