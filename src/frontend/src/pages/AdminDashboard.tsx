import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ContactSubmissions } from '../components/admin/ContactSubmissions'
import { CoursesManagement } from '../components/admin/CoursesManagement'
import { BlogPostsManagement } from '../components/admin/BlogPostsManagement'
import { TestimonialsManagement } from '../components/admin/TestimonialsManagement'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('submissions')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">ICC Admin Panel</h1>
            <p className="text-orange-300 text-sm">India Career Counseling Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'submissions', label: 'Contact Submissions' },
              { id: 'courses', label: 'Courses' },
              { id: 'blog', label: 'Blog Posts' },
              { id: 'testimonials', label: 'Testimonials' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'submissions' && <ContactSubmissions />}
        {activeTab === 'courses' && <CoursesManagement />}
        {activeTab === 'blog' && <BlogPostsManagement />}
        {activeTab === 'testimonials' && <TestimonialsManagement />}
      </main>
    </div>
  )
}
