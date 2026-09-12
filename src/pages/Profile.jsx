import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/activities.json`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data.filter((activity) => activity.uid === user.uid))
      })
  }, [user.uid])

  const claimedPoints = activities.reduce(
    (total, activity) => total + activity.claimed,
    0
  )

  const approvedPoints = activities.reduce(
    (total, activity) => total + activity.approved,
    0
  )

  const remainingPoints = Math.max(
    user.targetPoints - approvedPoints,
    0
  )

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Activity Points Management System</h1>
          <p>Student Profile</p>
        </div>

        <Link className="topbar-link" to="/dashboard">
          Dashboard
        </Link>
      </header>

      <main className="page-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2>{user.name}</h2>
            <p>{user.uid}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <h3>Personal Information</h3>

            <div className="profile-info">
              <div>
                <span>Name</span>
                <strong>{user.name}</strong>
              </div>

              <div>
                <span>Student UID</span>
                <strong>{user.uid}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{user.department}</strong>
              </div>

              <div>
                <span>Semester</span>
                <strong>{user.semester}</strong>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Activity Points Summary</h3>

            <div className="profile-stats">
              <div>
                <span>Activities</span>
                <strong>{activities.length}</strong>
              </div>

              <div>
                <span>Claimed Points</span>
                <strong>{claimedPoints}</strong>
              </div>

              <div>
                <span>Approved Points</span>
                <strong>{approvedPoints}</strong>
              </div>

              <div>
                <span>Target Points</span>
                <strong>{user.targetPoints}</strong>
              </div>

              <div>
                <span>Remaining Points</span>
                <strong>{remainingPoints}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3>Quick Links</h3>

          <div className="profile-actions">
            <Link to="/activities">View My Activities</Link>
            <Link to="/add-activity">Add New Activity</Link>
            <Link to="/categories">View Categories</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile