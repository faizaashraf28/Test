import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DishComponent } from './dish/dish.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'dish', component: DishComponent },
  {path:'recipe',component:RecipeComponent},
  {path:'add-recipe',component:AddRecipeComponent},
  {path:':id/edit',component:AddRecipeComponent},
  {path: 'recipes',
  loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
