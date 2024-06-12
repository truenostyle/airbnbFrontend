import { Component } from '@angular/core';

@Component({
  selector: 'app-starthost-page',
  templateUrl: './starthost-page.component.html',
  styleUrls: ['./starthost-page.component.scss']
})
export class StarthostPageComponent {

  constructor() {}

  inputValue: string = '';
  counter: number = 0;

  photos: string[] = [];
  bedroomsCount = 0;
  bedsCount = 0;
  bathroomsCount = 0;
  allCount = 0;

  placeTypes = [
    {
      title: 'An entire place',
      description: 'Guests have the whole place to themselves.',
      imgUrl: '/assets/images/icons/house.svg',
      selected: true
    },
    {
      title: 'A room',
      description: 'Guests have their own room in a home, plus access to shared spaces.',
      imgUrl: '/assets/images/icons/house.svg',
      selected: false
    },
    {
      title: 'A shared room',
      description: 'Guests sleep in a room or common area that may be shared with you or others.',
      imgUrl: '/assets/images/icons/house.svg',
      selected: false
    }
  ];


  places = [
    { imgUrl: '/assets/images/icons/house.svg', name: 'House', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Apartment', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Barn', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Bed & breakfast', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Boat', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Cabin', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Camper / RV', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Casa particular', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Castle', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Dammuso', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Dome', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Earth home', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Farm', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Guesthouse', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Hotel', selected: false }
  ];

  offers = [
    { imgUrl: '/assets/images/icons/house.svg', name: 'Wifi', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'TV', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Kitchen', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Washer', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Free parking', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Paid parking', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Air conditioning', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Dedicated', selected: false },
   
  ];

  amenities = [
    { imgUrl: '/assets/images/icons/house.svg', name: 'Poo', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Hot tube', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Patio', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'BBQ grill', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Outdoor dining', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Fire pit', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Pool table', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Indoor fireplace ', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Piano', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Ecercise equipment', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'lake access ', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Outdoor shower', selected: false },
   
  ];

  safetys = [
    { imgUrl: '/assets/images/icons/house.svg', name: 'Smoke alarm', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'First aid kit', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Fire extinguisher', selected: false },
    { imgUrl: '/assets/images/icons/house.svg', name: 'Carbon monoxide alarm', selected: false },

  ];


  selectPlace(selectedPlace: { title: string; selected: boolean }) {
    this.placeTypes.forEach(place => {
      place.selected = place === selectedPlace;
    });
  }

  toggleSelection(place: { name: string, selected: boolean }) {
    place.selected = !place.selected;
  }

  

  increment(type: string) {
    if (type === 'bedrooms') {
      this.bedroomsCount++;
    } else if (type === 'beds') {
      this.bedsCount++;
    } else if (type === 'bathrooms') {
      this.bathroomsCount++;
    } else if (type === 'all') {
      this.allCount++;
    } 
  }

  decrement(type: string) {
    if (type === 'bedrooms' && this.bedroomsCount > 0) {
      this.bedroomsCount--;
    } else if (type === 'beds' && this.bedsCount > 0) {
      this.bedsCount--;
    } else if (type === 'bathrooms' && this.bathroomsCount > 0) {
      this.bathroomsCount--;
    } else if (type === 'all' && this.allCount > 0) {
      this.allCount--;
    }
  }


 

 handleFileInput(event: any) {
        const files: FileList = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                this.photos.push(reader.result as string);
            };
            reader.readAsDataURL(files[i]);
        }
    }

    deletePhoto(index: number) {
      this.photos.splice(index, 1);
  }

  updateCounter(event: any) {
    this.counter = event.target.value.length;
}
}
