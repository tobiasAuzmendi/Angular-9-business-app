import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  ratingRange: any[] = [];

  constructor() {}

  ngOnInit() {
    this.ratingRange = this.mapRatingToArray(this.rating);
  }

  private mapRatingToArray = (rating) => Array.from(Array(5)).map((_, index) => index < rating);
}
