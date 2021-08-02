import React from 'react'
import S from './category.module.css'

export function CategoryItem(props) {
   debugger
   console.log(props)
   return (
      <div className={S.item_wrapper}>
         <p className={S.item}>{props.index}. {props.data.name}</p>
      </div>
   )
}