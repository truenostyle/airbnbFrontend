import { Rating } from './rating.model';
import { UserInfo } from './user-info.model';

export interface StayItemDetailed {
  id: string;
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
  owner: UserInfo;
}
