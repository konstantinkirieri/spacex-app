import S from './styles.module.css'

import like from '../../images/shape.png'

const Description = () => {
  return (
    <div className={S.description}>
      <img
        className={S.description__image}
        src=""
        alt="Пикча"
      />
      <div className={S.description__text}>
        <h2 className={S.description__title}>
          Название длинное вообще жестб
        </h2>
        <p className={S.description__about}>
          Какое-то описание тоже длинное многострочное и всё
          такое, зависит от конкретного источника данных
        </p>
      </div>
      <img
        className={S.description__like}
        src={like}
        alt="Лого"
      />
    </div>
  )
}

export {Description}
