import S from './styles.module.css'

const Description = ({itemId, category, launches, rockets, addToFavorite}) => {
  const getName = (category) => {
    switch (category) {
      case 'Launches':
        return launches[itemId].name
      case 'Rockets':
        return rockets[itemId].name
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
