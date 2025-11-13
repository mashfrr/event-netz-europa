import { useState } from "react";
import { Heart, Users, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/mockEvents";

const ForYou = () => {
  const [activeTab, setActiveTab] = useState<'foryou' | 'friends'>('foryou');
  
  // Mock personalized data
  const recommendedEvents = mockEvents.slice(0, 3);
  const friendsEvents = mockEvents.filter(event => event.friendsAttending && event.friendsAttending.length > 0);
  const trendingEvents = mockEvents.slice(2, 4);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* BeReal-style Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-full p-1 flex">
            <Button
              variant={activeTab === 'foryou' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('foryou')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'foryou' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Für Dich
            </Button>
            <Button
              variant={activeTab === 'friends' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'friends' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Freunde
            </Button>
          </div>
        </div>

        {/* Neue Interessen entdecken - Always on top */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-category-education/10 rounded-lg">
              <Heart className="w-5 h-5 text-category-education" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Neue Interessen entdecken</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Umweltschutz", color: "category-environment", count: 12 },
              { name: "Bildung", color: "category-education", count: 8 },
              { name: "Soziales", color: "category-social", count: 15 },
              { name: "Gemeinschaft", color: "category-community", count: 10 }
            ].map((interest) => (
              <div 
                key={interest.name}
                className="p-4 bg-gradient-card border border-border rounded-lg hover:shadow-card transition-all duration-200 cursor-pointer group"
              >
                <div className={`w-3 h-3 bg-${interest.color} rounded-full mb-2`}></div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {interest.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {interest.count} Events
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'foryou' && (
          <>
            {/* Recommendations */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Empfohlen für dich</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>

            {/* Trending */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-category-social/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-category-social" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Gerade angesagt</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'friends' && (
          <>
            {/* Friends Activity */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Events deiner Freunde</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendsEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>

            {/* Popular among friends */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Beliebt bei deinen Freunden</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {friendsEvents.slice(0, 2).map((event) => (
                  <EventCard key={`popular-${event.id}`} {...event} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ForYou;