import S from './style.module.css';

export default function ListItem({urlImg, title, description, favorite, onChangeItem}) {
    const isFavorite = favorite ? <i className={`${S.like} fas fa-heart`} /> : null;
    return (
        <div className={S.item}
        onClick={onChangeItem}
        >
            <img className={S.img} src={urlImg} alt="img" />
            <div className={S.body}>
                <h3 className={S.title}>
                    {title}
                </h3>
                <div className={S.description}>
                    {typeof(description) !== 'string' && (description.success ? 'Success.' : 'Failure.')}
                    {description.details && <>&nbsp;{description.details}</>}
                    {typeof(description) === 'string' && <>{description}</>}
                </div>
            </div>
            {isFavorite}
        </div>
    )
}
