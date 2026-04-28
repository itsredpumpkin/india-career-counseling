import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

interface ContactSubmission {
  id: number
  name: string
  phone: string
  email: string
  courseInterested: string
  message: string
  submittedAt: number
  isRead: boolean
}

export function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual backend call once bindings are generated
      // const result = await backend.getContactSubmissions(token)
      // setSubmissions(result)
      setSubmissions([])
    } catch (err) {
      console.error('Failed to load submissions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading submissions...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Form Submissions</h2>
      
      {submissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No submissions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.courseInterested}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      submission.isRead
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
