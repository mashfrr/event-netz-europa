export interface Event {
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
  applicationType?: 'anmeldung' | 'bewerbung';
  city?: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Müllsammelaktion im Stadtpark',
    description: 'Gemeinsam machen wir unseren Stadtpark sauberer! Bring Handschuhe mit und hilf uns dabei, die Natur zu schützen.',
    date: '15. Sept 2024',
    time: '10:00 - 13:00',
    location: 'Stadtpark Mitte, Haupteingang',
    organizer: 'Grüne Jugend Berlin',
    category: 'environment',
    attendees: 24,
    maxAttendees: 40,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop'
    ],
    friendsAttending: ['Anna', 'Max'],
    isRegistered: false,
    registrationDeadline: '14. Sept 2024',
    cost: 'Kostenlos',
    restrictions: 'Ab 16 Jahren',
    link: 'https://gruene-jugend-berlin.de/events/1',
    applicationType: 'anmeldung',
    city: 'Berlin'
  },
  {
    id: '2',
    title: 'Nachhilfe für Geflüchtete - Mathe & Deutsch',
    description: 'Unterstütze junge Geflüchtete beim Lernen! Wir suchen ehrenamtliche Nachhilfelehrer:innen für Mathematik und Deutsch.',
    date: '18. Sept 2024',
    time: '16:00 - 18:00',
    location: 'Jugendzentrum Wedding',
    organizer: 'UNICEF Deutschland',
    category: 'education',
    attendees: 12,
    maxAttendees: 15,
    friendsAttending: ['Lisa'],
    isRegistered: true,
    registrationDeadline: '17. Sept 2024',
    cost: 'Kostenlos',
    restrictions: 'Deutsche Grundkenntnisse erforderlich',
    applicationType: 'bewerbung',
    city: 'Berlin'
  },
  {
    id: '3',
    title: 'Kochworkshop für Obdachlose',
    description: 'Hilf uns dabei, warme Mahlzeiten für obdachlose Menschen zu kochen. Gemeinsam schaffen wir mehr!',
    date: '20. Sept 2024',
    time: '14:00 - 17:00',
    location: 'Suppenküche Kreuzberg',
    organizer: 'Herz für Alle',
    category: 'social',
    attendees: 18,
    maxAttendees: 25,
    friendsAttending: ['Tom', 'Sarah', 'Julia'],
    isRegistered: false,
    registrationDeadline: '19. Sept 2024',
    cost: '5€ für Zutaten',
    restrictions: 'Hygieneschulung erforderlich',
    applicationType: 'anmeldung',
    city: 'Berlin'
  },
  {
    id: '4',
    title: 'Jugendparlament - Deine Stimme zählt!',
    description: 'Diskutiere mit anderen Jugendlichen über wichtige Themen in deinem Bezirk. Bringe deine Ideen ein!',
    date: '22. Sept 2024',
    time: '18:00 - 20:00',
    location: 'Rathaus Charlottenburg, Saal A',
    organizer: 'BPD - Bundeszentrale für politische Bildung',
    category: 'community',
    attendees: 45,
    friendsAttending: ['Emma'],
    isRegistered: true,
    registrationDeadline: '21. Sept 2024',
    cost: 'Kostenlos',
    restrictions: '16-25 Jahre',
    applicationType: 'bewerbung',
    city: 'Berlin'
  },
  {
    id: '5',
    title: 'Coding Workshop: Apps für den guten Zweck',
    description: 'Lerne programmieren und entwickle Apps, die einen positiven gesellschaftlichen Impact haben.',
    date: '25. Sept 2024',
    time: '10:00 - 16:00',
    location: 'TechHub Berlin, Raum 301',
    organizer: 'Young Leaders',
    category: 'education',
    attendees: 32,
    maxAttendees: 35,
    friendsAttending: [],
    isRegistered: false,
    registrationDeadline: '24. Sept 2024',
    cost: '20€ Materialkosten',
    restrictions: 'Laptop erforderlich',
    link: 'https://codeforgood.de/events/5',
    applicationType: 'bewerbung',
    city: 'Berlin'
  },
  {
    id: '6',
    title: 'Nachbarschaftsfest organisieren',
    description: 'Hilf uns bei der Organisation des großen Nachbarschaftsfests! Von Dekoration bis Bühnenprogramm - jede Hilfe ist willkommen.',
    date: '28. Sept 2024',
    time: '11:00 - 15:00',
    location: 'Kiez-Zentrum Prenzlauer Berg',
    organizer: 'Amnesty International',
    category: 'community',
    attendees: 28,
    friendsAttending: ['Paul', 'Nina'],
    isRegistered: false,
    registrationDeadline: '27. Sept 2024',
    cost: 'Kostenlos',
    restrictions: 'Mindestalter 14 Jahre',
    applicationType: 'anmeldung',
    city: 'Berlin'
  },
  {
    id: '7',
    title: 'Klimastreik Demonstration',
    description: 'Gemeinsam für den Klimaschutz! Sei dabei beim großen Klimastreik in Hamburg.',
    date: '30. Sept 2024',
    time: '12:00 - 16:00',
    location: 'Rathausmarkt Hamburg',
    organizer: 'Fridays for Future',
    category: 'environment',
    attendees: 156,
    maxAttendees: 500,
    friendsAttending: ['Clara', 'Felix'],
    isRegistered: true,
    registrationDeadline: '29. Sept 2024',
    cost: 'Kostenlos',
    restrictions: 'Alle Altersgruppen',
    applicationType: 'anmeldung',
    city: 'Hamburg'
  },
  {
    id: '8',
    title: 'Erste Hilfe Kurs für Jugendliche',
    description: 'Lerne lebensrettende Erste Hilfe Maßnahmen in einem Kurs speziell für junge Menschen.',
    date: '2. Okt 2024',
    time: '09:00 - 17:00',
    location: 'DRK München, Schulungsraum 2',
    organizer: 'Deutsches Rotes Kreuz',
    category: 'education',
    attendees: 18,
    maxAttendees: 20,
    friendsAttending: ['Ben'],
    isRegistered: false,
    registrationDeadline: '1. Okt 2024',
    cost: '35€',
    restrictions: 'Ab 14 Jahren',
    applicationType: 'bewerbung',
    city: 'München'
  }
];