import { React, useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import S from './styles.module.css';

export default function List({category, onChangeItem, launches, rockets}) {
    const [keyword, setKeyword] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setSuccess('');
        setKeyword('');
    }, [category])

    function filterList(iteme) {
        if(!keyword) return true;
        const regexp = new RegExp(keyword, 'i');
        return iteme.name.match(regexp);
    }
    function filterLaunchesSuccess(iteme) {
        if(!success) return true;
        if(category === 'Launches') {
            return String(iteme.success) === success
        }else if(category === 'Rockets') {
            return String(iteme.active) === success
        }
    }
    function getCategory(category) {
        switch (category) {
            case 'Launches':
                return launches
            case 'Rockets':
                return rockets
            default:
                return []
        }
    }
    return (
        <div className={S.list}>
            <div className={S.search_wrapper}>
                <input
                    className={S.search_input}
                    type="search"
                    placeholder={`Поиск...`}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}/>
                {category !== null && <select id='select' className={S.search_select} value={success} onChange={(e) => setSuccess(e.target.value)}>
                    <option value=''>
                        {category === 'Launches' ? 'Result' : 'Activity'}
                    </option>
                    <option value='true'>
                        {category === 'Launches' ? 'Success' : 'Active'}
                    </option>
                    <option value='false'>
                        {category === 'Launches' ? 'Failure' : 'No active'}
                    </option>
                </select>}
            </div>
            <div className="items">
                {getCategory(category)
                    .filter((iteme) => filterLaunchesSuccess(iteme))
                    .filter((iteme) => filterList(iteme))
                    .map(({id, name, links, details, success, description, flickr_images, isFavorite}, idx) => <ListItem
                    key={id}
                    title={name}
                    urlImg={category === 'Launches' ? links.patch.small : flickr_images[0]}
                    description={category === 'Launches' ? {details, success} : description}
                    onChangeItem={() => onChangeItem(idx)}
                    favorite={isFavorite}
                />)}
            </div>
        </div>
    )
}
