import { useState, useEffect } from 'react'

interface Course {
  id: number
  name: string
  stream: string
  level: string
  duration: string
  feesINR: number
  isActive: boolean
}

export function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual backend call
      // const result = await backend.getCourses(false)
      // setCourses(result)
      setCourses([])
    } catch (err) {
      console.error('Failed to load courses:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading courses...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Courses Management</h2>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          Add Course
        </button>
      </div>
      
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No courses yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Stream: {course.stream}</p>
              <p className="text-sm text-gray-600 mb-2">Level: {course.level}</p>
              <p className="text-sm text-gray-600 mb-4">Fees: ₹{course.feesINR.toLocaleString('en-IN')}</p>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 font-semibold text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
