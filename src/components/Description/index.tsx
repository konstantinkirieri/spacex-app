import React from 'react'
import {favoritesStore} from '../../stores'

import {DescriptionLaunches} from './Launches'
import {DescriptionRockets} from './Rockets'
import {ILaunchesData, IRocketsData} from '../../interfaces'

import S from './styles.module.css'

interface DescriptionProps {
  id: string
  currentData: ILaunchesData | IRocketsData
  name: string
  description: string | null
  thumbnail: string 
  addToFavorite: (id: string | null) => void
  onGoBack: () => void
  deleteFromFavorites: (id: string | null) => void
}

export const Description: React.FC<DescriptionProps> = ({
  id,
  currentData,
  name,
  description,
  thumbnail,
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

      {currentData.dataType === 'Launches' ? (
        <DescriptionLaunches launchesItem={currentData}/>
      ) : (
        <DescriptionRockets rocketsItem={currentData}/>
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
