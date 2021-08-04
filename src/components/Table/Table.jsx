import S from "./styles.module.css"
import {Categories} from "../Category/Category";
import List from "../List/List";
import {Description} from "../Description/Description";
import {useState} from "react";

export default function Table() {
    const [category, setCategory] = useState(null);

    const handlerChangeCategory = (name) => {
        setCategory(name);
    }

    return(
        <main className={S.main}>
            <Categories onChangeCategory={handlerChangeCategory}/>
            <List category={category}/>
            <Description />
        </main>
    )
}