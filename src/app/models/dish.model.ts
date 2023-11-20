// dish.model.ts

export interface Dish {
  userId?: string;
  id?: string;
  name: string;
  imageLink: string;
  ingredients: Ingredient[]; 
  recipe: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}
