import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SupabaseService } from "@/services/supabaseService";
import { Event } from "@/lib/supabase";
import { ImageGallery } from "@/components/ImageGallery";
const categoryLabels = {
  Education: 'Bildung',
  Erasmus: 'Erasmus'
};
const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const foundEvent = await SupabaseService.getEventById(id);
          setEvent(foundEvent);
        }
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
      
      // Set up auto-refresh every 5 minutes to get latest data
      const interval = setInterval(fetchEvent, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [id]);
  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Event wird geladen...</p>
        </div>
      </div>;
  }

  if (!event) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event nicht gefunden</h1>
          <span 
            onClick={() => navigate('/events')}
            className="cursor-pointer"
          >
            Zurück zu Events
          </span>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="max-w-6xl mx-auto px-8 sm:px-6 md:px-8 pt-6 sm:pt-8">
        <span 
          onClick={() => navigate('/events')} 
          className="mb-6 cursor-pointer flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Events
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-8 sm:px-6 md:px-8 pb-8 sm:pb-12">
        {/* Event Title and Theme */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          
          {event.categories && event.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.categories.map((category, index) => (
                <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Event Images */}
        {event.images && event.images.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Bilder</h3>
            <ImageGallery images={event.images} title={event.title} />
          </div>
        )}

        {/* Description first */}
        {event.description && (
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Beschreibung</h3>
            <p className="text-gray-700 leading-relaxed max-w-none sm:max-w-3xl">{event.description}</p>
          </div>
        )}

        {/* Event Details with Emojis */}
        <div className="space-y-4 text-base sm:text-lg">
          {/* Date Range (Anfang - Ende) */}
          {event.date && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">📅</span>
              <div>
                <span className="font-semibold">Datum: </span>
                <span className="text-gray-700">{event.date}</span>
              </div>
            </div>
          )}

          {/* Registration Deadline */}
          {event.registrationDeadline && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">⏰</span>
              <div>
                <span className="font-semibold">Anmeldefrist: </span>
                <span className="text-gray-700">
                  {new Date(event.registrationDeadline).toLocaleDateString('de-DE', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          )}

          {/* Categories */}
          {event.categories && event.categories.length > 0 && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <span className="font-semibold">Kategorien: </span>
                <span className="text-gray-700">
                  {event.categories.join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Cost */}
          {event.cost && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">💰</span>
              <div>
                <span className="font-semibold">Kosten: </span>
                <span className="text-gray-700">{event.cost} €</span>
              </div>
            </div>
          )}

          {/* Travel Reimbursement */}
          {event.travelReimbursement && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">🚗</span>
              <div>
                <span className="font-semibold">Reisekostenerstattung: </span>
                <span className="text-gray-700">
                  {typeof event.travelReimbursement === 'boolean' 
                    ? (event.travelReimbursement ? 'Ja' : 'Nein')
                    : event.travelReimbursement}
                </span>
              </div>
            </div>
          )}

          {/* Requirements/Restrictions */}
          {event.restrictions && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">🗝</span>
              <div>
                <span className="font-semibold">Beschränkungen: </span>
                <span className="text-gray-700">{event.restrictions}</span>
              </div>
            </div>
          )}

          {/* Organizer */}
          {event.organizer && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">👥</span>
              <div>
                <span className="font-semibold">Veranstalter: </span>
                <span className="text-gray-700">{event.organizer}</span>
              </div>
            </div>
          )}

          {/* Location */}
          {event.location && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">🏠</span>
              <div>
                <span className="font-semibold">Ort: </span>
                <span className="text-gray-700">{event.location}</span>
              </div>
            </div>
          )}

          {/* Link last */}
          {event.link && (
            <div className="flex items-start">
              <span className="text-2xl mr-3">🔗</span>
              <div>
                <span className="font-semibold">Link: </span>
                <a href={event.link} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline break-all">
                  {event.link}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        
      </div>
    </div>;
};
export default EventDetail;