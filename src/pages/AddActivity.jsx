import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddActivity() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    date: '',
    description: '',
    points: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingActivities =
      JSON.parse(localStorage.getItem('newActivities')) || []

    const newActivity = {
      id: Date.now(),
      uid: user.uid,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      description: formData.description,
      claimed: Number(formData.points),
      approved: 0,
      status: 'Pending'
    }

    localStorage.setItem(
      'newActivities',
      JSON.stringify([...existingActivities, newActivity])
    )

    setMessage('Activity submitted successfully.')

    setTimeout(() => {
      navigate('/activities')
    }, 1000)
  }

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Activity Points Management System</h1>
          <p>Add Activity</p>
        </div>

        <Link className="topbar-link" to="/dashboard">
          Dashboard
        </Link>
      </header>

      <main className="page-content">
        <div className="form-page-header">
          <h2>Add New Activity</h2>
          <p>Submit your activity details for approval.</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Activity Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter activity title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Technical">Technical</option>
                  <option value="Professional">Professional</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Social Service">Social Service</option>
                  <option value="Entrepreneurship">
                    Entrepreneurship
                  </option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe your activity"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Points Claimed</label>

              <input
                type="number"
                name="points"
                placeholder="Enter points"
                min="1"
                max="100"
                value={formData.points}
                onChange={handleChange}
                required
              />
            </div>

            {message && <div className="success-message">{message}</div>}

            <div className="form-actions">
              <Link className="secondary-button" to="/activities">
                Cancel
              </Link>

              <button className="primary-button" type="submit">
                Submit Activity
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddActivity