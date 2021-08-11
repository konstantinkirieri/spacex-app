import React from 'react';
import S from './List.module.css';
import ListItemFavorites from "../ListItemFavorites/ListItemFavorites";
import ListItem from '../ListItem/ListItem'

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
                    return <>{
                        launches.map((item) => <ListItem 
                            key={item.id}
                            onChangeItem={onChangeItem}
                            favorites={favorites}
                            {...item} 
                            urlImg={item.links.patch.small} 
                            description={item.details}/>
                        )
                    }</>
                case 'Rockets':
                    return <>{
                        rockets.map((item) => <ListItem 
                            key={item.id}
                            onChangeItem={onChangeItem} 
                            favorites={favorites}
                            {...item}
                            urlImg={item.flickr_images[0]}/>
                        )
                    }</>
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