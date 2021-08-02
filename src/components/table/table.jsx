import S from "./styles.module.css"
import {Categories} from "../category/category";
import List from "../list/list";

export default function Table() {
    return(
        <main className={S.main}>
            <Categories />
            <List />
            <div>Description</div>
        </main>
    )
}