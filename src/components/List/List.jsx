import React from 'react';
import Favorites from '../Favorites/Favorites'
import S from './List.module.css';
import Rockets from '../Rockets/Rockets'
import Launches from '../Launches/Launches'

export default function List({category, onChangeItem, launches, rockets, favorites}) {

    const switchComponents = (category) => {
            switch (category) {
                case 'Launches':
                    return <Launches launches={launches} onChangeItem={onChangeItem} />
                case 'Rockets':
                    return <Rockets rockets={rockets} onChangeItem={onChangeItem} />
                case 'Favorites':
                    return <Favorites favorites={favorites} onChangeItem={onChangeItem} />
                default:
                    return null
            }
    };

    return (
        <div className={S.list}>
            <div className="items">
                {switchComponents(category)}
            </div>
        </div>
    )
}
