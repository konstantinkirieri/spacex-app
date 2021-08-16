import React from 'react'

import S from './styles.module.css'
import {DescriptionLaunches} from '../DescriptionLaunches/DescriptionLaunches'
import {ILaunchesData, IRocketsData} from '../../interfaces'

interface DescriptionProps {
  id: null | string,
  name: string,
  description: string,
  isFavorite: boolean,
  thumbnail: string,
  dataType: 'Rockets' | 'Launches',
  addToFavorite: (id: string | null, dataType: 'Rockets' | 'Launches') => void,
  deleteFromFavorites: (id: string | null, dataType: 'Rockets' | 'Launches') => void,
  moreDetails: ILaunchesData | IRocketsData,
}

export const Description: React.FC<DescriptionProps> = ({
  id,
  name,
  description,
  isFavorite,
  thumbnail,
  dataType,
  addToFavorite,
  deleteFromFavorites,
  moreDetails
}) => {

  const getDetails: () => JSX.Element | null = () => {
    if(moreDetails.dataType === 'Launches') {
      return <DescriptionLaunches moreDetails={moreDetails}/>
    }
    return null
  };

  return (
    <div key={id} className={S.description}>
      <img
        className={S.description__image}
        src={thumbnail}
        alt={name}
      />
      <div className={S.description__text}>
        <h2 className={S.description__title}>
          {name}
        </h2>
        <div className={S.description__about}>
          {description}
        </div>
      </div>
      {getDetails()}
      <button
        className={S.likeButton}
        onClick = {() => isFavorite ? deleteFromFavorites(id, dataType) : addToFavorite(id, dataType)}
      >
        <i className={isFavorite ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
      </button>

    </div>
  )
}
