import React from 'react'
import S from './styles.module.css'

export const CategoryItem: React.FC<{
  data: {name: string}
  onChangeCategory: (name: string) => void
}> = ({data, onChangeCategory}) => {
  return (
    <div
      className={S.item}
      onClick={() => onChangeCategory(data.name)}>
      {data.name}
    </div>
  )
}
