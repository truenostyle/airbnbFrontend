import { RoomType } from "../enums/room-type.enum";

export class StayFilter {
    location : string = "";
    minGuests: number = 1;
    roomType: RoomType = RoomType.Any;
    minBedrooms: number = 0;
    minBeds: number = 0;
    minBathrooms: number = 0;
    minPrice = 0;
    maxPrice?: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    places?: number[];
}