import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.css";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
// import data from "../../../json/search.json";
import LayoutPrimary from "layouts/LayoutPrimary";
import SearchField from "components/Search-bar/SearchField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button/Button";
const cx = classNames.bind(styles);
function Search({ handleLike }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate, name } = location.state.item;

  async function fetchData(page) {
    const response = await axios.get(
      `http://103.184.113.181:81/hotels?page=${page}&limit=4&location=${name}&check_in=${startDate}&check_out=${endDate}`
    );
    console.log(response.data.items);
    setTotal(response.data.total_count);
    console.log(response.data.items);
    // setData(response.data.items);
    if (data.length > 0) {
      setData(response.data.items);
    }
    return response.data.items;
  }
  // const handleSearch = (param) => {
  //   if (data.length > 0) {
  //     fetchData(pageNumber).then((hotel) => {
  //       setData(hotel);
  //     });
  //   } else if (data.length === 0) {
  //     navigate("/Search", { state: { item: param } });
  //   }
  // };
  const handleLoadMore = () => {
    fetchData(pageNumber).then((hotel) => {
      const newHotel = [...data, ...hotel];
      setData(newHotel);
      setPageNumber(pageNumber + 1);
    });
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  return (
    <LayoutPrimary>
      <div className={cx("search-wrapper")}>
        <div className={cx("colleft")}>
          <div className={cx("container")}>
            <div className={cx("search-result")}>{total} result found</div>
            <SearchField data={data} setData={setData}></SearchField>
          </div>
          <CardList>
            {data.length > 0 ? (
              data.map((x) => (
                <Card
                  key={x.id}
                  id={x.id}
                  name={x.name}
                  address={x.address ? x.address.province : "not yet"}
                  thumbnail={x.list_image[0].url}
                  handleLike={handleLike}
                ></Card>
              ))
            ) : (
              <div></div>
            )}
          </CardList>
          <Button
            green
            medium
            onClick={() => {
              handleLoadMore();
            }}
          >
            Load More
          </Button>
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Search;
