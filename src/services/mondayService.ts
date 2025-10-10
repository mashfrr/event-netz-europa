const MONDAY_API_TOKEN = import.meta.env.VITE_MONDAY_API_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU2Mzg3MzA0NiwiYWFpIjoxMSwidWlkIjo4NTE1OTAwMywiaWFkIjoiMjAyNS0wOS0xOFQxNzoxMDoyNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg1NDc4NDIsInJnbiI6ImV1YzEifQ.jk7wndce-RArM4dWu0cD7bVDiat4AShytJW_H56aGg0';
const MONDAY_API_URL = 'https://api.monday.com/v2';

interface MondayBoard {
  id: string;
  name: string;
  items: MondayItem[];
}

interface MondayItem {
  id: string;
  name: string;
  column_values: MondayColumnValue[];
}

interface MondayColumnValue {
  id: string;
  type: string;
  text: string;
  value: string;
}

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
  startTime?: string;
  endTime?: string;
  travelReimbursement?: string;
  status?: string;
}

export class MondayService {
  private static async makeRequest(query: string) {
    try {
      const response = await fetch(MONDAY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MONDAY_API_TOKEN,
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`Monday API error: ${data.errors[0].message}`);
      }

      return data.data;
    } catch (error) {
      console.error('Monday API request failed:', error);
      throw error;
    }
  }

  static async getEvents(): Promise<Event[]> {
    // Query to get boards and their items
    const query = `
      query {
        boards(limit: 10) {
          id
          name
          items_page(limit: 100) {
            items {
              id
              name
              column_values {
                id
                type
                text
                value
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.makeRequest(query);
      const events: Event[] = [];

      // Find the events management board
      const eventsBoard = data.boards.find((board: any) => 
        board.name.toLowerCase().includes('events management') ||
        board.name.toLowerCase().includes('event')
      );

      if (!eventsBoard) {
        console.warn('No events management board found');
        return [];
      }

      // Transform Monday items to events
      eventsBoard.items_page.items.forEach((item: any) => {
        const event = this.transformMondayItemToEvent(item);
        if (event) {
          events.push(event);
        }
      });

      return events;
    } catch (error) {
      console.error('Error fetching events from Monday:', error);
      return [];
    }
  }

  private static transformMondayItemToEvent(item: MondayItem): Event | null {
    try {
      // Debug: Log the item structure
      console.log('Monday item:', item);
      console.log('Column values:', item.column_values);

      const getColumnValue = (searchTerms: string[]) => {
        for (const term of searchTerms) {
          const column = item.column_values.find(col => {
            // Check if the column ID or text contains the search term
            const columnId = (col.id || '').toLowerCase();
            const columnText = (col.text || '').toLowerCase();
            const searchLower = term.toLowerCase();
            
            return columnId.includes(searchLower) || 
                   columnText.includes(searchLower) ||
                   (col.value && col.value.toLowerCase().includes(searchLower));
          });
          if (column) {
            console.log(`Found column for ${term}:`, column);
            return column.text || column.value || '';
          }
        }
        return '';
      };

      const getColumnValueByType = (types: string[]) => {
        for (const type of types) {
          const column = item.column_values.find(col => col.type === type);
          if (column) {
            console.log(`Found column by type ${type}:`, column);
            return column.text || column.value || '';
          }
        }
        return '';
      };

      // Check status first - only process approved events
      const status = getColumnValue(['status', 'genehmigt', 'approved']) || 
                    getColumnValueByType(['status']);
      console.log('Event status:', status);
      
      if (!status || !status.toLowerCase().includes('genehmigt')) {
        console.log('Skipping event - not approved:', item.name);
        return null; // Skip non-approved events
      }

      // Extract data from Monday columns using specific column IDs from the logs
      const title = item.name || 'Unbenanntes Event';
      
      // Date fields - using specific column IDs
      const startTimeColumn = item.column_values.find(col => col.id === 'date_mkvxvryw');
      const endTimeColumn = item.column_values.find(col => col.id === 'datum'); // This seems to be another date
      const registrationDeadlineColumn = item.column_values.find(col => col.id === 'date_mkvx3kj3');
      
      const startTime = startTimeColumn?.text || '';
      const endTime = endTimeColumn?.text || '';
      const registrationDeadline = registrationDeadlineColumn?.text || '';
      
      // Format date range (Anfang - Ende)
      let dateRange = '';
      if (startTime && endTime) {
        const formatDate = (dateStr: string) => {
          if (!dateStr) return '';
          const date = new Date(dateStr);
          return date.toLocaleDateString('de-DE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          });
        };
        dateRange = `${formatDate(startTime)} - ${formatDate(endTime)}`;
      } else if (startTime) {
        const date = new Date(startTime);
        dateRange = date.toLocaleDateString('de-DE', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      }
      
      // Other fields using specific column IDs
      const categoryColumn = item.column_values.find(col => col.id === 'dropdown_mkvxvvwz');
      const category = categoryColumn?.text || 'community';
      
      const linkColumn = item.column_values.find(col => col.id === 'text_mkvxfs6j');
      const link = linkColumn?.text || '';
      
      const costColumn = item.column_values.find(col => col.id === 'numeric_mkvxvemn');
      const cost = costColumn?.text || '';
      
      const travelReimbursementColumn = item.column_values.find(col => col.id === 'dropdown_mkvx8qt');
      const travelReimbursement = travelReimbursementColumn?.text || '';
      
      const restrictionsColumn = item.column_values.find(col => col.id === 'text_mkvxwbeg');
      const restrictions = restrictionsColumn?.text || '';
      
      const organizerColumn = item.column_values.find(col => col.id === 'text_mkvxwz85');
      const organizer = organizerColumn?.text || '';
      
      // Try to find location in remaining text columns or add specific location column
      // You may need to check which column ID contains the location in your Monday board
      const locationColumn = item.column_values.find(col => 
        col.type === 'text' && col.text && 
        !['text_mkvxgxc8', 'text_mkvxfs6j', 'text_mkvxwbeg', 'text_mkvxwz85'].includes(col.id)
      );
      const location = locationColumn?.text || '';
      
      const descriptionColumn = item.column_values.find(col => col.id === 'text_mkvxgxc8');
      const description = descriptionColumn?.text || '';
      
      // Handle images
      const imagesColumn = item.column_values.find(col => col.id === 'file_mkvxj45j');
      const images = imagesColumn?.text || '';
      let imageArray: string[] = [];
      if (images) {
        try {
          const parsedImages = JSON.parse(images);
          if (Array.isArray(parsedImages)) {
            imageArray = parsedImages.map((img: any) => img.url || img.public_url || '').filter(Boolean);
          }
        } catch {
          if (images.startsWith('http')) {
            imageArray = [images];
          }
        }
      }

      console.log('Corrected event data:', {
        title, dateRange, startTime, endTime, registrationDeadline, category, 
        link, cost, travelReimbursement, restrictions, organizer, location,
        description, images: imageArray
      });
      
      // Map category to valid options
      let mappedCategory: 'social' | 'environment' | 'education' | 'community' = 'community';
      const categoryLower = category.toLowerCase();
      if (categoryLower.includes('sozial') || categoryLower.includes('social')) {
        mappedCategory = 'social';
      } else if (categoryLower.includes('umwelt') || categoryLower.includes('environment')) {
        mappedCategory = 'environment';
      } else if (categoryLower.includes('bildung') || categoryLower.includes('education')) {
        mappedCategory = 'education';
      }

      // Parse attendees
      const attendeesText = getColumnValue(['teilnehmer', 'attendees']) || '0';
      const attendees = parseInt(attendeesText) || 0;

      const maxAttendeesText = getColumnValue(['max', 'maximum']) || '';
      const maxAttendees = maxAttendeesText ? parseInt(maxAttendeesText) : undefined;

      return {
        id: item.id,
        title,
        description,
        date: dateRange, // Use formatted date range
        time: dateRange,
        location, // Now properly extracted from Monday
        organizer,
        category: mappedCategory,
        attendees: 0,
        maxAttendees: undefined,
        registrationDeadline,
        cost,
        restrictions,
        city: location, // Use location as city for now
        isRegistered: false,
        friendsAttending: [],
        applicationType: 'anmeldung',
        startTime,
        endTime,
        travelReimbursement,
        status: 'approved',
        link,
        images: imageArray.length > 0 ? imageArray : undefined
      };
    } catch (error) {
      console.error('Error transforming Monday item to event:', error);
      return null;
    }
  }
}