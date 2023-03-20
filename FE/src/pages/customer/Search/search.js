import React from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.css";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
import data from "../../../json/search.json";
import LayoutPrimary from "layouts/LayoutPrimary";
import SearchField from "components/Search-bar/SearchField";
const cx = classNames.bind(styles);
function Search({ handleLike }) {
  return (
    <LayoutPrimary>
      <div className={cx("search-wrapper")}>
        <div className={cx("colleft")}>
          <div className={cx("container")}>
            <div className={cx("search-result")}>5 result found</div>
            <SearchField></SearchField>
          </div>
          <CardList>
            {data.map((x) => (
              <Card
                key={x.id}
                id={x.id}
                name={x.name}
                address={x.address}
                thumbnail={x.thumbnail}
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
