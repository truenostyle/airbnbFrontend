import { Component } from '@angular/core';
interface Cell {
  image?: string;
  text: string;
  status?: string;
}

@Component({
  selector: 'app-hosting-page',
  templateUrl: './hosting-page.component.html',
  styleUrls: ['./hosting-page.component.scss']
})
export class HostingPageComponent {
  currentState: string = 'state1';
  currentState2: string = 'statusAll';
  headers: string[] = ['Listing', 'Location', 'Status'];
  headers2: string[] = ['Guests', 'Listing', 'Dates', 'Booked', 'Earnings', 'Status'];
  rows: Cell[][] = [
    [{ image: 'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg', text: 'Aura House 2bds Eco Bamboo House' }, { text: 'Abiansemal, Indonesia' }, { text: 'Completed' }],
    [{ image: 'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg', text: 'Aura House 2bds Eco Bamboo House' }, { text: 'Abiansemal, Indonesia' }, { text: 'Completed' }],
    [{ image: 'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg', text: 'Aura House 2bds Eco Bamboo House' }, { text: 'Abiansemal, Indonesia' }, { text: 'Completed' }],
  ];

  rows2: Cell[][] = [
    [{ image: '../assets/images/icons/man-user.svg', text: 'John Simons' }, 
    { text: 'Aura House 2bds Eco Bamboo House' }, 
    { text: 'Jul 4-5, 2024' },
    { text: 'Jun 15, 2024'},
    { text: '$430'},
    {
      status: 'Completed',
      text: 'Completed'
    }
  ],
  [{ image: '../assets/images/icons/man-user.svg', text: 'John Simons' }, 
  { text: 'Aura House 2bds Eco Bamboo House' }, 
  { text: 'Jul 4-5, 2024' },
  { text: 'Jun 15, 2024'},
  { text: '$430'},
  {
    status: 'Upcoming',
    text: 'Upcoming'
  }
],
[{ image: '../assets/images/icons/man-user.svg', text: 'John Simons' }, 
{ text: 'Aura House 2bds Eco Bamboo House' }, 
{ text: 'Jul 4-5, 2024' },
{ text: 'Jun 15, 2024'},
{ text: '$430'},
{
  status: 'Cancelled',
  text: 'Cancelled'
}
],
[{ image: '../assets/images/icons/man-user.svg', text: 'John Simons' }, 
{ text: 'Aura House 2bds Eco Bamboo House' }, 
{ text: 'Jul 4-5, 2024' },
{ text: 'Jun 15, 2024'},
{ text: '$430'},
{
  status: 'Cancelled',
  text: 'Cancelled'
}
],
    
  ];



  setState(state: string) {
    this.currentState = state;
  }

  filteredRows2: Cell[][] = [];

  setState2(state: string) {
    this.currentState2 = state;
    if (this.currentState2 === 'statusAll') {
      // Если выбран "All", отображаем все ряды
      this.filteredRows2 = this.rows2;
    } else {
      // Фильтруем ряды по статусу
      this.filteredRows2 = this.rows2.filter(row => {
        return row.some(cell => cell.status === this.currentState2);
      });
    }
  }
  
}
