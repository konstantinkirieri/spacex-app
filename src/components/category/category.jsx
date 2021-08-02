import React from 'react'
import S from './category.module.css'
import fav from '../../img/heart.svg'
import { CategoryItem } from './CategoryItem';


export function Categories() {

   const categoties = [
      { id: 1, name: "Capsules", endpoin: "./capsules" },
      { id: 2, name: "Rockets", endpoint: "./rockets" },
      { id: 3, name: "Ships", endpoint: "./ships" },
      { id: 4, name: "Launches", endpoint: "./launches" },
   ]


   const allCategories = categoties.map((item, i) => {
      return <CategoryItem data={item} index={i + 1} />
   })

   return (
      <div className={S.category_wrappes}>
         <div className={S.favourites}>
            <img className={S.fav_img} src={fav} alt="избранное"></img>
            <p className={S.fav_titel}>Избранное</p>
         </div>
         <hr className={S.hor_line}></hr>
         <div className={S.fav}>
            {allCategories}
         </div>
      </div>
   )
}