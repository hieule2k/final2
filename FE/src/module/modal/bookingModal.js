import CloseIcon from "module/Icons/CloseIcon";
import React from "react";

const BookingModalHeader = ({ closeModal }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-12 ">
        <img src="" alt="" className="w-32 h-20" />
        <div>
          <div>Name:Hotel</div>
          <div>Id booking</div>
          <div>Total Price</div>
        </div>
      </div>
      <i onClick={closeModal}>
        <CloseIcon customclass="hover:bg-black hover:text-white hover:opacity-70 w-12 !h-12 cursor-pointer" />
      </i>
    </div>
  );
};

const BookedRoom = () => {
  const title = ["Room Type", "Room Name", "Duration", "Price", "Quantity"];

  return (
    <div className="flex flex-col">
      <ul className="flex">
        {title.map((item, index) => (
          <li key={index} className="min-w-[20%]">
            {item}
          </li>
        ))}
      </ul>
      <ul className="flex">
        <li className="min-w-[20%]">Single</li>
        <li className="min-w-[20%]">ABCXYZ</li>
        <li className="min-w-[20%]">2/7/2023</li>
        <li className="min-w-[20%]">3000</li>
        <li className="min-w-[20%]">2</li>
      </ul>
    </div>
  );
};

const BookingModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed z-50 flex flex-col justify-between w-3/4 px-12 py-8 bg-white h-3/4">
        <div>
          <BookingModalHeader closeModal={closeModal} />
          <BookedRoom />
          <div className="flex justify-between">
            <div>Total Room:</div>
            <div>9</div>
          </div>
        </div>
        <button className="font-bold text-right" onClick={closeModal}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
