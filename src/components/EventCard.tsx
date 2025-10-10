import { Calendar, MapPin, Users, Clock, Euro, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { differenceInDays, parseISO } from "date-fns";
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
  onClick
}: EventCardProps) => {
  const navigate = useNavigate();
  
  // Check if registration deadline is within next 3 days
  const isDeadlineNear = () => {
    if (!registrationDeadline) return false;
    
    try {
      // Parse the German date format (e.g., "29.09.2025")
      const deadlineStr = registrationDeadline.replace(/(\d+)\.(\d+)\.(\d+)/, '$3-$2-$1');
      const deadline = parseISO(deadlineStr);
      const today = new Date();
      const daysUntilDeadline = differenceInDays(deadline, today);
      
      return daysUntilDeadline >= 0 && daysUntilDeadline <= 3;
    } catch {
      return false;
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
      {/* Image with notification badge */}
      <div className="relative">
        <div className="w-full h-40 md:h-32 bg-gray-200 flex items-center justify-center overflow-hidden">
          {images && images.length > 0 ? (
            <img 
              src={images[0]} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Placeholder for event image */
            <div className="w-16 h-16 bg-yellow-300 rounded-full opacity-80"></div>
          )}
        </div>
        
        {/* Notification badge - only show if deadline is within 3 days */}
        {isDeadlineNear() && (
          <div className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
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

          {/* Cost */}
          {cost && (
            <div className="flex items-center text-xs text-black">
              <span className="mr-1.5">💰</span>
              <span>{cost}</span>
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