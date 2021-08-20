import React from "react";
import S from './styles.module.css';

export const Header: React.FC = () => {
    return (
        <header className={S.header}>
            <h1 className={S.headerTitle}>
                <i className="fas fa-space-shuttle" />
                SpaceX App
            </h1>
        </header>
    )
}