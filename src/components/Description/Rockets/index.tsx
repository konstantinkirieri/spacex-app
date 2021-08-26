import React from 'react'
import {IRocketsData} from '../../../interfaces'

import S from '../styles.module.css'
import {mainStore} from '../../../stores'

export const DescriptionRockets: React.FC<{
  rocketsItem: IRocketsData
}> = ({rocketsItem}) => {
  const {name, height, diameter, mass, flickr_images} =
    rocketsItem
  return (
    <div className={S.rocketList__info}>
      {mainStore.currentCategory !== 'Rockets' && (
        <div>
          <img
            className={S.rocketList__image}
            src={flickr_images[0]}
            alt={name}
          />
        </div>
      )}

      <div className={S.rocketList__details}>
        <h3>
          {mainStore.currentCategory !== 'Rockets' && name}
        </h3>
        <div>Height: {height.meters} meters</div>
        <div>Diameter: {diameter.meters} meters</div>
        <div>Mass: {mass.kg} kg</div>
      </div>
    </div>
  )
}
