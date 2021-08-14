import S from "./search.module.css"
import {categories} from '../../mocks/categories'

//TODO вообще удалить раз не используется
export default function Search () {
    return (
      <div className={S.search_wrapper}>
        <input
          className={S.search_input}
          type="search"
          placeholder={`Поиск...`}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}/>
        <select
          id='select'
          className={S.search_select}
          value={success}
          onChange={(e) => setSuccess(e.target.value)}
        >
          {categories.map(item => {
            return (
              <option value={item.name}>{item.name}</option>
            )
          })}
        </select>
      </div>
    )
}
