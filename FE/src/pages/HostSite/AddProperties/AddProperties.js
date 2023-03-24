import TextAreaFormik from '../../../components/TextAreaFormik/TextAreaFormik';
import styles from './AddProperties.module.css';
import SelectFormik from '../../../components/SelectFormik/SelectFormik';
import ScrollToTop from '../../../components/ScrollToTop';
import React, { useState } from 'react';
import MyInput from '../../../components/MyInput/MyInput';
import ImageGallery from '../../../components/ImageGallery/ImageGallery';
import data from '../../../json/hotel.json';
import Counter from '../../../components/Counter/Counter';
import classNames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import LayoutPrimary from 'layouts/LayoutPrimary';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddProperties() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(() => {
        const storageData = JSON.parse(localStorage.getItem('userData'));

        return storageData ?? [];
    });
    const cityList = [
        'An Giang',
        'Bac Giang',
        'Bac Kan',
        'Bac Lieu',
        'Bac Ninh',
        'Ba Ria-Vung Tau',
        'Ben Tre',
        'Binh Dinh',
        'Binh Duong',
        'Binh Phuoc',
        'Binh Thuan',
        'Ca Mau',
        'Cao Bang',
        'Dac Lak',
        'Dac Nong',
        'Dien Bien',
        'Dong Nai',
        'Dong Thap',
        'Gia Lai',
        'Ha Giang',
        'Hai Duong',
        'Ha Nam',
        'Ha Tay',
        'Ha Tinh',
        'Hau Giang',
        'Hoa Binh',
        'Hung Yen',
        'Khanh Hoa',
        'Kien Giang',
        'Kon Tum',
        'Lai Chau',
        'Lam Dong',
        'Lang Son',
        'Lao Cai',
        'Long An',
        'Nam Dinh',
        'Nghe An',
        'Ninh Binh',
        'Ninh Thuan',
        'Phu Tho',
        'Phu Yen',
        'Quang Binh',
        'Quang Nam',
        'Quang Ngai',
        'Quang Ninh',
        'Quang Tri',
        'Soc Trang',
        'Son La',
        'Tay Ninh',
        'Thai Binh',
        'Thai Nguyen',
        'Thanh Hoa',
        'Thua Thien-Hue',
        'Tien Giang',
        'Tra Vinh',
        'Tuyen Quang',
        'Vinh Long',
        'Vinh Phuc',
        'Yen Bai',
        'Can Tho',
        'Da Nang',
        'Hai Phong',
        'Hanoi',
        'Ho Chi Minh',
    ];
    const [text, setText] = useState('haha');
    const product = data[0];
    const { images } = product;

    return (
        <LayoutPrimary host>
            <ScrollToTop />

            <Formik
                initialValues={{
                    name: '',
                    star_level: '3',
                    rate: '2',
                    rule: '',
                    description: '',
                    comment: '',
                    address: {
                        detail_address: '',
                        district: '',
                        province: '',
                    },
                    list_image: [
                        {
                            url: 'ngon.com',
                            type: 'hotel',
                        },
                        {
                            url: 'kongon.com',
                            type: 'user',
                        },
                    ],
                }}
                initialTouched={{
                    field: true,
                }}
                validateOnMount
                validationSchema={Yup.object({})}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    axios
                        .post(`http://103.184.113.181:81/customer/${customer.id}/hotel`, JSON.stringify(values))
                        .then(function (response) {
                            const hotelDataJson = JSON.stringify(response.data.id);
                            localStorage.setItem('hotelData', hotelDataJson);
                            navigate('/AddRooms1', {
                                state: {
                                    value: 'addproperty1',
                                },
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    setTimeout(() => {
                        resetForm({
                            name: '',
                            star_level: '3',
                            rate: '2',
                            rule: '',
                            description: '',
                            comment: '',
                            address: {
                                detail_address: '',
                                district: '',
                                province: '',
                            },
                            list_image: [
                                {
                                    url: 'ngon.com',
                                    type: 'hotel',
                                },
                                {
                                    url: 'kongon.com',
                                    type: 'user',
                                },
                            ],
                        });

                        setSubmitting(false);
                    }, 1000);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} className={cx('sign-up__form')}>
                        <div className={cx('add3-properties')}>
                            <div>
                                {/* <ImageGallery images={images} /> */}
                                <div className={cx('content3-container')}>
                                    <div className={cx('input-container')}>
                                        <h1 className={cx('title')} style={{ fontSize: '2em', marginBottom: '25px' }}>
                                            Add New Property
                                        </h1>
                                        <MyInput
                                            customContainerClasses={cx('custom-container')}
                                            label="Hotel Name"
                                            bold
                                            type="text"
                                            name="name"
                                            className={cx('name')}
                                            placeholder={'Enter your Hotel Name'}
                                        ></MyInput>
                                    </div>
                                    <div className={cx('input-container')}>
                                        <h3>Add Your location.</h3>
                                        <div className={cx('location-input__wrapper')}>
                                            <div className={cx('location-input')}>
                                                <SelectFormik name="address.province" label="Province">
                                                    {cityList.map((i, index) => (
                                                        <option key={index} value={i}>
                                                            {i}
                                                        </option>
                                                    ))}
                                                </SelectFormik>
                                                <SelectFormik name="address.district" label="District">
                                                    <option value="CauGiay">Cau Giay</option>
                                                    <option value="BaDinh">Ba Dinh </option>
                                                    <option value="HoangMai">Hoang Mai</option>
                                                </SelectFormik>
                                            </div>
                                            <div>
                                                {/* <label className={cx("select-type")}>
                            <span className={cx("select_name")}> Address</span>
                            <input
                              type="text"
                              className={cx("input")}
                              placeholder="input"
                              name="address.number"
                            />
                          </label> */}{' '}
                                                <MyInput
                                                    label="Address"
                                                    type="text"
                                                    name="address.detail_address"
                                                    className={cx('name')}
                                                    placeholder={'Enter your address'}
                                                ></MyInput>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className={cx('title')}>Quantity</h3>
                                        <MyInput
                                            customContainerClasses={cx('custom-input')}
                                            className={cx('name', 'name-input')}
                                            name="quantity"
                                            type="number"
                                        ></MyInput>
                                    </div>
                                    <div className={cx('input-container')}>
                                        <h3>Add facilities available at your place.</h3>
                                        <div className={cx('counter-container')}>
                                            <Counter>Pool</Counter>
                                            <Counter>Parking lot</Counter>
                                        </div>
                                    </div>
                                    <div className={cx('input-container')}>
                                        <div>
                                            <h3 style={{ marginBottom: '25px' }}>Add description at your place.</h3>
                                        </div>
                                        <div>
                                            <TextAreaFormik
                                                label="Introduce yourself"
                                                name="description"
                                                placeholder="Enter your introduce"
                                                id="intro"
                                                className={cx('text-area')}
                                            ></TextAreaFormik>
                                        </div>
                                    </div>
                                    <Button type="submit" className={cx('save')} small green>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </LayoutPrimary>
    );
}

export default AddProperties;
