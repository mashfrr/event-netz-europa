import React, { useState } from "react";
import { Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import LocationSearch from "@/components/LocationSearch";
import { DateRange } from "react-day-picker";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [costRange, setCostRange] = useState<number[]>([0, 500]);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [locationRadius, setLocationRadius] = useState<number>(50);
  const [selectedRegistration, setSelectedRegistration] = useState<DateRange | undefined>();
  const [reimbursement, setReimbursement] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  const handleCommunityClick = () => {
    window.open("https://chat.whatsapp.com/B73TpR6gGumIGsb0fSRZ0q", "_blank");
  };

  const handleChannelClick = () => {
    window.open("https://whatsapp.com/channel/0029Va8izXXFcow89AjyaH3l", "_blank");
  };

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

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedTheme([]);
    setCostRange([0, 500]);
    setSelectedDate(undefined);
    setSelectedLocation("all");
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 sm:px-6 md:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12">Events finden</h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Search */}
          <div className="relative w-full md:flex-1 md:min-w-[180px] md:max-w-[300px] order-1 md:order-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Suche"
              className="pl-10 text-black placeholder:text-black rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled
            />
          </div>

          {/* Themen Filter - Multi-select */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[160px] md:w-[220px] justify-start text-left font-normal text-sm text-black rounded-lg",
                    selectedTheme.length > 0 && "border-[#41919C] bg-[#41919C]/10"
                  )}
                  disabled
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
                          disabled
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
                disabled
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
                    "w-full sm:w-[120px] md:w-[140px] justify-start text-left font-normal text-sm text-black rounded-lg",
                    (costRange[0] !== 0 || costRange[1] !== 500) && "border-[#41919C] bg-[#41919C]/10"
                  )}
                  disabled
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
                    disabled
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
                disabled
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
                    "justify-start text-left font-normal text-sm min-w-[120px] md:min-w-[140px] text-black rounded-lg",
                    selectedDate && (selectedDate.from || selectedDate.to) && "border-[#41919C] bg-[#41919C]/10",
                    selectedDate?.from && selectedDate?.to && "min-w-[160px] md:min-w-[200px]"
                  )}
                  disabled
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
                disabled
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
            onLocationSelect={() => {}}
            disabled
          />

          {/* Anmeldefrist Filter */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal text-sm min-w-[130px] md:min-w-[160px] text-black rounded-lg",
                    selectedRegistration && (selectedRegistration.from || selectedRegistration.to) && "border-[#41919C] bg-[#41919C]/10",
                    selectedRegistration?.from && selectedRegistration?.to && "min-w-[180px] md:min-w-[220px]"
                  )}
                  disabled
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
                disabled
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Reisekostenerstattung Filter */}
          <div className="relative">
            <Select value={reimbursement} onValueChange={setReimbursement} disabled>
              <SelectTrigger className={cn(
                "w-full sm:w-[160px] md:w-[200px] text-sm text-black rounded-lg",
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
                disabled
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Clear All Filters Button */}
          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              disabled
            >
              <X className="w-4 h-4" />
              Alle Filter zurücksetzen
            </Button>
          )}
        </div>

        {/* Sort */}
        <div className="hidden flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-black">Sortieren nach:</span>
            <Select value={sortBy} onValueChange={setSortBy} disabled>
              <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] text-sm text-black rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Anfangsdatum</SelectItem>
                <SelectItem value="registrationDeadline">Anmeldefrist</SelectItem>
                <SelectItem value="price">Preis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Development Message with WhatsApp Buttons */}
        <div className="text-center py-12">
          <p className="prose prose-lg text-gray-700 leading-relaxed max-w-none mb-6">
            Diese Funktion befindet sich noch in der Entwicklung.
            <br />
            Entdecken Sie unsere Angebote bereits jetzt über unsere WhatsApp-Community oder unseren WhatsApp-Kanal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-3 md:gap-4">
            <button 
              onClick={handleCommunityClick}
              style={{ backgroundColor: '#41919C' }}
              className="text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:opacity-90 transition-colors text-sm sm:text-base w-[280px] sm:w-auto mx-auto sm:mx-0 sm:flex-1 sm:max-w-xs"
            >
              Whatsapp-Community
            </button>
            <button 
              onClick={handleChannelClick}
              style={{ backgroundColor: '#41919C' }}
              className="text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:opacity-90 transition-colors text-sm sm:text-base w-[280px] sm:w-auto mx-auto sm:mx-0 sm:flex-1 sm:max-w-xs"
            >
              Whatsapp-Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;