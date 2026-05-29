// Sample rescue center data for Nepal (Kathmandu, Lalitpur, Bhaktapur, and Pokhara)
// This can be replaced with Firebase Firestore data later

export const rescueCenters = [
  // Kathmandu District
  {
    id: 'ktm-1',
    name: 'Kathmandu Animal Rescue Center',
    address: 'Hattisar, Kathmandu',
    phone: '+977-1-4123456',
    email: 'info@ktmrescue.org',
    hours: '24/7 Emergency',
    services: ['Emergency Response', 'Medical Treatment', 'Rehabilitation', 'Adoption'],
    emergencyAvailable: true,
    lat: 27.7172,
    lng: 85.3240,
    city: 'Kathmandu'
  },
  {
    id: 'ktm-2',
    name: 'Nepal Animal Welfare Organization',
    address: 'Lalitpur Road, Kathmandu',
    phone: '+977-1-4987654',
    email: 'contact@nawo.org',
    hours: '8:00 AM - 6:00 PM',
    services: ['Rescue Operations', 'Veterinary Care', 'Community Programs'],
    emergencyAvailable: true,
    lat: 27.7140,
    lng: 85.3160,
    city: 'Kathmandu'
  },
  {
    id: 'ktm-3',
    name: 'Pashupati Animal Sanctuary',
    address: 'Pashupatinath Area, Kathmandu',
    phone: '+977-1-4456789',
    email: 'sanctuary@animal.org',
    hours: '7:00 AM - 7:00 PM',
    services: ['Sanctuary', 'Education', 'Rescue Support'],
    emergencyAvailable: false,
    lat: 27.7235,
    lng: 85.3520,
    city: 'Kathmandu'
  },

  // Lalitpur District
  {
    id: 'lpt-1',
    name: 'Lalitpur Veterinary Clinic & Rescue',
    address: 'Jawalakhel, Lalitpur',
    phone: '+977-1-5123456',
    email: 'clinic@lalitpur-vet.org',
    hours: '9:00 AM - 5:00 PM',
    services: ['Veterinary Care', 'Animal Rescue', 'Post-Surgery Care'],
    emergencyAvailable: true,
    lat: 27.6870,
    lng: 85.3330,
    city: 'Lalitpur'
  },
  {
    id: 'lpt-2',
    name: 'Community Animal Care Lalitpur',
    address: 'Lubhu, Lalitpur',
    phone: '+977-1-5234567',
    email: 'care@lalitpuranimals.org',
    hours: '10:00 AM - 4:00 PM',
    services: ['Rescue', 'Care', 'Adoption Programs'],
    emergencyAvailable: false,
    lat: 27.6780,
    lng: 85.3270,
    city: 'Lalitpur'
  },

  // Bhaktapur District
  {
    id: 'bhk-1',
    name: 'Bhaktapur Animal Rescue Team',
    address: 'Bhaktapur Durbar Square area',
    phone: '+977-1-6123456',
    email: 'rescue@bhaktapur.org',
    hours: '8:00 AM - 6:00 PM',
    services: ['Rapid Response', 'First Aid', 'Hospital Coordination'],
    emergencyAvailable: true,
    lat: 27.6344,
    lng: 85.8276,
    city: 'Bhaktapur'
  },
  {
    id: 'bhk-2',
    name: 'Heritage Animal Care Center',
    address: 'Tachapal, Bhaktapur',
    phone: '+977-1-6234567',
    email: 'heritage.animal@org',
    hours: '9:00 AM - 5:00 PM',
    services: ['Medical Care', 'Rehabilitation', 'Research'],
    emergencyAvailable: false,
    lat: 27.6320,
    lng: 85.8340,
    city: 'Bhaktapur'
  },

  // Pokhara City
  {
    id: 'pkr-1',
    name: 'Pokhara Animal Rescue Service',
    address: 'Lakeside, Pokhara',
    phone: '+977-61-543210',
    email: 'rescue@pokharaanimals.org',
    hours: '24/7 Emergency',
    services: ['Emergency Response', 'Veterinary Services', 'Sanctuary'],
    emergencyAvailable: true,
    lat: 28.2096,
    lng: 83.9856,
    city: 'Pokhara'
  },
  {
    id: 'pkr-2',
    name: 'Fewa Animal Care',
    address: 'Fewa Area, Pokhara',
    phone: '+977-61-654321',
    email: 'care@fewaanimals.org',
    hours: '8:00 AM - 6:00 PM',
    services: ['Rescue Operations', 'Medical Treatment', 'Community Outreach'],
    emergencyAvailable: false,
    lat: 28.2100,
    lng: 83.9900,
    city: 'Pokhara'
  },
  {
    id: 'pkr-3',
    name: 'Pokhara Wildlife & Domestic Animal Center',
    address: 'Birauta, Pokhara',
    phone: '+977-61-765432',
    email: 'wildlife@pokharacare.org',
    hours: '7:00 AM - 7:00 PM',
    services: ['Wildlife Care', 'Domestic Animal Rescue', 'Education Programs'],
    emergencyAvailable: true,
    lat: 28.2130,
    lng: 83.9700,
    city: 'Pokhara'
  },
  {
    id: 'pkr-4',
    name: 'Himalayan Animal Welfare',
    address: 'Fulbari, Pokhara',
    phone: '+977-61-876543',
    email: 'welfare@himalayan-care.org',
    hours: '9:00 AM - 5:00 PM',
    services: ['Animal Care', 'Rescue Support', 'Veterinary Consultation'],
    emergencyAvailable: false,
    lat: 28.2000,
    lng: 83.9650,
    city: 'Pokhara'
  }
]

// Problem types for reporting
export const animalProblems = [
  { id: 'injured', label: 'Injured' },
  { id: 'sick', label: 'Sick' },
  { id: 'abandoned', label: 'Abandoned' },
  { id: 'abused', label: 'Abused' },
  { id: 'trapped', label: 'Trapped' },
  { id: 'other', label: 'Other' }
]

// Animal types for reporting
export const animalTypes = [
  { id: 'dog', label: 'Dog' },
  { id: 'cat', label: 'Cat' },
  { id: 'bird', label: 'Bird' },
  { id: 'monkey', label: 'Monkey' },
  { id: 'cow', label: 'Cow' },
  { id: 'other', label: 'Other' }
]

// Status options for rescue reports
export const reportStatuses = [
  { id: 'pending', label: 'Pending', color: 'red' },
  { id: 'in-progress', label: 'In Progress', color: 'yellow' },
  { id: 'rescued', label: 'Rescued', color: 'green' },
  { id: 'closed', label: 'Closed', color: 'gray' }
]
