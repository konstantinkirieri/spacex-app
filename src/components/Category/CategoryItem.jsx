import React from 'react'
import S from './Category.module.css'

export function CategoryItem({data, onChangeCategory}) {
   return (
      <div
            className={S.item}
            onClick={() => onChangeCategory(data.name)}
      >{data.name}</div>
   )
}
