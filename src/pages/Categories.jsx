import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/categories.json`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, [])

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Activity Points Management System</h1>
          <p>Activity Categories</p>
        </div>

        <Link className="topbar-link" to="/dashboard">
          Dashboard
        </Link>
      </header>

      <main className="page-content">
        <div className="page-heading">
          <div>
            <h2>Activity Categories</h2>
            <p>Explore the different categories of activities.</p>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <div className="category-icon">{category.icon}</div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <Link to="/add-activity">Add Activity →</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Categories