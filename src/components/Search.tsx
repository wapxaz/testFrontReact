import React from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import styles from './Search.module.css';
import SearchForm from './SearchForm';
import SearchResultElement from './SearchResultElement';
import { AppStateType } from '../redux/redux-store';

const Search: React.FC = () => {
    const data = useSelector((state: AppStateType) => state.serarch);

    let countEl = 0;

    return (
        <div>
            <SearchForm count={data.totalCoun} />

            <Row gutter={[20, 20]} justify="center" className={styles.wrap}>
                {data.elements.map((el: any) => {
                    if (countEl < 2) {
                        countEl++;
                        return <SearchResultElement text={el.text} id={el.id} date={el.date} url={el.url} typeCard="bigCard" key={el.id} />
                    } else {
                        return <SearchResultElement text={el.text} id={el.id} date={el.date} url={el.url} typeCard="smallCard" key={el.id} />
                    }
                })}
            </Row>
        </div>
    );
}

export default Search;
