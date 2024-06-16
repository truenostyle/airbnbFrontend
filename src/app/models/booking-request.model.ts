export interface BookingRequest {
    stayId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
}