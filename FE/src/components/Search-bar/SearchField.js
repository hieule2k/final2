import React, { Fragment, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Search-bar.module.css';
import { Portal } from 'react-overlays';
import axios from 'axios';
import SearchItems from 'components/SearchItems/SearchItems';

const CalendarContainer = ({ children }) => {
    const el = document.getElementById('calendar-portal');

    return <Portal container={el}>{children}</Portal>;
};

const cx = classNames.bind(styles);

const SearchField = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [query, setQuery] = useState('');

    const [location, setLocation] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://103.184.113.181:81/hotels?page=1&limit=1&search_field=location&search_value=${query}`);
            if (response.data.items) {
                setLocation(response.data.items);
            } else {
                setLocation([]);
            }
        }
        fetchData();
    }, [query]);
    const handleClick = () => {
        navigate('/Search');
    };
    console.log(location);
    console.log(query);

    return (
        <div className={cx('fragment')}>
            <div className={cx('search-field')}>
                <div className={cx('item-container')}>
                    <div className={cx('search-item')}>
                        <span className={cx('search-title')}>Location</span>
                        <input className={cx('search-action')} placeholder="Which city do you prefer?" onChange={(e) => setQuery(e.target.value)} />
                    </div>

                    <div className={cx('search-item')}>
                        <span className={cx('search-title')}>Check In</span>
                        <span className={cx('search-action')}>
                            <DatePicker portalId="root-portal" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </span>
                    </div>
                    <div className={cx('search-item')}>
                        <span className={cx('search-title')}>Check Out</span>
                        <span className={cx('search-action')}>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} popperContainer={CalendarContainer} />
                        </span>
                    </div>
                    <div className={cx('search-item')}>
                        <span className={cx('search-title')}>Guests</span>

                        <input className={cx('search-action')} placeholder="Add guest" />
                    </div>
                </div>

                <Link to="/Search">
                    <div className={cx('search-icon__container')}>
                        <IconContext.Provider value={{ color: '#fff', size: '20px' }}>
                            <i className={cx('.search-icon')}>
                                <BsSearch />
                            </i>
                        </IconContext.Provider>
                    </div>
                </Link>
            </div>
            {location.length > 0 && query.length > 0 && (
                <div className={cx('search-results')}>
                    {location.length > 0 &&
                        location.map((item, index) => (
                            <div className={cx('search-item-wrapper')}>
                                <SearchItems item={item} key={index} onClick={handleClick}></SearchItems>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default SearchField;
