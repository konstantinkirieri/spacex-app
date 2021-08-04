import {React, useState} from 'react';
import ListItem from '../ListItem/ListItem';
import S from './style.module.css';
import { launchesData } from '../../mocks/launches.js';

console.log(launchesData)

function useForceUpdate() {
    const [i, setI] = useState(0);
    return () => setI(i+1)
}


export default function List({category = launchesData}) {
    const forceUpdate = useForceUpdate()
    const [keyword, setKeyword] = useState('')
    const [text, setText] = useState('')
    const [success, setSuccess] = useState('')

    // function toggleLike(idx) {
    //     Data[idx].like = !Data[idx].like;
    //     forceUpdate();
    // }
    function heandleClickSearch() {
        setText(keyword)
    }
    function filterList(iteme) {
        if(!keyword) return true;
        const regexp = new RegExp(keyword, 'i');
        return iteme.name.match(regexp);
    }
    function filterLaunchesSuccess(iteme) {
        if(!success) return true;
        return String(iteme.success) == success;
    }
    return (
        <div className={S.list}>
            <div className={S.search_wrapper}>
                <button onClick={heandleClickSearch}>
                    <i className="fas fa-search" />
                </button>
                <input
                    className={S.search_input}
                    type="search"
                    placeholder={`Поиск...`}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}/>
                <select className={S.search_filter} value={success} onChange={(e) => setSuccess(e.target.value)}>
                    <option value='' selected>Launches</option>
                    <option value='true'>Success</option>
                    <option value='false'>Failure</option>
                </select>
            </div> 
            <div className="items">
                {category
                    .filter((iteme) => filterLaunchesSuccess(iteme))
                    .filter((iteme) => filterList(iteme))
                    .map(({id, name, links, details, success}, idx) => <ListItem
                    key={id}
                    title={name}
                    urlImg={links.patch.small}
                    description={{details, success}}
                    // like={like}
                    // onToggleLike={() => toggleLike(idx)}
                />)}
            </div>
        </div>
    )
}