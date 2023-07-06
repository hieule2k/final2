import { getAllCompareData } from "features/compare/compareSlice";
import LayoutPrimary from "layouts/LayoutPrimary";
import React from "react";
import { useSelector } from "react-redux";

const Compare = () => {
  const compareData = useSelector(getAllCompareData);
  return (
    <LayoutPrimary>
      <div className="px-10 py-10">
        <h1 className="mb-12 text-3xl font-bold">The comparison of hotels</h1>
        <table className="table-auto ">
          <thead>
            <tr>
              <th>Titlle</th>
              {compareData.map((item) => (
                <th key={item.id}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Review and rating</td>
              {compareData.map((item) => (
                <td key={item.id}>{item.rate}</td>
              ))}
            </tr>
            <tr>
              <td>Star level</td>
              {compareData.map((item) => (
                <td key={item.id}>{item.star}</td>
              ))}
            </tr>
            <tr>
              <td>Address</td>
              {compareData.map((item) => (
                <td key={item.id}>{item.address}</td>
              ))}
            </tr>
            <tr>
              <td>Room Vip</td>
              {compareData.map((item) => {
                const vipRoom = item.rooms.find((room) => room.type === "VIP");
                return <td key={item.id}>{vipRoom.price}</td>;
              })}
            </tr>
            <tr>
              <td>Room Single</td>
              {compareData.map((item) => {
                const singleRoom = item.rooms.find(
                  (room) => room.type === "Single"
                );
                return <td key={item.id}>{singleRoom.price}</td>;
              })}
            </tr>
            <tr>
              <td>Room Double</td>
              {compareData.map((item) => {
                const doubleRoom = item.rooms.find(
                  (room) => room.type === "Double"
                );
                return <td key={item.id}>{doubleRoom.price}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </LayoutPrimary>
  );
};

export default Compare;
