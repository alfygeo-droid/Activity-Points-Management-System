import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/activities.json`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data.filter((activity) => activity.uid === user.uid))
      })
  }, [user.uid])

  const approvedPoints = activities.reduce(
    (total, activity) => total + activity.approved,
    0
  )

  const remainingPoints = Math.max(user.targetPoints - approvedPoints, 0)

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <div>
          <h1>Activity Points Management System</h1>
          <p>Student Dashboard</p>
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem('user')
            window.location.href = './'
          }}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <section className="welcome-card">
          <div>
            <p className="small-text">Welcome back</p>
            <h2>{user.name}</h2>
            <p>{user.uid}</p>
          </div>

          <div className="student-info">
            <span>{user.department}</span>
            <span>Semester {user.semester}</span>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Approved Points</p>
            <h2>{approvedPoints}</h2>
          </div>

          <div className="stat-card">
            <p>Target Points</p>
            <h2>{user.targetPoints}</h2>
          </div>

          <div className="stat-card">
            <p>Remaining Points</p>
            <h2>{remainingPoints}</h2>
          </div>

          <div className="stat-card">
            <p>Activities</p>
            <h2>{activities.length}</h2>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Recent Activities</h2>
              <Link to="/activities">View All</Link>
            </div>

            {activities.length === 0 ? (
              <p>No activities found.</p>
            ) : (
              <div className="activity-list">
                {activities.slice(0, 4).map((activity) => (
                  <div className="activity-item" key={activity.id}>
                    <div>
                      <h3>{activity.title}</h3>
                      <p>
                        {activity.category} · {activity.date}
                      </p>
                    </div>

                    <div className="activity-points">
                      <strong>{activity.approved}</strong>
                      <span>points</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <h2>Quick Actions</h2>

            <div className="quick-actions">
              <Link to="/add-activity">+ Add Activity</Link>
              <Link to="/activities">View Activities</Link>
              <Link to="/categories">Activity Categories</Link>
              <Link to="/profile">My Profile</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard