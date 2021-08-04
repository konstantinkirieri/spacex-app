import S from "./search.module.css"

export default function Search () {
    const getPath = window.location.pathname;
    return (
        getPath === '/spacex-app/' ?
            <div className={S.search_wrapper}>
            <i className="fas fa-search" />
            <input
                className={S.search_input}
                type="search"
                placeholder={`Поиск...`}/>
            <button className={S.search_filter}>
                <i className="fas fa-filter" />
            </button>
            </div> : null
    )
}