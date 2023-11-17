import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Dish | undefined;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dishId = params['id']; // dishId is now a string
      this.getDishDetails(dishId);
    });
  }

  getDishDetails(dishId: string): void {
    this.dishService.getDish(dishId).subscribe(
      (dish: Dish | undefined) => {
        if (dish) {
          this.recipe = dish;
        } else {
          console.error('Dish not found');
        }
      },
      error => {
        console.error('Error fetching dish details:', error);
      }
    );
  }
}
