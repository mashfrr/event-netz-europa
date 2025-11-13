import React, { useState, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface LocationResult {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
  displayName: string;
}

interface LocationSearchProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
  onLocationSelect?: (location: LocationResult) => void;
  disabled?: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  selectedLocation,
  onLocationChange,
  radius,
  onRadiusChange,
  onLocationSelect,
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocationData, setSelectedLocationData] = useState<LocationResult | null>(null);

  // Search cities using OpenStreetMap Nominatim API
  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Use OpenStreetMap Nominatim API for worldwide location search in German
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1&accept-language=de`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      const results: LocationResult[] = data.map((item: any) => {
        const address = item.address || {};
        const name = address.city || address.town || address.village || address.hamlet || item.display_name.split(',')[0];
        const state = address.state || address.region || address.county || '';
        const country = address.country || '';
        
        return {
          name: name,
          state: state,
          country: country,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          displayName: `${name}${state ? `, ${state}` : ''}${country ? `, ${country}` : ''}`
        };
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Location search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCities(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocationData(location);
    onLocationChange(location.displayName);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setSearchTerm('');
    setSearchResults([]);
    // Keep dropdown open to show radius slider
    // setIsOpen(false);
  };

  const handleClearLocation = () => {
    setSelectedLocationData(null);
    onLocationChange('all');
    onRadiusChange(50); // Reset radius to default
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleEditLocation = () => {
    setSelectedLocationData(null);
    setSearchTerm('');
    setSearchResults([]);
    // Keep dropdown open for new search
  };

  const displayText = selectedLocationData 
    ? `${selectedLocationData.name} + ${radius} km` 
    : 'Ort auswählen';

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={disabled ? () => {} : setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] md:w-[250px] text-sm text-left justify-start",
              selectedLocation !== "all" && "border-[#41919C] bg-[#41919C]/10"
            )}
            disabled={disabled}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          {(!selectedLocationData || searchTerm.length > 0) && (
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Stadt oder PLZ suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={disabled}
                />
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {selectedLocationData && searchTerm.length === 0 ? (
              <div 
                className="p-3 text-center text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                onDoubleClick={handleEditLocation}
                title="Doppelklick zum Bearbeiten"
              >
                <div className="font-medium">{selectedLocationData.name}</div>
                <div className="text-xs text-gray-500">{selectedLocationData.state}, {selectedLocationData.country}</div>
              </div>
            ) : isSearching ? (
              <div className="p-3 text-center text-sm text-gray-500">
                Suche...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((location) => (
                <button
                  key={`${location.name}-${location.state}`}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left p-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.state}, {location.country}</div>
                </button>
              ))
            ) : searchTerm.length >= 2 ? (
              <div className="p-3 text-center text-sm text-gray-500">
                Keine Ergebnisse gefunden
              </div>
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">
                Mindestens 2 Zeichen eingeben
              </div>
            )}
          </div>

          {/* Radius Selection - only show when location is selected and not searching */}
          {selectedLocationData && searchTerm.length === 0 && (
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Radius</span>
                <span className="text-sm text-gray-600">{radius} km</span>
              </div>
              <Slider
                value={[radius]}
                onValueChange={(value) => onRadiusChange(value[0])}
                max={200}
                min={5}
                step={5}
                className="w-full"
                disabled={disabled}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 km</span>
                <span>200 km</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full mt-3 bg-[#41919C] hover:bg-[#4A9BA6] text-white"
                size="sm"
              >
                Fertig
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {selectedLocation !== "all" && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
          onClick={handleClearLocation}
          disabled={disabled}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default LocationSearch;
