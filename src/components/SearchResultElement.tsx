import React from 'react';
import { Col, Row, Card } from 'antd';
import styles from './Search.module.css';

type PropsType = {
    text: string
    id: number
    date: string
    typeCard: string
    url: string
}
const SearchResultElement: React.FC<PropsType> = ({ text, id, date, url, typeCard }) => {
    return (
        <Col xs={24} sm={12} md={typeCard === "bigCard" ? 12 : 8}>
            <a href={url} target='_blank' rel="noreferrer">
                <Card className={typeCard == "bigCard" ? styles.bigCard : styles.smallCard}>
                    <Row className={styles.text}>
                        {text}
                    </Row>
                    <Row>
                        <Col xs={24} md={typeCard === "bigCard" ? 16 : 14} className={styles.id}>{id}</Col>
                        <Col xs={24} md={typeCard === "bigCard" ? 8 : 10} className={styles.date}>{date}</Col>
                    </Row>
                </Card>
            </a>
        </Col>
    );
}

export default SearchResultElement;
