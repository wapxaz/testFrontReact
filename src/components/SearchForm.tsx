import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Col, Row, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { AppDispatch, getSearchResult } from '../redux/search-reducer';
import styles from './Search.module.css';
import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

type MyFormValuesType = {
    searchStr: string;
}
type PropsType = {
    count: number
}

const SearchForm: React.FC<PropsType> = (props) => {
    const isLoading = useSelector((state: AppStateType) => (state.serarch.isLoad));

    //настраиваю диспатчи
    const dispatch: AppDispatch = useDispatch();

    function getData(e: string) {
        if (e.length > 3) {
            dispatch(getSearchResult(e));
        }
    }
    const initialValues: MyFormValuesType = { searchStr: '' };
    return (
        <Row className={styles.wrap}>

            <Spin spinning={isLoading} fullscreen />

            <Col xs={0} md={7}></Col>
            <Col xs={20} md={10}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        //console.log(actions);
                    }}
                >
                    <Form>
                        <DebounceInput
                            autoFocus type="text" name="searchStr" className={styles.inputSearch} placeholder="Search jokes..."
                            debounceTimeout={1000}
                            onChange={event => (getData(event.target.value))}
                        />

                        {(props.count > 0) && <div className={styles.searchCountResult}>Found jokes: {props.count}</div>}
                        {(props.count === 0) && <div className={styles.searchCountResult}>Nothing found</div>}
                    </Form>
                </Formik>
            </Col>
        </Row>
    );
}

export default SearchForm;
