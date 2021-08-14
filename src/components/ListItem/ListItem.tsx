import React from "react";
import S from './style.module.css';
import {ILaunchesData, IRocketsData} from '../../interfaces'

interface ListItemProps {
    imgUrl: string,
    id: string | null,
    name: string,
    description: string,
    success?: boolean | undefined,
    favorites: [IRocketsData | ILaunchesData],
    onClickItem: (id: string | null) => void
}

const ListItem: React.FC<ListItemProps> = ({
    imgUrl,
    id,
    name,
     description,
    success,
    favorites,
    onClickItem
}) => {
    return (
      <div className={S.item}
           onClick={() => onClickItem(id)}
      >
          <img className={S.img} src={imgUrl} alt={name} />
          <div className={S.body}>
              <h3 className={S.title}>
                  {name}
              </h3>
              <div className={S.description}>
                  {success !== undefined
                    ? (success ? <span className={S.success}>Success. </span> : <span className={S.failure}>Failure. </span>)
                    : null
                  }
                  {description}
              </div>
          </div>
          {
            favorites.some((f: {id: string}) => f.id === id)
            && <i className={`${S.like} fas fa-heart`} />
          }
      </div>
    )
}

export default  ListItem
