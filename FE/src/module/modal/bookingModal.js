import CloseIcon from "module/Icons/CloseIcon";
import React from "react";

const BookingModalHeader = ({ closeModal, img, item }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-12 ">
        <img src={img} alt="" className="w-32 h-20" />
        <div>
          <div>Name:{item.hotel.name}</div>
          <div>Booking id: {item.id}</div>
          <div>Total Price: {item.total_price}$</div>
        </div>
      </div>
      <i onClick={closeModal}>
        <CloseIcon customclass="hover:bg-black hover:text-white hover:opacity-70 w-12 !h-12 cursor-pointer" />
      </i>
    </div>
  );
};

const BookedRoom = ({ bookedroom }) => {
  const title = ["Room Type", "Room Name", "Duration", "Price", "Quantity"];
  console.log(bookedroom);

  const handleDuration = (day) => {
    const newData = day.split(" ");
    return newData[0];
  };

  return (
    <div className="flex flex-col">
      <ul className="flex">
        {title.map((item, index) => (
          <li key={index} className="min-w-[20%]">
            {item}
          </li>
        ))}
      </ul>

      {bookedroom.map((item) => (
        <ul className="flex mt-4">
          <li className="min-w-[20%]">{item.room.type}</li>
          <li className="min-w-[20%]">{item.room.name}</li>
          <li className="min-w-[20%]">
            from {handleDuration(item.check_in)}
            <br /> to {handleDuration(item.check_out)}
          </li>
          <li className="min-w-[20%]">{item.room.price}$</li>
          <li className="min-w-[20%]">2</li>
        </ul>
      ))}
    </div>
  );
};

const BookingModal = ({ closeModal, item }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed z-50 flex flex-col justify-between w-3/4 px-12 py-8 bg-white h-3/4">
        <div>
          <BookingModalHeader
            closeModal={closeModal}
            item={item}
            img={item.hotel.list_image[0].url}
          />
          <BookedRoom bookedroom={item.bookedroom} />
          <div className="flex justify-between">
            <div>Total Room:</div>
            <div className="pr-[160px]">{item.bookedroom.length}</div>
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
