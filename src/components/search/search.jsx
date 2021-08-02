import S from "./search.module.css"

export default function Search() {
    return (
        <div className={S.search_wrapper}>
            <i className="fas fa-search" />
            <input
                className={S.search_input}
                type="search"
                placeholder={`Поиск...`}/>
            <button className={S.search_filter}>
                <i className="fas fa-filter" />
            </button>
        </div>
    )
}