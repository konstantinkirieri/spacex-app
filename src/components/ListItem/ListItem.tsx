import React from "react";
import S from './style.module.css';

interface ListItemProps {
    urlImg: string, 
    id: string | number, 
    name: string, 
    description: string, 
    success?: boolean | undefined, 
    favorites: [], 
    onChangeItem: Function
}

const ListItem: React.FC<ListItemProps> = ({
    urlImg,
    id,
    name,
     description,
    success,
    favorites,
    onChangeItem
}) => {
    return (
      <div className={S.item}
           onClick={() => onChangeItem(id)}
      >
          <img className={S.img} src={urlImg} alt={name} />
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
            favorites.some((f: {id: string | number}) => f.id === id)
            && <i className={`${S.like} fas fa-heart`} />
          }
      </div>
    )
}

export default  ListItem