import React, { useState, useEffect } from "react"
import { getAllRestaurants } from "../services/restaurantService"
import RestaurantCard from "../components/restaurant/RestaurantCard"
import SearchBar from "../components/restaurant/SearchBar"

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    setLoading(true)
    try {
      const data = await getAllRestaurants()
      setRestaurants(data)
      setFiltered(data)
    } catch (err) {
      setError("Failed to load restaurants")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFiltered(restaurants)
      return
    }
    const results = restaurants.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(results)
  }

  if (loading) return <p className="loading-text">Loading restaurants...</p>
  if (error) return <p className="msg-error">{error}</p>

  return (
    <div>
      <h2 className="page-title">Restaurants</h2>
      <div style={{ marginBottom: "1.5rem" }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search restaurants..."
        />
      </div>
      {filtered.length === 0 ? (
        <p className="empty-state">No restaurants found</p>
      ) : (
        <div className="restaurant-grid">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage