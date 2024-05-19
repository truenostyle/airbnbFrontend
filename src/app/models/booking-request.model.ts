export interface BookingRequest {
    stayId: number;
    checkIn: Date;
    checkOut: Date;
    guests: number;
}