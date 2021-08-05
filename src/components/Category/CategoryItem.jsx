import React from 'react'
import S from './styles.module.css'

export function CategoryItem({data, index, onChangeCategory}) {
   return (
      <div
            className={S.item}
            onClick={() => onChangeCategory(data.name)}
      >{data.name}</div>
   )
}