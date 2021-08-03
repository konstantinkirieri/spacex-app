import React from 'react'
import S from './categories.module.css'

export function CategoryItem(props) {
   return (
      <div className={S.item_wrapper}>
         <p className={S.item} onClick={props.goTo}>{props.index}. {props.data.name}</p>
      </div>
   )
}