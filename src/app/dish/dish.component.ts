// dish.component.ts

import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  dishes$: Observable<Dish[]>; // Use Observable<Dish[]> here
  filteredDishes: Dish[] = [];

  constructor(private dishService: DishService, private router: Router) {
    this.dishes$ = this.dishService.getDishes(); // Assign observable to dishes$
  }

  ngOnInit(): void {
    this.dishes$.subscribe(
      dishes => this.filteredDishes = dishes,
      error => console.error('Error fetching dishes:', error)
    );
  }

  goToAddRecipe(): void {
    this.router.navigate(['/add-recipe']);
  }

  navigateToRecipe(dishId: string | undefined): void {
    if (dishId !== undefined) {
      this.router.navigate(['/recipe', dishId]);
    } else {
      console.error('Invalid dishId:', dishId);
    }
  }
}
