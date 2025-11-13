import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Euro, Clock, Users, Link } from "lucide-react";
import { toast } from "sonner";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    registrationDeadline: '',
    cost: '',
    restrictions: '',
    link: '',
    description: '',
    category: '',
    organizer: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast.success("Event erfolgreich erstellt!");
    console.log('Event created:', eventData);
  };

  const generateEventText = () => {
    return `${eventData.title}
${eventData.date}
no ${eventData.location}
• ${eventData.registrationDeadline}
§ ${eventData.cost}
{ ${eventData.restrictions}
${eventData.link}`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event erstellen</h1>
          <p className="text-muted-foreground">Teile dein Event mit der Community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Veranstaltungsname *</label>
                <Input
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  placeholder="Name deines Events"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Datum *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={eventData.date}
                      onChange={(e) => setEventData({...eventData, date: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Anmeldung bis *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={eventData.registrationDeadline}
                      onChange={(e) => setEventData({...eventData, registrationDeadline: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ort *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                    placeholder="Veranstaltungsort"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kosten</label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={eventData.cost}
                      onChange={(e) => setEventData({...eventData, cost: e.target.value})}
                      placeholder="z.B. Kostenlos, 10€, Spende"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Kategorie *</label>
                  <Select value={eventData.category} onValueChange={(value) => setEventData({...eventData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Soziales</SelectItem>
                      <SelectItem value="environment">Umwelt</SelectItem>
                      <SelectItem value="education">Bildung</SelectItem>
                      <SelectItem value="community">Gemeinschaft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Einschränkungen</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={eventData.restrictions}
                    onChange={(e) => setEventData({...eventData, restrictions: e.target.value})}
                    placeholder="z.B. Ab 16 Jahren, Begrenzte Teilnehmerzahl"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link zur Anmeldung</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="url"
                    value={eventData.link}
                    onChange={(e) => setEventData({...eventData, link: e.target.value})}
                    placeholder="https://..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <Textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  placeholder="Beschreibe dein Event..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organisator *</label>
                <Input
                  value={eventData.organizer}
                  onChange={(e) => setEventData({...eventData, organizer: e.target.value})}
                  placeholder="Name der Organisation oder Person"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Preview */}
          {eventData.title && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vorschau (Format)</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-line">
                {generateEventText()}
              </div>
            </Card>
          )}

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" variant="accent">
              Event erstellen
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Abbrechen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;