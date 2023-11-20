// recipes-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { DishComponent } from '../dish/dish.component';
import { RecipeComponent } from '../recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddRecipeComponent,
      },
      {
        path: 'dish',
        component: DishComponent,
      },
      {
        path: 'recipe',
        component: RecipeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
