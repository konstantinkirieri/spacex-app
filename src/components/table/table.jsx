import S from "./styles.module.css"
import {Categories} from "../category/category";
import List from "../list/list";
import {Description} from "../Description";

export default function Table() {
    return(
        <main className={S.main}>
            <Categories />
            <List />
            <Description />
        </main>
    )
}