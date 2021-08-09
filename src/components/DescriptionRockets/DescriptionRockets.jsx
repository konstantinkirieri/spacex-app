import S from "../Description/styles.module.css";

export default function DescriptionRockets({data, itemId, addToFavorite, deleteFromFavorites}) {
    const getDescription = itemId !== 0 ? data.filter(item => item.id === itemId) : [data[0]];
    return (
        getDescription.map(item => {
            return (<div key={item.id} className={S.description}>
                <img
                    className={S.description__image}
                    src={item.flickr_images}
                    alt=""
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
                    onClick={() => item.isFavorite ? deleteFromFavorites(item.id, item.dataType) : addToFavorite(item.id, item.dataType)}
                >
                    <i className={item.isFavorite ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
                </button>
            </div>)
        })
    )
}