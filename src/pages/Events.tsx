import { useState, useEffect } from "react";
import { Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EventCard from "@/components/EventCard";
import LocationSearch from "@/components/LocationSearch";

import { SupabaseService } from "@/services/supabaseService";
import { Event } from "@/lib/supabase";
import { DateRange } from "react-day-picker";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [costRange, setCostRange] = useState<number[]>([0, 500]);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedLocationCoords, setSelectedLocationCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locationRadius, setLocationRadius] = useState<number>(50);
  const [selectedRegistration, setSelectedRegistration] = useState<DateRange | undefined>();
  const [reimbursement, setReimbursement] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const supabaseEvents = await SupabaseService.getEvents();
        setEvents(supabaseEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const themes = [
    { id: 'all', label: 'Alle Themen' },
    { id: 'education', label: 'Bildung' },
    { id: 'erasmus', label: 'Erasmus' },
    { id: 'personal', label: 'Persönlichkeitsentwicklung' },
    { id: 'politics', label: 'Politik' },
    { id: 'social-impact', label: 'Social Impact' },
    { id: 'technology', label: 'Technologie/Innovation' },
    { id: 'environment', label: 'Umwelt/Nachhaltigkeit' },
    { id: 'business', label: 'Wirtschaft/Unternehmertum' }
  ];

  const reimbursementOptions = [
    { id: 'all', label: 'Alle' },
    { id: 'yes', label: 'Mit Erstattung' },
    { id: 'no', label: 'Ohne Erstattung' }
  ];

  // Helper function to format dates consistently 
  const formatEventDate = (dateStr: string) => {
    // If already in dd.mm.yyyy format, return as is
    if (dateStr.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/)) {
      return dateStr;
    }
    
    // Parse German month names and convert to dd.mm.yyyy
    try {
      const date = new Date(dateStr.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
        const months: { [key: string]: string } = {
          'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
          'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
        };
        return `${year}-${months[month]}-${day.padStart(2, '0')}`;
      }));
      
      return format(date, "dd.MM.yyyy");
    } catch {
      return dateStr; // Return original if parsing fails
    }
  };

  const locations = Array.from(new Set(events.map(event => event.city).filter(Boolean))).sort();

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Cache for city coordinates to avoid repeated API calls
  const [cityCoordinatesCache, setCityCoordinatesCache] = useState<{ [key: string]: { lat: number; lon: number } }>({});

  // Get city coordinates using OpenStreetMap Nominatim API
  const getCityCoordinates = async (city: string): Promise<{ lat: number; lon: number } | null> => {
    // Check cache first
    if (cityCoordinatesCache[city]) {
      return cityCoordinatesCache[city];
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1&addressdetails=1&accept-language=de`
      );
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      
      if (data.length > 0) {
        const coords = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
        
        // Cache the result
        setCityCoordinatesCache(prev => ({
          ...prev,
          [city]: coords
        }));
        
        return coords;
      }
    } catch (error) {
      console.error('Error fetching coordinates for city:', city, error);
    }
    
    return null;
  };

  // Load coordinates for selected location
  useEffect(() => {
    const loadSelectedLocationCoords = async () => {
      if (selectedLocation !== 'all') {
        const coords = await getCityCoordinates(selectedLocation.split(',')[0].trim());
        setSelectedLocationCoords(coords);
      } else {
        setSelectedLocationCoords(null);
      }
    };
    
    loadSelectedLocationCoords();
  }, [selectedLocation]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedTheme([]);
    setCostRange([0, 500]);
    setSelectedDate(undefined);
    setSelectedLocation("all");
    setSelectedLocationCoords(null);
    setLocationRadius(50);
    setSelectedRegistration(undefined);
    setReimbursement("all");
    setSortBy("date");
  };

  const hasActiveFilters = () => {
    return searchTerm !== "" || 
           selectedTheme.length > 0 || 
           (costRange[0] !== 0 || costRange[1] !== 500) ||
           selectedDate !== undefined ||
           selectedLocation !== "all" ||
           selectedRegistration !== undefined ||
           reimbursement !== "all" ||
           sortBy !== "date";
  };

  const filteredEvents = events.filter(event => {
    // Filter out events where registration deadline has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    if (event.registrationDeadline) {
      const parseGermanDate = (dateStr: string) => {
        // Handle dd.mm.yyyy format
        if (dateStr.includes('.')) {
          const parts = dateStr.split('.');
          if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
          }
        }
        // Handle German month names
        return new Date(dateStr.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
          const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
            'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
          };
          return `${year}-${months[month]}-${day.padStart(2, '0')}`;
        }));
      };
      
      const deadline = parseGermanDate(event.registrationDeadline);
      deadline.setHours(23, 59, 59, 999); // Set to end of day for deadline comparison
      
      if (deadline < today) {
        return false; // Skip events with passed registration deadline
      }
    }
    
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme.length === 0 || selectedTheme.includes(event.category);
    
    // Cost filter with price range
    const eventCostValue = (!event.cost || event.cost === 'Kostenlos') ? 0 : 
      parseInt(event.cost.replace(/[^\d]/g, '')) || 0;
    const matchesCost = eventCostValue >= costRange[0] && eventCostValue <= costRange[1];
    
    // Location filter with radius support
    let matchesLocation = true;
    if (selectedLocation !== 'all' && selectedLocationCoords) {
      // Extract city name from selectedLocation (format: "City, State, Country")
      const selectedCityName = selectedLocation.split(',')[0].trim();
      
      // If it's an exact city match, use that
      if (event.city === selectedCityName) {
        matchesLocation = true;
      } else {
        // Check if event city is within radius of selected location
        const eventCoords = cityCoordinatesCache[event.city];
        
        if (eventCoords) {
          const distance = calculateDistance(
            selectedLocationCoords.lat, selectedLocationCoords.lon,
            eventCoords.lat, eventCoords.lon
          );
          matchesLocation = distance <= locationRadius;
        } else {
          // Fallback to exact match if coordinates not available
          matchesLocation = event.city === selectedCityName;
        }
      }
    }
    
    // Reimbursement filter (assuming it's part of event data or cost info)
    const matchesReimbursement = reimbursement === 'all' || 
      (reimbursement === 'yes' && event.cost?.includes('Erstattung')) ||
      (reimbursement === 'no' && !event.cost?.includes('Erstattung'));
    
    // Date filter
    let matchesDate = true;
    if (selectedDate && (selectedDate.from || selectedDate.to)) {
      const parseGermanDate = (dateStr: string) => {
        // Handle dd.mm.yyyy format
        if (dateStr.includes('.')) {
          const parts = dateStr.split('.');
          if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
          }
        }
        // Handle German month names  
        return new Date(dateStr.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
          const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
            'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
          };
          return `${year}-${months[month]}-${day.padStart(2, '0')}`;
        }));
      };
      
      const eventDate = parseGermanDate(event.date);
      
      if (selectedDate.from && selectedDate.to) {
        matchesDate = eventDate >= selectedDate.from && eventDate <= selectedDate.to;
      } else if (selectedDate.from) {
        matchesDate = eventDate >= selectedDate.from;
      } else if (selectedDate.to) {
        matchesDate = eventDate <= selectedDate.to;
      }
    }
    
    // Registration deadline filter
    let matchesRegistration = true;
    if (selectedRegistration && (selectedRegistration.from || selectedRegistration.to) && event.registrationDeadline) {
      const parseGermanDate = (dateStr: string) => {
        // Handle dd.mm.yyyy format
        if (dateStr.includes('.')) {
          const parts = dateStr.split('.');
          if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
          }
        }
        // Handle German month names
        return new Date(dateStr.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
          const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
            'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
          };
          return `${year}-${months[month]}-${day.padStart(2, '0')}`;
        }));
      };
      
      const deadline = parseGermanDate(event.registrationDeadline);
      
      if (selectedRegistration.from && selectedRegistration.to) {
        matchesRegistration = deadline >= selectedRegistration.from && deadline <= selectedRegistration.to;
      } else if (selectedRegistration.from) {
        matchesRegistration = deadline >= selectedRegistration.from;
      } else if (selectedRegistration.to) {
        matchesRegistration = deadline <= selectedRegistration.to;
      }
    }
    
    return matchesSearch && matchesTheme && matchesCost && matchesLocation && matchesDate && matchesRegistration && matchesReimbursement;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'registrationDeadline':
        if (!a.registrationDeadline && !b.registrationDeadline) return 0;
        if (!a.registrationDeadline) return 1;
        if (!b.registrationDeadline) return -1;
        
        const deadlineA = new Date(a.registrationDeadline.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
          const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
            'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
          };
          return `${year}-${months[month]}-${day.padStart(2, '0')}`;
        }));
        const deadlineB = new Date(b.registrationDeadline.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
          const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
            'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
          };
          return `${year}-${months[month]}-${day.padStart(2, '0')}`;
        }));
        return deadlineA.getTime() - deadlineB.getTime();
        
      case 'price':
        const priceA = (!a.cost || a.cost === 'Kostenlos') ? 0 : parseInt(a.cost.replace(/[^\d]/g, '')) || 0;
        const priceB = (!b.cost || b.cost === 'Kostenlos') ? 0 : parseInt(b.cost.replace(/[^\d]/g, '')) || 0;
        return priceA - priceB;
        
      case 'date':
      default:
        const parseGermanDate = (dateStr: string) => {
          // Handle dd.mm.yyyy format
          if (dateStr.includes('.')) {
            const parts = dateStr.split('.');
            if (parts.length === 3) {
              return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
            }
          }
          // Handle German month names
          return new Date(dateStr.replace(/(\d+)\. (\w+) (\d+)/, (_, day, month, year) => {
            const months: { [key: string]: string } = {
              'Jan': '01', 'Feb': '02', 'März': '03', 'Apr': '04', 'Mai': '05', 'Juni': '06',
              'Juli': '07', 'Aug': '08', 'Sept': '09', 'Okt': '10', 'Nov': '11', 'Dez': '12'
            };
            return `${year}-${months[month]}-${day.padStart(2, '0')}`;
          }));
        };
        
        const dateA = parseGermanDate(a.date);
        const dateB = parseGermanDate(b.date);
        return dateA.getTime() - dateB.getTime();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-12">Events finden</h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Search */}
          <div className="relative w-full md:flex-1 md:min-w-[180px] md:max-w-[300px] order-1 md:order-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Suche"
              className="pl-10 text-black placeholder:text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Themen Filter - Multi-select */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[160px] md:w-[220px] justify-start text-left font-normal text-sm text-black",
                    selectedTheme.length > 0 && "border-[#41919C] bg-[#41919C]/10"
                  )}
                >
                  {selectedTheme.length === 0 
                    ? "Themen" 
                    : selectedTheme.length === 1 
                      ? themes.find(t => t.id === selectedTheme[0])?.label
                      : `${selectedTheme.length} Themen`
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-3">
                  <h4 className="font-medium">Themen auswählen</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {themes.slice(1).map((theme) => (
                      <label key={theme.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTheme.includes(theme.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTheme([...selectedTheme, theme.id]);
                            } else {
                              setSelectedTheme(selectedTheme.filter(t => t !== theme.id));
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{theme.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {selectedTheme.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
                onClick={() => setSelectedTheme([])}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Kosten Filter - Popover mit Slider */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[120px] md:w-[140px] justify-start text-left font-normal text-sm text-black",
                    (costRange[0] !== 0 || costRange[1] !== 500) && "border-[#41919C] bg-[#41919C]/10"
                  )}
                >
                  {costRange[0] === 0 && costRange[1] === 500 
                    ? "Kosten" 
                    : `${costRange[0]}€ - ${costRange[1]}€`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  <h4 className="font-medium">Kostenbereich</h4>
                  <Slider
                    value={costRange}
                    onValueChange={setCostRange}
                    max={500}
                    step={10}
                    className="w-full [&_[role=slider]]:bg-[#41919C] [&_[role=slider]]:border-[#41919C] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-md"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{costRange[0]}€</span>
                    <span>{costRange[1]}€</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {(costRange[0] !== 0 || costRange[1] !== 500) && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
                onClick={() => setCostRange([0, 500])}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Datum Filter */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal text-sm min-w-[120px] md:min-w-[140px] text-black",
                    selectedDate && (selectedDate.from || selectedDate.to) && "border-[#41919C] bg-[#41919C]/10",
                    selectedDate?.from && selectedDate?.to && "min-w-[160px] md:min-w-[200px]"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate?.from ? (
                    selectedDate.to ? (
                      `${format(selectedDate.from, "dd.MM.yyyy")} - ${format(selectedDate.to, "dd.MM.yyyy")}`
                    ) : (
                      `Ab ${format(selectedDate.from, "dd.MM.yyyy")}`
                    )
                  ) : selectedDate?.to ? (
                    `Bis ${format(selectedDate.to, "dd.MM.yyyy")}`
                  ) : (
                    "Datum"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto rounded-md border shadow-lg"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  defaultMonth={new Date()}
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (selectedDate.from || selectedDate.to) && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
                onClick={() => setSelectedDate(undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Ort Filter mit Suche und Radius */}
          <LocationSearch
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            radius={locationRadius}
            onRadiusChange={setLocationRadius}
            onLocationSelect={(location) => {
              setSelectedLocationCoords({ lat: location.lat, lon: location.lon });
            }}
          />


          {/* Anmeldefrist Filter */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal text-sm min-w-[130px] md:min-w-[160px] text-black",
                    selectedRegistration && (selectedRegistration.from || selectedRegistration.to) && "border-[#41919C] bg-[#41919C]/10",
                    selectedRegistration?.from && selectedRegistration?.to && "min-w-[180px] md:min-w-[220px]"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedRegistration?.from ? (
                    selectedRegistration.to ? (
                      `${format(selectedRegistration.from, "dd.MM.yyyy")} - ${format(selectedRegistration.to, "dd.MM.yyyy")}`
                    ) : (
                      `Ab ${format(selectedRegistration.from, "dd.MM.yyyy")}`
                    )
                  ) : selectedRegistration?.to ? (
                    `Bis ${format(selectedRegistration.to, "dd.MM.yyyy")}`
                  ) : (
                    "Anmeldefrist"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={selectedRegistration}
                  onSelect={setSelectedRegistration}
                  initialFocus
                  className="pointer-events-auto rounded-md border shadow-lg"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  defaultMonth={new Date()}
                />
              </PopoverContent>
            </Popover>
            {selectedRegistration && (selectedRegistration.from || selectedRegistration.to) && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
                onClick={() => setSelectedRegistration(undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Reisekostenerstattung Filter */}
          <div className="relative">
            <Select value={reimbursement} onValueChange={setReimbursement}>
              <SelectTrigger className={cn(
                "w-[160px] md:w-[200px] text-sm text-black",
                reimbursement !== "all" && "border-[#41919C] bg-[#41919C]/10"
              )}>
                <SelectValue>
                  {reimbursement === "all" ? "Reisekostenerstattung" : reimbursementOptions.find(opt => opt.id === reimbursement)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {reimbursementOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {reimbursement !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-[#41919C] text-white hover:bg-[#4A9BA6]"
                onClick={() => setReimbursement("all")}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Clear All Filters Button - Moved to end */}
          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Alle Filter zurücksetzen
            </Button>
          )}
        </div>


        {/* Sort */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-black">Sortieren nach:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] md:w-[160px] text-sm text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Anfangsdatum</SelectItem>
                <SelectItem value="registrationDeadline">Anmeldefrist</SelectItem>
                <SelectItem value="price">Preis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            {filteredEvents.length} Gesamtergebnisse
          </div>
        </div>


        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Events werden geladen...</p>
          </div>
        ) : (
          <div id="event-list" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {sortedEvents.map((event) => (
              <EventCard 
                key={event.id} 
                {...event}
                date={formatEventDate(event.date)}
                registrationDeadline={event.registrationDeadline ? formatEventDate(event.registrationDeadline) : undefined}
              />
            ))}
          </div>
        )}

        {sortedEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Keine Events gefunden. Versuche andere Suchbegriffe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;