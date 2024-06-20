import { BookingStatus } from '../enums/booking-status.enum';

export interface Booking {
  userImageUrl?: string;
  userName: string;
  stayName: string;
  stayLocation: string;
  checkInDate: Date;
  checkOutDate: Date;
  bookedDate: Date;
  price: number;
  status: BookingStatus;
}
