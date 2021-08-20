import React, {useState} from 'react'

import {launchesStore, rocketsStore} from '../../../stores'

import S from '../styles.module.css'
import {DescriptionRockets} from '../Rockets'

export const DescriptionLaunches: React.FC<{
  itemIndex: number
}> = ({itemIndex}) => {
  const [showRocketInfo, setShowRocketInfo] = useState(false)

  const launchesItem = launchesStore.launchesDataStore[itemIndex]
  const rocketItem = rocketsStore.rocketsDataStore.filter(
    (item: {id: string}) => item.id === launchesItem.rocket
  )[0]

  return (
    <div className={S.rocketList}>
      <div className={S.rocketList__item}>
        <div>
          <strong>Rocket:</strong>
        </div>

        <div key={rocketItem.id}>
          <button
            className={S.rocketList__button}
            onClick={() => setShowRocketInfo(!showRocketInfo)}>
            {rocketItem.name} {showRocketInfo ? '[↑]' : '[↓]'}
          </button>
          {showRocketInfo && <DescriptionRockets dataRocket={rocketItem} />}
        </div>
      </div>
      <div className={S.rocketList__item}>
        <strong>Success:</strong>
        {launchesItem.success ? (
          <span className={S.success}>Success</span>
        ) : (
          <span className={S.failure}>Failure</span>
        )}
      </div>
      <div className={S.rocketList__item}>
        <strong>Flight number: </strong>
        {launchesItem.flight_number}
      </div>
      <div className={S.rocketList__item}>
        <strong>Webcast: </strong>
        <a href={launchesItem.links.webcast} target="_blank" rel="noreferrer">
          {launchesItem.links.webcast}
        </a>
      </div>
      <div className={S.rocketList__item}>
        <strong>Wikipedia: </strong>{' '}
        <a href={launchesItem.links.wikipedia} target="_blank" rel="noreferrer">
          {launchesItem.links.wikipedia}
        </a>
      </div>
    </div>
  )
}
