import React from "react"
import { useNavigate } from "react-router-dom"

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}
    >
      {restaurant.imageUrl && (
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="restaurant-card-img"
        />
      )}
      <div className="restaurant-card-body">
        <div className="restaurant-card-name">{restaurant.name}</div>
        <div className="restaurant-card-location">{restaurant.address || restaurant.location || ""}</div>
      </div>
    </div>
  )
}

export default RestaurantCard
