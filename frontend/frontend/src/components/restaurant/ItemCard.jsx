import React from "react"

const ItemCard = ({ item, quantity, onAdd, onRemove, context = "restaurant" }) => {
  const showImage = context === "restaurant"

  if (quantity === 0) {
    // not added yet, show add button
    return (
      <div className="item-card">
        <div className="item-card-left">
          {showImage && item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="item-card-img" />
          )}
          <div>
            <div className="item-card-name">{item.name}</div>
            <div className="item-card-price">₹{item.price}</div>
          </div>
        </div>
        <div className="item-card-right">
          <button className="add-btn" onClick={() => onAdd(item)}>Add</button>
        </div>
      </div>
    )
  }

  // already added, show quantity controls
  return (
    <div className="item-card">
      <div className="item-card-left">
        {showImage && item.imageUrl && (
          <img src={item.imageUrl} alt={item.name} className="item-card-img" />
        )}
        <div>
          <div className="item-card-name">{item.name}</div>
          <div className="item-card-price">₹{item.price}</div>
        </div>
      </div>
      <div className="item-card-right">
        <button className="qty-btn qty-btn-minus" onClick={() => onRemove(item)}>−</button>
        <span className="qty-count">{quantity}</span>
        <button className="qty-btn qty-btn-plus" onClick={() => onAdd(item)}>+</button>
      </div>
    </div>
  )
}

export default ItemCard