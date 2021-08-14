import React from 'react';

import ListItemFavorites from "../ListItemFavorites/ListItemFavorites";
import ListItem from '../ListItem/ListItem'

import S from './List.module.css';
import {ILaunchesData, IRocketsData} from '../../interfaces'

interface ListProps {
    category: string,
    onClickItem: (id: string | null) => void,
    launches: ILaunchesData[],
    rockets: IRocketsData[],
    favorites: [IRocketsData | ILaunchesData]
}

const List: React.FC<ListProps> = ({
    category,
    onClickItem,
    launches,
    rockets,
    favorites
}) => {

    const switchComponents: ((category: string) => JSX.Element | null) = category => {
            switch (category) {
                case 'Launches':
                    return <>{
                        launches.map((item) => <ListItem
                            key={item.id}
                            onClickItem={onClickItem}
                            favorites={favorites}
                            {...item}
                            imgUrl={item.links.patch.small}
                            description={item.details}/>
                        )
                    }</>
                case 'Rockets':
                    return <>{
                        rockets.map((item) => <ListItem
                            key={item.id}
                            onClickItem={onClickItem}
                            favorites={favorites}
                            {...item}
                            imgUrl={item.flickr_images[0]}/>
                        )
                    }</>
                case 'Favorites':
                    return <ListItemFavorites favorites={favorites} onClickItem={onClickItem} />
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
