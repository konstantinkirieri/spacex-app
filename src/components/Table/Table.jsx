import S from "./styles.module.css"
import {Categories} from "../Category/Category";
import List from "../List/List";
import {Description} from "../Description/Description";

export default function Table() {
    return(
        <main className={S.main}>
            <Categories />
            <List />
            <Description />
        </main>
    )
}