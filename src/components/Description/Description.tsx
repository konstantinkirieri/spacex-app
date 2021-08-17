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
    dataType: 'Rockets' | 'Launches',
  ) => void,
  deleteFromFavorites: (
    id: string | null,
    dataType: 'Rockets' | 'Launches',
  ) => void,
  moreDetails: ILaunchesData | IRocketsData,
  favorites: Array<ILaunchesData | IRocketsData>
}

export const Description: React.FC<DescriptionProps> = ({
  id,
  name,
  description,
  thumbnail,
  dataType,
  addToFavorite,
  deleteFromFavorites,
  moreDetails,
  favorites
}) => {
  const getDetails: () => boolean | JSX.Element = () => {
    return (
      moreDetails.dataType === 'Launches' && (
        <DescriptionLaunches moreDetails={moreDetails} />
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
      <button
        className={S.likeButton}
        onClick={() =>
          favorites?.some((f) => f.id === id)
            ? deleteFromFavorites(id, dataType)
            : addToFavorite(id, dataType)
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
