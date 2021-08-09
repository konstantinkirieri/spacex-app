import S from "../Description/styles.module.css";

export default function DescriptionFavorites({data, itemId, addToFavorite, deleteFromFavorites}) {
    const getDescription = itemId === 0 ? [data[0]] : data.filter(item => item.id === itemId);
    return (
        data.length !== 0 ?
            getDescription.map(item => {
                return (<div key={item.id} className={S.description}>
                    <img
                        className={S.description__image}
                        src={item.dataType === 'Launches' ? item.links.patch.small : item.flickr_images}
                        alt={item.name}
                    />
                    <div className={S.description__text}>
                        <h2 className={S.description__title}>
                            {item.name}
                        </h2>
                        <p className={S.description__about}>
                            {item.dataType === 'Launches' ? item.details : item.description}
                        </p>
                    </div>
                    <button
                        className={S.likeButton}
                        onClick={() => item.isFavorite ? deleteFromFavorites(item.id, item.dataType) : addToFavorite(item.id, item.dataType)}
                    >
                        <i className={item.isFavorite ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
                    </button>
                </div>)
            }) :
            <h1>Favorites is empty</h1>
    )
}