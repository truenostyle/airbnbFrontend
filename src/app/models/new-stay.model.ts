import { AmenityTags } from "../enums/amentities.enum";
import { OfferTags } from "../enums/offers.enum";
import { PlaceType } from "../enums/place-type.enum";
import { PlaceTags } from "../enums/places.enum";
import { SafetyTags } from "../enums/safetys.enum";

export interface NewStay {
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    bedrooms: number,
    beds: number,
    bathrooms: number,
    maxGuests: number,
    price: number,
    placeType: PlaceType,
    images: string[],
    places: PlaceTags[]
    offers: OfferTags[],
    amenities: AmenityTags[],
    safetys: SafetyTags[]
}