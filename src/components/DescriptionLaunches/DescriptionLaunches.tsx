import React, {useState} from 'react'

import {ILaunchesData, IRocketsData} from '../../interfaces'
import {RocketInfo} from '../RocketInfo/RocketInfo'

import S from "../Description/styles.module.css";

export const DescriptionLaunches: React.FC<{moreDetails: ILaunchesData; rocketsDataStore: IRocketsData[]}> = ({moreDetails, rocketsDataStore}) => {
  const [showRocketInfo, setShowRocketInfo] = useState(false);
  const rocket = rocketsDataStore.filter((rocketItem: { id: string; }) => rocketItem.id === moreDetails.rocket);

  return (
    <div className={S.rocketList}>
      <div className={S.rocketList__item}>
        <div><strong>Rocket:</strong> </div>
        {rocket.map((rocket: any) => (
          <div key={rocket.id}>
            <button className={S.rocketList__button} onClick={() => setShowRocketInfo(!showRocketInfo)}>{rocket.name} {showRocketInfo ? '[↑]': '[↓]'}</button>
            {showRocketInfo && <RocketInfo dataRocket={rocket}/>}
          </div>))
        }
      </div>
      <div className={S.rocketList__item}><strong>Success:</strong> {moreDetails.success ? <span className={S.success}>Success</span> : <span className={S.failure}>Failure</span>}</div>
      <div className={S.rocketList__item}><strong>Flight number: </strong> {moreDetails.flight_number}</div>
      <div className={S.rocketList__item}><strong>Webcast: </strong> <a href={moreDetails.links.webcast} target={"_blank"}>{moreDetails.links.webcast}</a></div>
      <div className={S.rocketList__item}><strong>Wikipedia: </strong> <a href={moreDetails.links.wikipedia} target={"_blank"}>{moreDetails.links.wikipedia}</a></div>
    </div>
  )
}



// import React from "react";
//
// import {ILaunchesData} from '../../interfaces'
// import {RocketInfo} from '../RocketInfo/RocketInfo'
//
// import S from "../Description/styles.module.css";
//
// export const DescriptionLaunches: React.FC<{success: boolean, flight_number: string, links: {webcast: string, wikipedia: string}}> = ({success, flight_number, links,}) => {
//   return (
//     <div className={S.rocketList}>
//       <div className={S.rocketList__item}>
//         <div><strong>Rocket:</strong> </div>
//         {/*{rocket.map(rocket => (*/}
//         {/*  <div key={rocket.id}>*/}
//         {/*    <button className={S.rocketList__button} onClick={() => setShowRocketInfo(!showRocketInfo)}>{rocket.name} {showRocketInfo ? '[↑]': '[↓]'}</button>*/}
//         {/*    {showRocketInfo && <RocketInfo data={rocket}/>}*/}
//         {/*  </div>))*/}
//         {/*}*/}
//       </div>
//       <div className={S.rocketList__item}><strong>Success:</strong> {success ? <span className={S.success}>Success</span> : <span className={S.failure}>Failure</span>}</div>
//       <div className={S.rocketList__item}><strong>Flight number: </strong> {flight_number}</div>
//       <div className={S.rocketList__item}><strong>Webcast: </strong> <a href={links.webcast} target={"_blank"}>{links.webcast}</a></div>
//       <div className={S.rocketList__item}><strong>Wikipedia: </strong> <a href={links.wikipedia} target={"_blank"}>{links.wikipedia}</a></div>
//     </div>
//   )
// }
