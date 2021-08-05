import S from './styles.module.css'
import {Categories} from '../Category/Category'
import List from '../List/List'
import {Description} from '../Description/Description'
import {useState} from 'react'

export default function Table() {
  const [category, setCategory] = useState(null)
  const [itemId, setItemId] = useState(0)

  const handlerChangeCategory = (name) => {
    setCategory(name)
    setItemId(0)
  }

  const handlerChangeItem = (id) => {
    setItemId(id)
  }

  return (
    <main className={S.main}>
      <Categories
        onChangeCategory={handlerChangeCategory}
      />
      <List
        category={category}
        onChangeItem={handlerChangeItem}
      />
      <Description category={category} itemId={itemId} />
    </main>
  )
}
