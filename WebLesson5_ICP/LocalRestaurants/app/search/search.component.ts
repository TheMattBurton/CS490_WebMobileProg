import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('food') foods: ElementRef;
  @ViewChild('place') places: ElementRef;
  foodValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    // window.navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.geolocationPosition = position;
    //     this.currentLat = position.coords.latitude;
    //     this.currentLong = position.coords.longitude;
    //   });
  }

  getVenues() {

    this.foodValue = this.foods.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    // if (this.foodValue !== null) {
    //   this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=90345b31&app_key=7884f37e59a7ff7d16ceb275bec553a9&from=0&to=3')
    //     .subscribe((data: any)=>{
    //       for (var i = 0; i < data.hits.length; i++) {
    //            this.recipeList[i] = {
    //           "name": data.hits[i].recipe.label,
    //           "url": data.hits[i].recipe.url,
    //           "icon": data.hits[i].recipe.image
    //         };
    //       }
    //     });
    // }



    // if (this.placeValue != null && this.placeValue != "" && this.recipeValue != null && this.recipeValue != "") {
    if (this.placeValue != null && this.placeValue !== '' ) {
      this._http.get('https://api.foursquare.com/v2/venues/search' +
        '?client_id=E2UIA51CM0ASMF5REXFCZAHYOS2UXIBYPTDR53C4JZQ2EEXN' +
        '&client_secret=OLDLRDXJL3D50UWOYVTZ0553O3WBBWZADPLUUKJK0PFULNL3' +
        '&v=20160215&limit=5' +
        '&categoryId=4d4b7105d754a06374d81259' +
        '&near=' + this.placeValue
        + '&query=' + this.foodValue)
        .subscribe((data: any) => {
            for (var i = 0; i < data.response.venues.length; i++) {
            this.venueList[i] = {
              'name': data.response.venues[i].name,
              'id': data.response.venues[i].id,
              'location': data.response.venues[i].location
            };
              console.log(this.venueList[i]);

            }

        });
    }
  }
}
