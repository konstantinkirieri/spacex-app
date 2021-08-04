import React from 'react'
import S from './categories.module.css'

export function CategoryItem({data, index, onChangeCategory}) {
   return (
      <div className={S.item_wrapper}>
         <p
             className={S.item}
             onClick={() => onChangeCategory(data.name)}
         >
             {index}. {data.name}
         </p>
      </div>
   )
}