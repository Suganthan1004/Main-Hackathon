import React from "react"
import { useNavigate } from "react-router-dom"

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}
    >
      <div className="restaurant-card-body">
        <div className="restaurant-card-name">{restaurant.name}</div>
        <div className="restaurant-card-location">{restaurant.location}</div>
      </div>
    </div>
  )
}

export default RestaurantCard
