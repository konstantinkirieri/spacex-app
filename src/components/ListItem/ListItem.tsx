import S from './style.module.css';

interface ListItemProps {
    urlImg: string, 
    id: string | number, 
    title: string, 
    description: string, 
    success?: boolean | undefined, 
    favorites: [], 
    onChangeItem: Function
}

const ListItem: React.FC<ListItemProps> = ({urlImg, id, title, description, success, favorites, onChangeItem}) => {
    return (
      <div className={S.item}
           onClick={() => onChangeItem(id)}
      >
          <img className={S.img} src={urlImg} alt={title} />
          <div className={S.body}>
              <h3 className={S.title}>
                  {title}
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