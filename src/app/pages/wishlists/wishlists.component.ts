import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WhishlistCategory } from 'src/app/models/whistlist-category.model';
import { WhishlistsService } from 'src/app/services/whishlists.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent {
  items?: Observable<WhishlistCategory[]>;

  constructor(private whishlistsService: WhishlistsService) {
    this.items = whishlistsService.get();
  }
}
