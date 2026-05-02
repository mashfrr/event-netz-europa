import { Calendar, MapPin, Users, Clock, Euro, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { differenceInDays, parseISO, startOfDay } from "date-fns";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'social' | 'environment' | 'education' | 'community';
  attendees: number;
  maxAttendees?: number;
  image?: string;
  images?: string[];
  friendsAttending?: string[];
  isRegistered?: boolean;
  registrationDeadline?: string;
  cost?: string;
  restrictions?: string;
  link?: string;
  categories?: string[];
  onClick?: () => void;
}


const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  organizer,
  category,
  attendees,
  maxAttendees,
  images,
  friendsAttending = [],
  isRegistered = false,
  registrationDeadline,
  cost,
  restrictions,
  link,
  categories = [],
  onClick
}: EventCardProps) => {
  const navigate = useNavigate();
  
  // Check if registration deadline is within next 5 days
  const isDeadlineNear = () => {
    if (!registrationDeadline) return false;
    
    try {
      // Parse the German date format (e.g., "29.09.2025")
      const deadlineStr = registrationDeadline.replace(/(\d+)\.(\d+)\.(\d+)/, '$3-$2-$1');
      const deadline = startOfDay(parseISO(deadlineStr));
      const today = startOfDay(new Date());
      const daysUntilDeadline = differenceInDays(deadline, today);
      
      return daysUntilDeadline >= 0 && daysUntilDeadline <= 5;
    } catch {
      return false;
    }
  };

  // Get remaining days for registration deadline
  const getRemainingDays = () => {
    if (!registrationDeadline) return null;
    
    try {
      // Parse the German date format (e.g., "29.09.2025")
      const deadlineStr = registrationDeadline.replace(/(\d+)\.(\d+)\.(\d+)/, '$3-$2-$1');
      const deadline = startOfDay(parseISO(deadlineStr));
      const today = startOfDay(new Date());
      const daysUntilDeadline = differenceInDays(deadline, today);
      
      return daysUntilDeadline >= 0 ? daysUntilDeadline : null;
    } catch {
      return null;
    }
  };

  const handleClick = () => {
    navigate(`/event/${id}`);
    if (onClick) onClick();
  };
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100"
      onClick={handleClick}
    >
      {/* Content */}
      <div className="p-3">
        {/* Registration deadline warning - above title, left aligned */}
        {isDeadlineNear() && (
          <div className="mb-2 flex items-center justify-start">
            <div className="flex items-center bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              <AlertCircle className="w-3 h-3 mr-1" />
              {(() => {
                const remainingDays = getRemainingDays();
                if (remainingDays === 0) {
                  return "Letzter Tag zur Anmeldung!";
                } else if (remainingDays === 1) {
                  return "Noch 1 Tag zur Anmeldung!";
                } else {
                  return `Noch ${remainingDays} Tage zur Anmeldung!`;
                }
              })()}
            </div>
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-sm font-medium text-black mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Event Details */}
        <div className="space-y-1">
          {/* Date */}
          <div className="flex items-center text-xs text-black">
            <span className="mr-1.5">📅</span>
            <span>{date}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-xs text-black">
            <span className="mr-1.5">📍</span>
            <span>{location}</span>
          </div>

          {/* Cost - Always show price information */}
          <div className="flex items-center text-xs text-black">
            <span className="mr-1.5">💰</span>
            <span>{cost || 'Preis auf Anfrage'}</span>
          </div>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex items-center text-xs text-black">
              <span className="mr-1.5">🎯</span>
              <span>{categories.join(', ')}</span>
            </div>
          )}

          {/* Restrictions/Requirements */}
          {restrictions && (
            <div className="flex items-center text-xs text-black">
              <span className="mr-1.5">👥</span>
              <span>{restrictions}</span>
            </div>
          )}

          {/* Registration Deadline */}
          {registrationDeadline && (
            <div className="flex items-center text-xs text-black">
              <span className="mr-1.5">⏰</span>
              <span>{registrationDeadline}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;