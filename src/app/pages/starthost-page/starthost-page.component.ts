import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Amenities } from 'src/app/consts/amenities';
import { Offers } from 'src/app/consts/offers';
import { PlaceTypes } from 'src/app/consts/place-types';
import { Places } from 'src/app/consts/places';
import { Safetys } from 'src/app/consts/safetys';
import { StaysService } from 'src/app/services/stays.service';

@Component({
  selector: 'app-starthost-page',
  templateUrl: './starthost-page.component.html',
  styleUrls: ['./starthost-page.component.scss'],
})
export class StarthostPageComponent {
  inputValue: string = '';
  description: string = '';
  counter: number = 0;
  price: number = 0;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  location = new FormGroup({
    country: new FormControl<string>(''),
    adress: new FormControl<string>(''),
    house: new FormControl<string>(''),
    city: new FormControl<string>(''),
    region: new FormControl<string>(''),
    postcode: new FormControl<string>(''),
  });

  photos: string[] = [];
  bedroomsCount = 0;
  bedsCount = 0;
  bathroomsCount = 0;
  allCount = 0;

  placeTypes = PlaceTypes;
  places = Places;
  offers = Offers;
  amenities = Amenities;
  safetys = Safetys;

  constructor(private staysService: StaysService, private router: Router) {}

  selectPlace(selectedPlace: { title: string; selected: boolean }) {
    this.placeTypes.forEach((place) => {
      place.selected = place === selectedPlace;
    });
  }

  toggleSelection(place: { name: string; selected: boolean }) {
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

  submit() {
    const newStay = {
      title: this.inputValue,
      description: this.description,
      location: this.getLocation(),
      startDate: this.range.controls.start.value!,
      endDate: this.range.controls.end.value!,
      bedrooms: this.bedroomsCount,
      beds: this.bedsCount,
      bathrooms: this.bathroomsCount,
      maxGuests: this.allCount,
      price: this.price,
      placeType: this.placeTypes.find(place => place.selected === true)?.type!,
      images: this.photos.map(image => image.substr(image.indexOf(',') + 1)),
      places: this.mapTags(this.places),
      offers: this.mapTags(this.offers),
      amenities: this.mapTags(this.amenities),
      safetys: this.mapTags(this.amenities)
    }
    this.staysService.addStay(newStay).subscribe(() => this.router.navigate(['/hosting']));
  }

  private mapTags(tags: {selected: boolean, type: number}[]): number[] {
    return tags.filter(tag => tag.selected).map(tag => tag.type);
  }

  private getLocation() {
    const controls = this.location.controls;
    return `${controls.country.value} ${controls.region.value} ${controls.city.value} ${controls.adress.value} ${controls.house.value} ${controls.postcode.value}`
  }
}