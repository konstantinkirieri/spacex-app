import S from './styles.module.css'

export const Loader: React.FC = () => {
  return (
    <div className={S.container}>
      <div className={S.rocketContainer}>
        <div className={S.tip}></div>
        <div className={S.rocket}></div>
        <div className={S.window}></div>
        <div className={S.dots}></div>
        <div className={S.bum}></div>
        <div className={`${S.wing} ${S.wingOne}`}></div>
        <div className={`${S.wing} ${S.wingTwo}`}></div>
        <div className={S.light}></div>
        <div className={S.light2}></div>
        <div className={S.flame}></div>
        <div className={S.flame2}></div>
      </div>
    </div>
  )
}
