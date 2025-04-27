import React, { useContext, useEffect, useState } from "react";
import "./Menu.css"; // Import file CSS
import { getFoodList } from "../../api/api";
import { BookingContext } from "../Context";

const MenuItem = ({ item }) => {
  const { order, setOrder, fandb, setFandB } = useContext(BookingContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedQuantityItem = fandb.find((f) => f.id === item._id);
    if (savedQuantityItem) {
      setQuantity(savedQuantityItem.quantity);
    }
  }, [item._id, fandb]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [itemId]: { quantity: newQuantity, price: item.price, name: item.name },
    }));

    setFandB((prevFandB) => {
      const existingItemIndex = prevFandB.findIndex((f) => f.id === itemId);

      if (newQuantity > 0) {
        if (existingItemIndex !== -1) {
          const updatedFandB = [...prevFandB];
          updatedFandB[existingItemIndex].quantity = newQuantity;
          updatedFandB[existingItemIndex].name = item.name;
          updatedFandB[existingItemIndex].price = item.price;
          updatedFandB[existingItemIndex].image = item.img; // Thêm ảnh vào
          return updatedFandB;
        } else {
          return [
            ...prevFandB,
            { 
              id: itemId, 
              quantity: newQuantity, 
              name: item.name, 
              price: item.price,
              image: item.img // Thêm ảnh vào
            },
          ];
        }
      } else {
        if (existingItemIndex !== -1) {
          const updatedFandB = [...prevFandB];
          updatedFandB.splice(existingItemIndex, 1);
          return updatedFandB;
        }
      }

      return prevFandB;
    });
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantityChange(item._id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleQuantityChange(item._id, newQuantity);
    }
  };

  return (
    <div className="item-container">
      <img src={item.img} alt={item.name} className="item-image" />
      <h4>{item.name}</h4>
      <p>{item.price} VNĐ</p>
      <div className="quantity-control">
        <button onClick={handleDecrease} className="button">-</button>
        <span style={{ fontSize: "15px", color: "white" }}>{quantity}</span>
        <button onClick={handleIncrease} className="button">+</button>
      </div>
    </div>
  );
};

const Menu = () => {
  const [menuData, setMenuData] = useState({
    bapNuoc: [],
    nuocUong: [],
    snack: [],
  });
  const { fandb, setFandB } = useContext(BookingContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFoodList();
        const allData = response;
        console.log(allData);

        const bapNuoc = allData.filter((item) => item.category === "Bắp nước");
        const nuocUong = allData.filter((item) => item.category === "Nước uống");
        const snack = allData.filter((item) => item.category === "Snack");

        setMenuData({ bapNuoc, nuocUong, snack });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="menu-container">
      {/* Bắp nước */}
      <div>
        <h3 className="section-text">Bắp nước</h3>
        <div className="items-row">
          {menuData.bapNuoc.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Nước uống */}
      <div>
        <h3 className="section-text">Nước uống</h3>
        <div className="items-row">
          {menuData.nuocUong.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Snack */}
      <div>
        <h3 className="section-text">Snack</h3>
        <div className="items-row">
          {menuData.snack.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
