// Firebase Service - Handles all Firebase operations
// NOTE: For MVP, using localStorage. When Firebase is configured, replace these with actual Firebase calls.

/**
 * Initialize Firebase service
 * In production, configure Firebase credentials here
 */
export const initializeFirebase = () => {
  // TODO: Add your Firebase config here
  console.log('Firebase service initialized (using mock storage)')
}

/**
 * Submit a rescue report
 * @param {Object} reportData - Report details
 * @returns {Promise<string>} Report ID
 */
export const submitRescueReport = async (reportData) => {
  try {
    const reports = getRescueReports()
    const newReport = {
      id: Date.now().toString(),
      ...reportData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    reports.push(newReport)
    localStorage.setItem('rescue_reports', JSON.stringify(reports))
    
    return newReport.id
  } catch (error) {
    console.error('Error submitting report:', error)
    throw error
  }
}

/**
 * Get all rescue reports
 * @returns {Array} Array of reports
 */
export const getRescueReports = () => {
  try {
    const reports = localStorage.getItem('rescue_reports')
    return reports ? JSON.parse(reports) : []
  } catch (error) {
    console.error('Error getting reports:', error)
    return []
  }
}

/**
 * Get a specific rescue report by ID
 * @param {string} reportId - Report ID
 * @returns {Object|null} Report data or null
 */
export const getRescueReportById = (reportId) => {
  try {
    const reports = getRescueReports()
    return reports.find(r => r.id === reportId) || null
  } catch (error) {
    console.error('Error getting report:', error)
    return null
  }
}

/**
 * Update rescue report status
 * @param {string} reportId - Report ID
 * @param {string} status - New status (pending, in-progress, rescued, closed)
 * @returns {Promise<void>}
 */
export const updateReportStatus = async (reportId, status) => {
  try {
    const reports = getRescueReports()
    const index = reports.findIndex(r => r.id === reportId)
    
    if (index !== -1) {
      reports[index].status = status
      reports[index].updatedAt = new Date().toISOString()
      localStorage.setItem('rescue_reports', JSON.stringify(reports))
    }
  } catch (error) {
    console.error('Error updating report status:', error)
    throw error
  }
}

/**
 * Delete a rescue report (admin only)
 * @param {string} reportId - Report ID
 * @returns {Promise<void>}
 */
export const deleteRescueReport = async (reportId) => {
  try {
    const reports = getRescueReports()
    const filtered = reports.filter(r => r.id !== reportId)
    localStorage.setItem('rescue_reports', JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting report:', error)
    throw error
  }
}

/**
 * Authenticate rescue team
 * @param {string} email - Team email
 * @param {string} password - Team password
 * @returns {Promise<Object>} Team data if authenticated
 */
export const authenticateRescueTeam = async (email, password) => {
  try {
    const teams = getMockRescueTeams()
    const team = teams.find(t => t.email === email && t.password === password)
    
    if (team) {
      const teamData = { ...team }
      delete teamData.password // Don't return password
      return teamData
    }
    
    return null
  } catch (error) {
    console.error('Error authenticating team:', error)
    return null
  }
}

/**
 * Get mock rescue team data
 * In production, this would come from Firebase
 * @returns {Array} Array of rescue teams
 */
const getMockRescueTeams = () => {
  return [
    {
      id: 'team-1',
      name: 'Kathmandu Animal Rescue Center',
      email: 'rescue1@test.com',
      password: 'password123', // Simple password for MVP - use proper auth in production
      phone: '+977-1-4123456'
    },
    {
      id: 'team-2',
      name: 'Pokhara Animal Care',
      email: 'rescue2@test.com',
      password: 'password123',
      phone: '+977-61-543210'
    },
    {
      id: 'team-3',
      name: 'Lalitpur Veterinary Rescue',
      email: 'rescue3@test.com',
      password: 'password123',
      phone: '+977-1-5123456'
    }
  ]
}

/**
 * Submit contact form
 * @param {Object} contactData - Contact form data
 * @returns {Promise<void>}
 */
export const submitContactForm = async (contactData) => {
  try {
    const contacts = localStorage.getItem('contact_forms')
    const existing = contacts ? JSON.parse(contacts) : []
    
    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      submittedAt: new Date().toISOString()
    }
    
    existing.push(newContact)
    localStorage.setItem('contact_forms', JSON.stringify(existing))
    
    return newContact.id
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

/**
 * Export mock rescue teams for dashboard login
 */
export const mockRescueTeams = getMockRescueTeams()
