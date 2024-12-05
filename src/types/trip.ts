export interface TripFormData {
  destination: string;
  duration: number;
  tripType: string;
}

export interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface Itinerary {
  destination: string;
  duration: number;
  tripType: string;
  days: ItineraryDay[];
}