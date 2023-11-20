// dish.component.ts
import { Component, Input, OnInit } from '@angular/core';
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
  updatedDishData: Partial<Dish> | undefined;
  @Input() dishData: Dish | undefined; 
  dishes$: Observable<Dish[]>;
  filteredDishes: Dish[] = [];

  constructor(private dishService: DishService, private router: Router) {
    this.dishes$ = this.dishService.getDishes();
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
    if (dishId) {
      this.dishService.getDish(dishId).subscribe(
        dish => {
          console.log('Fetched Dish Details:', dish);
          this.updatedDishData = dish;
        },
        error => console.error('Error fetching dish details:', error)
      );
    }
  }
  
  onRecipeAdded(newDish: Partial<Dish>): void {
    this.updatedDishData = newDish;
  }
}
