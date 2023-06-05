import axios from "axios";
import Button from "components/Button/Button";
import TextAreaFormik from "components/TextAreaFormik/TextAreaFormik";
import { Field, Formik } from "formik";
import LayoutPrimary from "layouts/LayoutPrimary";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://103.184.113.181:82/hotel/${location.state.id}/rooms?page=1&limit=10`
      )
      .then(function (res) {
        // console.log(res);
        setRooms(res.data.items);
      });
  }, [location.state.id]);
  console.log(rooms);
  const handleFetchAddRoom = async (values) => {
    try {
      if (location.state.update === "notUpdate") {
        const res = await axios.post(
          `http://103.184.113.181:82/hotel/${location.state.id}/room`,
          JSON.stringify(values)
        );
        console.log(res);
      }
      if (location.state.update === "update") {
        const res = await axios.put(
          `http://103.184.113.181:82/room/${location.state.roomId}`,
          JSON.stringify(values)
        );
        console.log(res);
      }

      rooms.length > 0
        ? navigate("/AddRoom", { state: { id: location.state.id } })
        : navigate("/HostProperties");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <LayoutPrimary>
      <Formik
        initialValues={{
          name: "",
          type: "",
          price: 0,
          quantity: 0,
          description: "",
          list_amenity: [],
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          handleFetchAddRoom(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-24 p-24">
              <input
                className="w-1/2 h-24 px-5 py-10 text-2xl font-bold"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label className="flex gap-4 ">
                <p className="text-2xl font-bold">Type Of Room:</p>

                <Field
                  className="text-lg font-semibold"
                  name="type"
                  as="select"
                >
                  <option value="VIP">SINGLE</option>
                  <option value="SINGLE">DOUBLE</option>
                  <option value="DOUBLE">VIP</option>
                </Field>
              </label>

              <label className="flex items-center gap-10">
                <p className="text-2xl font-bold">Price:</p>
                <input
                  type="quantity"
                  className="px-5 py-2 border-gray-400 border-solid focus:border-slate-700"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
              </label>
              <label className="flex items-center gap-10">
                <p className="text-2xl font-bold">Quantity:</p>
                <input
                  type="quantity"
                  className="w-16 px-2 py-2 font-bold border-gray-400 border-solid focus:border-slate-700"
                  name="quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                />
              </label>
              <TextAreaFormik
                name="description"
                placeholder="Enter your introduce"
                id="intro"
              ></TextAreaFormik>
              <button className="w-32 h-12 px-4 py-2 rounded bg-[#98FB98] self-end">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
};

export default AddRoomForm;
