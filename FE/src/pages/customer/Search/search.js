import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.css";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
// import data from "../../../json/search.json";
import LayoutPrimary from "layouts/LayoutPrimary";
import SearchField from "components/Search-bar/SearchField";
import axios from "axios";
const cx = classNames.bind(styles);
function Search({ handleLike }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://103.184.113.181:81/hotels?page=1&limit=1&search_field=location&search_value=ha`
      );
      if (response.data.items) {
        setData(response.data.items);
        setTotal(response.data.total_count);
      }
    }
    fetchData();
  }, []);
  return (
    <LayoutPrimary>
      <div className={cx("search-wrapper")}>
        <div className={cx("colleft")}>
          <div className={cx("container")}>
            <div className={cx("search-result")}>{total} result found</div>
            <SearchField></SearchField>
          </div>
          <CardList>
            {data.map((x) => (
              <Card
                key={x.id}
                id={x.id}
                name={x.name}
                address={x.address.province}
                thumbnail={x.list_image[0].url}
                handleLike={handleLike}
              ></Card>
            ))}
          </CardList>
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Search;
