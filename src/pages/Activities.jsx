import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Activities() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [activities, setActivities] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/activities.json`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data.filter((activity) => activity.uid === user.uid))
      })
  }, [user.uid])

  const filteredActivities =
    filter === 'All'
      ? activities
      : activities.filter((activity) => activity.category === filter)

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Activity Points Management System</h1>
          <p>Activities</p>
        </div>

        <Link className="topbar-link" to="/dashboard">
          Dashboard
        </Link>
      </header>

      <main className="page-content">
        <div className="page-heading">
          <div>
            <h2>My Activities</h2>
            <p>View all your submitted activities and points.</p>
          </div>

          <Link className="primary-button" to="/add-activity">
            + Add Activity
          </Link>
        </div>

        <div className="filter-bar">
          <label>Filter by Category</label>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Professional">Professional</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Social Service">Social Service</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Leadership">Leadership</option>
          </select>
        </div>

        <div className="activities-table-container">
          <table className="activities-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Date</th>
                <th>Claimed</th>
                <th>Approved</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <strong>{activity.title}</strong>
                    <span className="table-description">
                      {activity.description}
                    </span>
                  </td>

                  <td>
                    <span className="category-badge">
                      {activity.category}
                    </span>
                  </td>

                  <td>{activity.date}</td>
                  <td>{activity.claimed}</td>
                  <td>{activity.approved}</td>

                  <td>
                    <span
                      className={`status-badge ${activity.status
                        .toLowerCase()
                        .replaceAll(' ', '-')}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredActivities.length === 0 && (
            <div className="empty-state">
              <h3>No activities found</h3>
              <p>Try changing the filter or add a new activity.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Activities