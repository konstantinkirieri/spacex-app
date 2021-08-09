import S from "../Description/styles.module.css";
import React from "react";
import {useState} from "react";
import RocketInfo from "../RocketInfo/RocketInfo";

export default function DescriptionLaunches({data, rockets, itemId, addToFavorite, deleteFromFavorites, favorites}) {
    const getDescription = itemId !== 0 ? data.filter(item => item.id === itemId) : [data[0]];
    const [showRocketInfo, setShowRocketInfo] = useState(false);

    return (
        getDescription.map(item => {
            const rocket = rockets.filter(rocketItem => rocketItem.id === item.rocket);
            return (
              <div key={item.id} className={S.description}>
                <img
                    className={S.description__image}
                    src={item.links.patch.small}
                    alt={item.name}
                />
                <div className={S.description__text}>
                    <h2 className={S.description__title}>
                        {item.name}
                    </h2>
                    <div className={S.description__about}>
                        {item.details}
                    </div>
                    <div className={S.rocketList}>
                        <div className={S.rocketList__item}>
                            <div><strong>Rocket:</strong> </div>
                            {rocket.map(rocket =>
                                {
                                    return (
                                      <div key={rocket.id}>
                                          <button className={S.rocketList__button} onClick={() => setShowRocketInfo(!showRocketInfo)}>{rocket.name} {showRocketInfo ? '[↑]': '[↓]'}</button>
                                          {showRocketInfo && <RocketInfo data={rocket}/>}
                                      </div>
                                    )
                                })
                            }
                        </div>
                        <div className={S.rocketList__item}><strong>Success:</strong> {item['success'] ? <span className={S.success}>Success</span> : <span className={S.failure}>Failure</span>}</div>
                        <div className={S.rocketList__item}><strong>Flight number: </strong> {item['flight_number']}</div>
                        <div className={S.rocketList__item}><strong>Webcast: </strong> <a href={item['links']['webcast']} target={"_blank"}>{item['links']['webcast']}</a></div>
                        <div className={S.rocketList__item}><strong>Wikipedia: </strong> <a href={item['links']['wikipedia']} target={"_blank"}>{item['links']['wikipedia']}</a></div>
                    </div>
                </div>
                <button
                    className={S.likeButton}
                    onClick={() => favorites.some((f) => f.id === item.id) ? deleteFromFavorites(item.id, item.dataType) : addToFavorite(item.id, item.dataType)}
                >
                    <i className={favorites.some((f) => f.id === item.id) ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
                </button>

            </div>)
        })
    )
}