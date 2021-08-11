import React from 'react';
import S from './List.module.css';
import ListItemLaunches from "../ListItemLaunches/ListItemLaunches";
import ListItemRockets from "../ListItemRockets/ListItemRockets";
import ListItemFavorites from "../ListItemFavorites/ListItemFavorites";

interface ListProps {
    category: string,
    onChangeItem: Function,
    launches: any[],
    rockets: any[],
    favorites: []
}

const List: React.FC<ListProps> = ({
    category,
    onChangeItem,
    launches,
    rockets,
    favorites
}) => {

    const switchComponents: ((category: string) => JSX.Element | null) = category => {
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

export default List