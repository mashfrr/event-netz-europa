import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '@/data/mockEvents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface EventMapProps {
  events: Event[];
}

const EventMap: React.FC<EventMapProps> = ({ events }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Sample coordinates for German cities (you can expand this)
  const cityCoordinates: { [key: string]: [number, number] } = {
    'Berlin': [13.4050, 52.5200],
    'München': [11.5820, 48.1351],
    'Hamburg': [9.9937, 53.5511],
    'Köln': [6.9603, 50.9375],
    'Frankfurt': [8.6821, 50.1109],
    'Stuttgart': [9.1829, 48.7758],
    'Düsseldorf': [6.7735, 51.2277],
    'Dortmund': [7.4653, 51.5136],
    'Essen': [7.0116, 51.4556],
    'Leipzig': [12.3731, 51.3397],
    'Bremen': [8.8017, 53.0793],
    'Dresden': [13.7373, 51.0504],
    'Hannover': [9.7320, 52.3759],
    'Nürnberg': [11.0767, 49.4521],
    'Duisburg': [6.7623, 51.4344],
    'Wien': [16.3738, 48.2082],
    'Zürich': [8.5417, 47.3769],
    'Amsterdam': [4.9041, 52.3676],
    'Brüssel': [4.3517, 50.8503],
    'Paris': [2.3522, 48.8566],
    'London': [0.1278, 51.5074],
    'Rom': [12.4964, 41.9028],
    'Madrid': [3.7038, 40.4168],
    'Warschau': [21.0122, 52.2297],
    'Prag': [14.4378, 50.0755],
    'Budapest': [19.0402, 47.4979],
    'Stockholm': [18.0686, 59.3293],
    'Kopenhagen': [12.5683, 55.6761],
    'Oslo': [10.7522, 59.9139],
    'Helsinki': [24.9384, 60.1699]
  };

  const getCoordinatesForLocation = (location: string): [number, number] => {
    // Try to find exact match first
    if (cityCoordinates[location]) {
      return cityCoordinates[location];
    }
    
    // Try to find partial match
    const partialMatch = Object.keys(cityCoordinates).find(city => 
      location.toLowerCase().includes(city.toLowerCase()) || 
      city.toLowerCase().includes(location.toLowerCase())
    );
    
    if (partialMatch) {
      return cityCoordinates[partialMatch];
    }
    
    // Default to Berlin if no match found
    return cityCoordinates['Berlin'];
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [10.4515, 51.1657], // Center of Germany
      zoom: 5.5
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add event markers
      events.forEach((event, index) => {
        const coordinates = getCoordinatesForLocation(event.location);
        
        // Create a popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-3 max-w-sm">
              <h3 class="font-semibold text-sm mb-2">${event.title}</h3>
              <div class="space-y-1 text-xs text-gray-600">
                <div><strong>Datum:</strong> ${event.date}</div>
                <div><strong>Ort:</strong> ${event.location}</div>
                ${event.cost ? `<div><strong>Kosten:</strong> ${event.cost}</div>` : ''}
                ${event.registrationDeadline ? `<div><strong>Anmeldeschluss:</strong> ${event.registrationDeadline}</div>` : ''}
                <div class="mt-2">
                  <p class="text-xs">${event.description.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          `);

        // Create marker
        const marker = new mapboxgl.Marker({
          color: '#1e3a8a', // Blue color matching the screenshot
        })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    setIsMapInitialized(true);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized && !mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Mapbox Token Required</h3>
        <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
          To display the map, please enter your Mapbox public token. You can get one from{' '}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={initializeMap}
            disabled={!mapboxToken.trim()}
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default EventMap;