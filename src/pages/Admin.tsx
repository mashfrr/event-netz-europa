import React, { useState, useEffect } from 'react'
import { SupabaseService, Event } from '@/services/supabaseService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Plus, Search } from 'lucide-react'

const Admin = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state for adding/editing events
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    category: 'community' as const,
    attendees: 0,
    max_attendees: undefined as number | undefined,
    registration_deadline: '',
    cost: '',
    restrictions: '',
    link: '',
    application_type: 'anmeldung' as const,
    city: '',
    start_time: '',
    end_time: '',
    travel_reimbursement: '',
    status: 'approved'
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await SupabaseService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async () => {
    try {
      const result = await SupabaseService.createEvent(formData)
      if (result) {
        setEvents([...events, result])
        setShowAddForm(false)
        resetForm()
        alert('Event created successfully!')
      }
    } catch (error) {
      console.error('Failed to create event:', error)
      alert('Failed to create event')
    }
  }

  const handleUpdateEvent = async () => {
    if (!editingEvent) return

    try {
      const result = await SupabaseService.updateEvent(editingEvent.id, formData)
      if (result) {
        setEvents(events.map(e => e.id === editingEvent.id ? result : e))
        setEditingEvent(null)
        resetForm()
        alert('Event updated successfully!')
      }
    } catch (error) {
      console.error('Failed to update event:', error)
      alert('Failed to update event')
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const success = await SupabaseService.deleteEvent(id)
      if (success) {
        setEvents(events.filter(e => e.id !== id))
        alert('Event deleted successfully!')
      }
    } catch (error) {
      console.error('Failed to delete event:', error)
      alert('Failed to delete event')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      category: 'community',
      attendees: 0,
      max_attendees: undefined,
      registration_deadline: '',
      cost: '',
      restrictions: '',
      link: '',
      application_type: 'anmeldung',
      city: '',
      start_time: '',
      end_time: '',
      travel_reimbursement: '',
      status: 'approved'
    })
  }

  const startEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      category: event.category,
      attendees: event.attendees,
      max_attendees: event.max_attendees,
      registration_deadline: event.registration_deadline || '',
      cost: event.cost || '',
      restrictions: event.restrictions || '',
      link: event.link || '',
      application_type: event.application_type || 'anmeldung',
      city: event.city || '',
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      travel_reimbursement: event.travel_reimbursement || '',
      status: event.status || 'approved'
    })
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Management</h1>
        <p className="text-gray-600">Manage your events database</p>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingEvent) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organizer</label>
                <Input
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="Event organizer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  type="date"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  type="date"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Registration Deadline</label>
                <Input
                  type="date"
                  value={formData.registration_deadline}
                  onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cost</label>
                <Input
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="e.g., Free, €50, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="Registration or event URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Travel Reimbursement</label>
                <Input
                  value={formData.travel_reimbursement}
                  onChange={(e) => setFormData({ ...formData, travel_reimbursement: e.target.value })}
                  placeholder="Travel reimbursement info"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Restrictions</label>
              <Textarea
                value={formData.restrictions}
                onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                placeholder="Age restrictions, requirements, etc."
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={editingEvent ? handleUpdateEvent : handleAddEvent}>
                {editingEvent ? 'Update Event' : 'Add Event'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowAddForm(false)
                setEditingEvent(null)
                resetForm()
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <Badge variant={event.status === 'approved' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  <div className="text-sm text-gray-500">
                    <span className="mr-4">📍 {event.location}</span>
                    <span className="mr-4">👤 {event.organizer}</span>
                    <span className="mr-4">📅 {event.start_time}</span>
                    {event.cost && <span>💰 {event.cost}</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(event)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No events found</p>
        </div>
      )}
    </div>
  )
}

export default Admin
