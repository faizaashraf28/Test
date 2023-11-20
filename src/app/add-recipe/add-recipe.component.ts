// add-recipe.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DishService } from '../services/dish.service';
import { Dish, Ingredient } from '../models/dish.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
    @Output() recipeAdded: EventEmitter<Dish> = new EventEmitter<Dish>(); // Use @Output to emit data to parent component
  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      dishName: ['', [Validators.required]],
      imageLink: ['', [Validators.required]],
      recipe: ['', [Validators.required]],
      ingredients: this.fb.array([this.createIngredient()])
    });
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getIngredientControl(index: number, controlName: string): FormControl {
    return this.ingredients.at(index).get(controlName) as FormControl;
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  async saveRecipe(): Promise<void> {
    if (this.recipeForm.valid) {
      const newDish: Dish = {
        name: this.recipeForm.value.dishName,
        imageLink: this.recipeForm.value.imageLink,
        ingredients: this.recipeForm.value.ingredients,
        recipe: this.recipeForm.value.recipe
      };

      try {
        await this.dishService.addDish(newDish);
        // Emit the new recipe data to the parent component
        this.recipeAdded.emit(newDish);

        this.router.navigate(['/dish']);
      } catch (error) {
        console.error('Error adding dish:', error);
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
