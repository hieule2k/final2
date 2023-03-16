import classNames from "classnames/bind";
import styles from "./ImageGallery.module.css";

const cx = classNames.bind(styles);

function ImageGallery() {
  const list_image = [
    {
      url: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "hotel",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "user",
    },
    {
      url: "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "user",
    },
    {
      url: "https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "user",
    },
    {
      url: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "user",
    },
  ];

  return (
    <div className={cx("gallery")}>
      {list_image.map((image, index) => (
        <div key={index} className={cx("image-gallery")}>
          <img src={image.url} className={cx("image")} alt="noImage" />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
