import S from './styles.module.css'

import {launchesData} from '../../mocks/launches.js'
import {rocketsData} from '../../mocks/rockets'

const Description = ({itemId, category}) => {
  const getName = (category) => {
    switch (category) {
      case 'Launches':
        return launchesData[itemId].name
      case 'Rockets':
        return rocketsData[itemId].name
      default:
        return ''
    }
  }

  const getDescription = (category) => {
    switch (category) {
      case 'Launches':
        return launchesData[itemId].details
      case 'Rockets':
        return rocketsData[itemId].description
      default:
        return ''
    }
  }

  const getImg = (category) => {
    switch (category) {
      case 'Launches':
        return launchesData[itemId].links.patch.small
      case 'Rockets':
        return rocketsData[itemId].flickr_images
      default:
        return ''
    }
  }

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
      <button className={S.likeButton}>
          <i className="far fa-heart"></i>
      </button>
    </div>
  )
}

export {Description}
