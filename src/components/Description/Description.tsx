import React from 'react'

import S from './styles.module.css'
import {DescriptionLaunches} from '../DescriptionLaunches/DescriptionLaunches'
import {ILaunchesData, IRocketsData} from '../../interfaces'

interface DescriptionProps {
  id: null | string,
  name: string,
  description: string,
  thumbnail: string,
  dataType: 'Rockets' | 'Launches',
  addToFavorite: (
    id: string | null,
  ) => void,
  onGoBack: () => void,
  deleteFromFavorites: (
    id: string | null,
  ) => void,
  moreDetails: ILaunchesData | IRocketsData,
  favorites: Array<ILaunchesData | IRocketsData>,
  rocketsDataStore: IRocketsData[]
}

export const Description: React.FC<DescriptionProps> = ({
  id,
  name,
  description,
  thumbnail,
  addToFavorite,
  onGoBack,
  deleteFromFavorites,
  moreDetails,
  favorites,
  rocketsDataStore
}) => {

  const getDetails: () => boolean | JSX.Element = () => {
    return (
      moreDetails.dataType === 'Launches' && (
        <DescriptionLaunches moreDetails={moreDetails} rocketsDataStore={rocketsDataStore} />
      )
    )
  }

  return (
    <div key={id} className={S.description}>
      <img
        className={S.description__image}
        src={thumbnail}
        alt={name}
      />
      <div className={S.description__text}>
        <h2 className={S.description__title}>{name}</h2>
        <div className={S.description__about}>
          {description}
        </div>
      </div>
      {getDetails()}
      <button className={S.goBackButton} onClick={onGoBack}>
        <i className="fas fa-arrow-alt-circle-left"></i>
      </button>
      <button
        className={S.likeButton}
        onClick={() =>
          favorites?.some((f) => f.id === id)
            ? deleteFromFavorites(id)
            : addToFavorite(id)
        }>
        <i
          className={
            favorites?.some((f) => f.id === id)
              ? `${S.likeButtonHovered} fas fa-heart`
              : 'far fa-heart'
          }
        />
      </button>
    </div>
  )
}
