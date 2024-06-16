import { AmenityTags } from '../enums/amentities.enum';
import { OfferTags } from '../enums/offers.enum';
import { PlaceTags } from '../enums/places.enum';
import { SafetyTags } from '../enums/safetys.enum';
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
  places: PlaceTags[];
  offers: OfferTags[];
  amenities: AmenityTags[];
  safetys: SafetyTags[];
}
