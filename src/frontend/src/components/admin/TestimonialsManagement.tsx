import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  studentName: string
  courseStream: string
  achievement: string
  starRating: number
  isFeatured: boolean
  isActive: boolean
}

export function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual backend call
      // const result = await backend.getTestimonials(false, false)
      // setTestimonials(result)
      setTestimonials([])
    } catch (err) {
      console.error('Failed to load testimonials:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading testimonials...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          Add Testimonial
        </button>
      </div>
      
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">{testimonial.studentName}</h3>
                <div className="text-yellow-500 text-sm">{'⭐'.repeat(testimonial.starRating)}</div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Stream: {testimonial.courseStream}</p>
              <p className="text-sm text-gray-600 mb-4">Achievement: {testimonial.achievement}</p>
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
