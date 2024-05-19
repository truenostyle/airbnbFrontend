import { Rating } from './rating.model';

export interface StayItemDetailed {
  id: number;
  title: string;
  description: string;
  location: string;
  maxGuests: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  cleaningFee: number;
  rating: Rating;
}
