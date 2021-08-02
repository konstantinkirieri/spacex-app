import S from './style.module.css';

export default function ListItem({urlImg, title, description, like, onToggleLike}) {
    return (
        <div className={S.item}>
            <img className={S.img} src={urlImg} alt="title img" />
            <div className={S.body}>
                <h3 className={S.title}>
                    {title}
                </h3>
                <div className={S.description}>
                    {description}
                </div>
            </div>
            <button 
                className={like ? S.likeActive : null}
                onClick={onToggleLike}>
                {like ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
            </button>
        </div>
    )
}