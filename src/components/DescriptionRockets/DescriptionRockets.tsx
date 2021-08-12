import React from "react";
import S from "../Description/styles.module.css";

interface DescriptionRocketsProps {
    data: any[],
    itemId: string | number,
    addToFavorite: (id: string, dataType: string) => void,
    deleteFromFavorites: (id: string, dataType: string) => void,
    favorites: any[]
}

export const DescriptionRockets: React.FC<DescriptionRocketsProps> = ({
    data,
    itemId,
    addToFavorite,
    deleteFromFavorites,
    favorites
}) => {
    const getDescription = itemId !== 0 ? data.filter(item => item.id === itemId) : [data[0]];
    const showDescription = getDescription.map(item => {
        return (<div key={item.id} className={S.description}>
            <img
                className={S.description__image}
                src={item.flickr_images}
                alt={item.name}
            />
            <div className={S.description__text}>
                <h2 className={S.description__title}>
                    {item.name}
                </h2>
                <p className={S.description__about}>
                    {item.description}
                </p>
            </div>
            <button
                className={S.likeButton}
                onClick={() => favorites.some((f) => f.id === item.id) ? deleteFromFavorites(item.id, item.dataType) : addToFavorite(item.id, item.dataType)}
            >
                <i className={favorites.some((f) => f.id === item.id) ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
            </button>
        </div>)
    });

    return <>{showDescription}</>
}