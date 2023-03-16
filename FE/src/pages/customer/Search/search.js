import React from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.css";
import map from "../../../assets/img/map.jpg";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
import data from "../../../json/search.json";
import Button from "../../../components/Button/Button";
import LayoutPrimary from "layouts/LayoutPrimary";
const cx = classNames.bind(styles);
function Search() {
  return (
    <LayoutPrimary>
      <div className={cx("search-wrapper")}>
        <div className={cx("colleft")}>
          <div className={cx("search-result")}>3 result found</div>
          <CardList column>
            {data.map((x) => (
              <Card
                key={x.id}
                id={x.id}
                name={x.name}
                address={x.address}
                thumbnail={x.thumbnail}
              ></Card>
            ))}
          </CardList>
        </div>
        <div className={cx("colright")}>
          <img src={map} alt="he" className={cx("map")} />
          <Button blue medium className={cx("show-map")}>
            Show On Map
          </Button>
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Search;
