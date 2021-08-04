import S from './style.module.css';

export default function ListItem({urlImg, title, description, like, onChangeItem, onToggleLike}) {
    console.log(typeof(description))
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
            <button 
                className={like ? S.likeActive : null}
                // onClick={onToggleLike}
            >
                {like ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
            </button>
        </div>
    )
}