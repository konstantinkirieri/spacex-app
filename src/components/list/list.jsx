import React from 'react';
import ListItem from '../ListItem/ListItem';
import S from './style.module.css';
import Search from "../search/search";
import Date from '../../mocks/data'

function useForceUpdate() {
    const [i, setI] = React.useState(0);
    return () => setI(i+1)
  }


export default function List() {
    const forceUpdate = useForceUpdate()
    const [items, setItems] = React.useState(Date)

    function toggleLike(idx) {
        items[idx].like = !items[idx].like;
        forceUpdate();
    }
    return (
        <div className={S.list}>
            <div className="search" style={{height: 50, fontSize: 24, textAlign: 'center'}}>
                <Search />
            </div>
            <div className="items">
                {items.map(({id, title, urlImg, description, like}, idx) => <ListItem
                    key={id}
                    title={title}
                    urlImg={urlImg}
                    description={description}
                    like={like}
                    onToggleLike={() => toggleLike(idx)}
                />)}
            </div>
        </div>
    )
}