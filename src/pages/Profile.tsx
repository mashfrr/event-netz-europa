import React from 'react';
import { Settings, MapPin, Calendar, Users, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/mockEvents";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Anna Schmidt",
    bio: "Leidenschaftliche Aktivistin für Umweltschutz und Bildung. Gemeinsam können wir die Welt verbessern! 🌱",
    location: "Berlin, Deutschland",
    joinDate: "März 2024",
    avatar: "AS" // initials
  };

  const registeredEvents = mockEvents.filter(event => event.isRegistered);
  const pastEvents = [
    { ...mockEvents[0], date: "10. Aug 2024", isRegistered: true },
    { ...mockEvents[2], date: "5. Aug 2024", isRegistered: true }
  ];

  const friends = [
    { name: "Max Weber", avatar: "MW", mutualEvents: 3 },
    { name: "Lisa Müller", avatar: "LM", mutualEvents: 2 },
    { name: "Tom Berg", avatar: "TB", mutualEvents: 4 },
    { name: "Sarah Klein", avatar: "SK", mutualEvents: 1 }
  ];

  const stats = [
    { label: "Events besucht", value: "12", icon: Calendar },
    { label: "Stunden engagiert", value: "48", icon: Award },
    { label: "Freunde", value: "24", icon: Users },
    { label: "Likes erhalten", value: "89", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-card border border-border rounded-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.avatar}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  Person
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Dabei seit {user.joinDate}</span>
                </div>
              </div>

              {/* Registration Type Selector */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Als Organisation registrieren
                </Button>
                <Button variant="outline" size="sm">
                  Profil bearbeiten
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-card border border-border rounded-lg p-4 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Deine kommenden Events</h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gradient-card border border-border rounded-lg">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Du hast dich noch für keine Events angemeldet.</p>
              <Button variant="accent" className="mt-4">
                Events entdecken
              </Button>
            </div>
          )}
        </section>

        {/* Friends */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Deine Freunde</h2>
            <Button variant="outline" size="sm">Alle anzeigen</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <div key={friend.name} className="bg-gradient-card border border-border rounded-lg p-4 text-center hover:shadow-card transition-all duration-200">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mx-auto mb-3">
                  {friend.avatar}
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{friend.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {friend.mutualEvents} gemeinsame Events
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Vergangene Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="opacity-75">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;