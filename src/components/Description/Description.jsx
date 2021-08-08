import S from './styles.module.css'

const Description = ({itemId, category, launches, rockets, addToFavorite, favorites}) => {

  if (category === 'Favorites' && favorites.length === 0) {
      return <h1>Favorites is empty</h1>;
  }

  const getName = (category) => {
    switch (category) {
      case 'Launches':
        return launches[itemId].name
      case 'Rockets':
        return rockets[itemId].name
      case 'Favorites':
        return favorites[itemId].name
      default:
        return ''
    }
  }

  const getDescription = (category) => {
    switch (category) {
      case 'Launches':
        return launches[itemId].details
      case 'Rockets':
        return rockets[itemId].description
      case 'Favorites':
        return favorites[itemId].dataType === 'Launches' ? favorites[itemId].details : favorites[itemId].description
      default:
        return ''
    }
  }

  const getImg = (category) => {
    switch (category) {
      case 'Launches':
        return launches[itemId].links.patch.small
      case 'Rockets':
        return rockets[itemId].flickr_images
      case 'Favorites':
        return favorites[itemId].dataType === 'Launches' ? favorites[itemId].links.patch.small : favorites[itemId].flickr_images
      default:
        return ''
    }
  }

  const getFavorite = (category) => {
    switch (category) {
      case 'Launches':
        return launches[itemId].isFavorite
      case 'Rockets':
        return rockets[itemId].isFavorite
      case 'Favorites':
        return favorites[itemId].isFavorite
      default:
        return ''
    }
  };

  return (
    <div className={S.description}>
      <img
        className={S.description__image}
        src={getImg(category)}
        alt=""
      />
      <div className={S.description__text}>
        <h2 className={S.description__title}>
          {getName(category)}
        </h2>
        <p className={S.description__about}>
          {getDescription(category)}
        </p>
      </div>
      <button className={S.likeButton} onClick={() => addToFavorite(itemId)}>
          <i className={getFavorite(category) ? `${S.likeButtonHovered} fas fa-heart` : 'far fa-heart'} />
      </button>
    </div>
  )
}

export {Description}
