import { PlaceType } from "../enums/place-type.enum";

export const PlaceTypes = [
    {
      title: 'An entire place',
      description: 'Guests have the whole place to themselves.',
      imgUrl: '/assets/images/icons/house.svg',
      selected: true,
      type: PlaceType.EntirePlace

    },
    {
      title: 'A room',
      description: 'Guests have their own room in a home, plus access to shared spaces.',
      imgUrl: '/assets/images/icons/amenities/buildings.svg',
      selected: false,
      type: PlaceType.Room
    },
    {
      title: 'A shared room',
      description: 'Guests sleep in a room or common area that may be shared with you or others.',
      imgUrl: '/assets/images/icons/amenities/building-4.svg',
      selected: false,
      type: PlaceType.SharedRoom
    }
  ];