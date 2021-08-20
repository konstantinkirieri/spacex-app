import React from 'react'
import {IRocketsData} from '../../../interfaces'

import S from '../styles.module.css'

export const DescriptionRockets: React.FC<{dataRocket: IRocketsData}> = ({
  dataRocket
}) => {
  const {name, height, diameter, mass, flickr_images} = dataRocket
  return (
    <div className={S.rocketList__info}>
      <div>
        <img className={S.rocketList__image} src={flickr_images[0]} alt={name} />
      </div>
      <div className={S.rocketList__details}>
        <h3>{name}</h3>
        <div>Height: {height.meters} meters</div>
        <div>Diameter: {diameter.meters} meters</div>
        <div>Mass: {mass.kg} kg</div>
      </div>
    </div>
  )
}
