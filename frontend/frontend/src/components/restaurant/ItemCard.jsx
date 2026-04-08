import React from "react";

const ItemCard = ({
  item,
  context = "restaurant", 
  cartItems,
  onAdd,
  onRemove,
}) => {
  const cartItem = cartItems.find(
    (ci) => ci.menuItemId === item.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    onAdd(item);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      onRemove(item);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 mb-3 rounded-xl shadow">

      <div className="flex items-center gap-4">
        {context === "restaurant" && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}

        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">₹{item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">

        <button
          onClick={handleRemove}
          disabled={quantity === 0}
          className="px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          -
        </button>

        <span className="w-6 text-center font-medium">
          {quantity}
        </span>

        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>

      </div>
    </div>
  );
};

export default ItemCard;