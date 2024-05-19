import { StayItemDetailed } from './stay-item-detailed.model';

export interface BookingState {
  dateStart: Date;
  dateEnd: Date;
  guests: number;
  cost: number;
  stay: StayItemDetailed;
}
