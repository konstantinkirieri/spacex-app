import React from 'react';
import S from './List.module.css';
import ListItemLaunches from "../ListItemLaunches/ListItemLaunches";
import ListItemRockets from "../ListItemRockets/ListItemRockets";
import ListItemFavorites from "../ListItemFavorites/ListItemFavorites";

export default function List({category, onChangeItem, launches, rockets, favorites}) {

    const switchComponents = (category) => {
            switch (category) {
                case 'Launches':
                    return <ListItemLaunches launches={launches} onChangeItem={onChangeItem} favorites={favorites}/>
                case 'Rockets':
                    return <ListItemRockets rockets={rockets} onChangeItem={onChangeItem} favorites={favorites}/>
                case 'Favorites':
                    return <ListItemFavorites favorites={favorites} onChangeItem={onChangeItem} />
                default:
                    return null
            }
    };

    return (
        <div className={S.list}>
            <div className={S.items}>
                {switchComponents(category)}
            </div>
        </div>
    )
}
