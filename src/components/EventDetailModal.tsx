import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Euro, AlertCircle, ExternalLink, User } from "lucide-react";
import { Event } from "@/data/mockEvents";

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors = {
  social: 'category-social',
  environment: 'category-environment', 
  education: 'category-education',
  community: 'category-community'
};

const categoryLabels = {
  social: 'Soziales',
  environment: 'Umwelt',
  education: 'Bildung',
  community: 'Gemeinschaft'
};

const EventDetailModal = ({ event, isOpen, onClose }: EventDetailModalProps) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge 
              className={`bg-${categoryColors[event.category]} text-white`}
            >
              {categoryLabels[event.category]}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold text-left">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">
            {event.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Datum</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                {event.time && (
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ort</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Organisiert von</p>
                <p className="text-sm text-muted-foreground">{event.organizer}</p>
              </div>
            </div>

            {/* Attendees */}
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Teilnehmer</p>
                <p className="text-sm text-muted-foreground">
                  {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} Teilnehmer
                </p>
              </div>
            </div>

            {/* Registration Deadline */}
            {event.registrationDeadline && (
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Anmeldeschluss</p>
                  <p className="text-sm text-muted-foreground">{event.registrationDeadline}</p>
                </div>
              </div>
            )}

            {/* Cost */}
            {event.cost && (
              <div className="flex items-center space-x-3">
                <Euro className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Kosten</p>
                  <p className="text-sm text-muted-foreground">{event.cost}</p>
                </div>
              </div>
            )}
          </div>

          {/* Restrictions */}
          {event.restrictions && (
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Voraussetzungen</p>
                <p className="text-sm text-muted-foreground">{event.restrictions}</p>
              </div>
            </div>
          )}

          {/* External Link */}
          {event.link && (
            <div className="border-t pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <ExternalLink className="w-5 h-5 text-primary" />
                <p className="font-medium">Weitere Informationen</p>
              </div>
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <p className="text-sm text-primary hover:underline break-all">
                  {event.link}
                </p>
              </a>
            </div>
          )}

          {/* Friends Attending */}
          {event.friendsAttending && event.friendsAttending.length > 0 && (
            <div className="border-t pt-4">
              <p className="font-medium mb-2">Freunde dabei</p>
              <div className="flex flex-wrap gap-2">
                {event.friendsAttending.map((friend, index) => (
                  <Badge key={index} variant="secondary">
                    {friend}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant={event.isRegistered ? "secondary" : "default"} 
              className="flex-1"
            >
              {event.isRegistered ? "Angemeldet ✓" : "Jetzt anmelden"}
            </Button>
            {event.link && (
              <Button 
                variant="outline" 
                onClick={() => window.open(event.link, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Mehr Infos
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;