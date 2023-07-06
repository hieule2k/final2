import axios from 'axios';
import { addToCompare, getAllCompareData, removeFromCompare } from 'features/compare/compareSlice';
import StarIcons from 'module/Icons/StarIcon';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card2 = ({ address, thumbnail, handleLike, id, wishlist, name, star, rate }) => {
    const [data, setData] = useState({
        id,
        name,
        address,
        star,
        rate,
        thumbnail,
    });

    const dispatch = useDispatch();
    const compareData = useSelector(getAllCompareData);
    const isInCompare = compareData.some((e) => e.id === id);
    const itemExist = wishlist ? wishlist.find((exa) => exa.id === data.id) : false;

    const handleCompare = () => {
        if (isInCompare === true) {
            dispatch(removeFromCompare(data));
        } else {
            dispatch(addToCompare(data));
        }
    };

    useEffect(() => {
        const handleFetchRoom = async () => {
            const res = await axios.get(`http://103.184.113.181:82/hotel/${id}/rooms?page=1&limit=10`);
            setData({ ...data, rooms: res.data.items });
        };
        handleFetchRoom();
    }, [data, id, setData]);

    return (
        <div className="relative flex flex-col w-[279px]  shadow-primeShadow rounded">
            <div
                className="absolute text-3xl hover:text-red-400 top-4 right-4"
                onClick={() => {
                    handleLike(data);
                }}
            >
                {itemExist ? (
                    <IconContext.Provider value={{ color: 'red' }}>
                        <AiFillHeart />
                    </IconContext.Provider>
                ) : (
                    <AiOutlineHeart />
                )}
            </div>
            <Link to={`/Details/${id}`} className="">
                <img src={thumbnail} alt="" className="h-[279px]" />
            </Link>
            <div className="px-4 py-2">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="opacity-70">{address}</p>
                <div className="flex justify-between">
                    <div className="flex items-center justify-center gap-1">
                        <StarIcons customclass="text-[#F1C93B]"></StarIcons>
                        <span>{rate}</span>
                    </div>
                    <button onClick={handleCompare}>{isInCompare ? 'Added' : 'Add to Compare'}</button>
                </div>
            </div>
        </div>
    );
};

export default Card2;
