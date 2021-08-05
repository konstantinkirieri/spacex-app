import React from 'react'
import S from './styles.module.css'

export function CategoryItem({data, index, onChangeCategory}) {
   return (
      <nav className={S.item_wrapper}>
         <p
             className={S.item}
             onClick={() => onChangeCategory(data.name)}
         >
             {index}. {data.name}
         </p>
      </nav>
   )
}