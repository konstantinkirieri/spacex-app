import S from './style.module.css';

export default function ListItem({urlImg, id, title, description, success, favorite, onChangeItem}) {
    const isFavorite = favorite ? <i className={`${S.like} fas fa-heart`} /> : null;
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
                    ? (success ? 'Success. ' : 'Failure. ')
                    : null
                  }
                  {description}
              </div>
          </div>
          {isFavorite}
      </div>
    )
}
