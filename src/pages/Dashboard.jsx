import { useState, useEffect } from 'react'
import { LogOut, MoreVertical, Eye } from 'lucide-react'
import { toast } from 'react-toastify'
import { authenticateRescueTeam, getRescueReports, updateReportStatus, mockRescueTeams } from '../services/firebaseService'
import { reportStatuses } from '../data/rescueCenters'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentTeam, setCurrentTeam] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedTeam = localStorage.getItem('currentRescueTeam')
    if (savedTeam) {
      const team = JSON.parse(savedTeam)
      setCurrentTeam(team)
      setIsLoggedIn(true)
      loadReports()
    }
  }, [])

  // Load rescue reports
  const loadReports = () => {
    const allReports = getRescueReports()
    setReports(allReports)
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please enter email and password')
      return
    }

    setLoading(true)

    try {
      const team = await authenticateRescueTeam(loginForm.email, loginForm.password)
      
      if (team) {
        setCurrentTeam(team)
        setIsLoggedIn(true)
        localStorage.setItem('currentRescueTeam', JSON.stringify(team))
        toast.success(`Welcome, ${team.name}!`)
        setLoginForm({ email: '', password: '' })
        loadReports()
      } else {
        toast.error('Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentTeam(null)
    localStorage.removeItem('currentRescueTeam')
    setLoginForm({ email: '', password: '' })
    setReports([])
    toast.success('Logged out successfully')
  }

  // Handle status update
  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus)
      loadReports()
      setSelectedReport(null)
      toast.success('Report status updated')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchStatus = !filterStatus || report.status === filterStatus
    const matchSearch = !searchQuery || 
      report.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.animalType.includes(searchQuery)
    
    return matchStatus && matchSearch
  })

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-2 text-neutral-900">Rescue Team</h1>
            <p className="text-center text-neutral-600 mb-8">Dashboard Login</p>

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="input-field"
                  placeholder="rescue@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="input-field"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-2 font-bold"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm font-medium text-blue-900 mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-sm text-blue-700">
                {mockRescueTeams.slice(0, 2).map(team => (
                  <div key={team.id}>
                    <p><strong>Email:</strong> {team.email}</p>
                    <p><strong>Password:</strong> {team.password}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard Page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Rescue Dashboard</h1>
          <p className="text-neutral-600">Welcome, <strong>{currentTeam?.name}</strong></p>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-3xl font-bold text-primary-600">{reports.length}</p>
          <p className="text-neutral-600">Total Reports</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-600">{reports.filter(r => r.status === 'pending').length}</p>
          <p className="text-neutral-600">Pending</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-600">{reports.filter(r => r.status === 'in-progress').length}</p>
          <p className="text-neutral-600">In Progress</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{reports.filter(r => r.status === 'rescued').length}</p>
          <p className="text-neutral-600">Rescued</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            placeholder="Search by reporter name or animal type..."
          />
        </div>
        <div className="flex-1">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            {reportStatuses.map(status => (
              <option key={status.id} value={status.id}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card overflow-x-auto">
        {filteredReports.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-bold text-neutral-700">ID</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Animal</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Problem</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Reporter</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Location</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Status</th>
                <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => {
                const statusInfo = reportStatuses.find(s => s.id === report.status)
                return (
                  <tr key={report.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm text-neutral-600">{report.id.slice(0, 8)}...</td>
                    <td className="py-3 px-4 text-sm font-medium text-neutral-900 capitalize">{report.animalType}</td>
                    <td className="py-3 px-4 text-sm text-neutral-600 capitalize">{report.problemType}</td>
                    <td className="py-3 px-4 text-sm text-neutral-600">{report.reporterName}</td>
                    <td className="py-3 px-4 text-sm text-neutral-600">{report.location || `${report.latitude?.toFixed(3)}, ${report.longitude?.toFixed(3)}`}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-${statusInfo?.color}-700 bg-${statusInfo?.color}-100`}>
                        {statusInfo?.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-600">No rescue reports found</p>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-900">Report Details</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-neutral-500 hover:text-neutral-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Animal Information */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900">Animal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Animal Type</p>
                    <p className="text-neutral-900 capitalize">{selectedReport.animalType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Problem Type</p>
                    <p className="text-neutral-900 capitalize">{selectedReport.problemType}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-neutral-600 mb-1">Description</p>
                  <p className="text-neutral-900 bg-neutral-50 p-3 rounded">{selectedReport.description}</p>
                </div>
              </div>

              {/* Reporter Information */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900">Reporter Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Name</p>
                    <p className="text-neutral-900">{selectedReport.reporterName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Email</p>
                    <a href={`mailto:${selectedReport.reporterEmail}`} className="text-primary-600 hover:text-primary-700">
                      {selectedReport.reporterEmail}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Phone</p>
                    <p className="text-neutral-900">{selectedReport.reporterPhone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900">Location</h3>
                <p className="text-neutral-900">{selectedReport.location}</p>
                <p className="text-sm text-neutral-600 mt-1">
                  Coordinates: {selectedReport.latitude?.toFixed(4)}, {selectedReport.longitude?.toFixed(4)}
                </p>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900">Update Status</h3>
                <div className="flex gap-2 flex-wrap">
                  {reportStatuses.map(status => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusUpdate(selectedReport.id, status.id)}
                      disabled={selectedReport.status === status.id}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedReport.status === status.id
                          ? `bg-${status.color}-500 text-white`
                          : `bg-${status.color}-100 text-${status.color}-700 hover:bg-${status.color}-200`
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timestamps */}
              <div className="text-sm text-neutral-600 border-t border-neutral-200 pt-4">
                <p>Submitted: {new Date(selectedReport.createdAt).toLocaleString()}</p>
                {selectedReport.updatedAt && (
                  <p>Last updated: {new Date(selectedReport.updatedAt).toLocaleString()}</p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedReport(null)}
                className="btn-ghost w-full py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
