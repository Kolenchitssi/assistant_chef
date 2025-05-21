'use client';
import { useState } from 'react';
import {
  Table,
  Select,
  TextInput,
  Box,
  MultiSelect,
} from '@mantine/core';
import { IRecipe, RecipeKeys } from '@/core/recipe';
import styles from './Recipes-table.module.scss';

interface RecipesTableProps {
  recipes: IRecipe[];
}

// Получение уникальных ингредиентов для выпадающего списка
const getUniqueIngredients = (recipes: IRecipe[] = []) => {
  const allIngredients = recipes.flatMap((recipe) =>
    recipe.ingredients.map((item) => item.name),
  );
  return Array.from(new Set(allIngredients)).sort();
};

const RecipesTable: React.FC<RecipesTableProps> = ({ recipes }) => {
  const [search, setSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<
    string | null
  >(null);

  const allIngredientsList = getUniqueIngredients(recipes);

  // Фильтрация по поисковому слову и ингредиенту
  const filteredData = recipes.filter((recipe) => {
    // Поиск по имени
    const matchesSearch = recipe[RecipeKeys.recipeName]
      .toLowerCase()
      .includes(search.toLowerCase());

    // Фильтр по ингредиенту
    const matchesIngredient = selectedIngredient
      ? recipe[RecipeKeys.ingredients]
          .map((ingredient) => ingredient.name)
          .includes(selectedIngredient)
      : true;

    return matchesSearch && matchesIngredient;
  });
  //*-----------------------------------------------
  const [nameFilter, setNameFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [ingredientFilter, setIngredientFilter] = useState<string[]>(
    [],
  );

  const filteredRecipes = recipes.length
    ? recipes.filter((recipe) => {
        const matchesName = recipe.Name.toLowerCase().includes(
          nameFilter.toLowerCase(),
        );
        const matchesDescription = recipe.description
          .toLowerCase()
          .includes(descriptionFilter.toLowerCase());
        const matchesIngredients =
          ingredientFilter.length === 0 ||
          recipe.ingredients.some((ingredient) =>
            ingredientFilter.includes(ingredient.name),
          );

        return (
          matchesName && matchesDescription && matchesIngredients
        );
      })
    : [];

  const allIngredients = Array.from(
    new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((item) => item.name),
      ),
    ),
  );
  //*----------------------

  console.log('allIngredients', allIngredients);
  return (
    <>
      <Box>
        <Table highlightOnHover className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Ингредиенты</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TextInput
                  placeholder="Поиск по названию"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  mb="md"
                />
              </td>
              <td>search</td>
              <td>
                <Select
                  label="Выберите ингредиент"
                  placeholder="Все ингредиенты"
                  data={allIngredientsList}
                  value={selectedIngredient}
                  onChange={setSelectedIngredient}
                  clearable
                  mb="md"
                />
              </td>
            </tr>
            {filteredData.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe[RecipeKeys.recipeName]}</td>
                <td>{recipe[RecipeKeys.recipeDescription]}</td>
                <td>
                  {recipe[RecipeKeys.ingredients].map(
                    (ingredient) => (
                      <span key={ingredient.name}>
                        {ingredient.name}: {ingredient.quantity}{' '}
                        {ingredient.unitOfMeasurement}
                      </span>
                    ),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <br />
      ---------------------------------------------
      <div>
        <TextInput
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(event) =>
            setNameFilter(event.currentTarget.value)
          }
          mb="md"
        />
        <TextInput
          placeholder="Filter by description"
          value={descriptionFilter}
          onChange={(event) =>
            setDescriptionFilter(event.currentTarget.value)
          }
          mb="md"
        />
        <MultiSelect
          data={allIngredients}
          placeholder="Filter by ingredients"
          value={ingredientFilter}
          onChange={setIngredientFilter}
          mb="md"
        />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.Name}</td>
                <td>{recipe.description}</td>
                <td>
                  {recipe[RecipeKeys.ingredients].map(
                    (ingredient) => (
                      <span key={ingredient.name}>
                        {ingredient.name}: {ingredient.quantity}{' '}
                        {ingredient.unitOfMeasurement}
                      </span>
                    ),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <br />
    </>
  );
};

export default RecipesTable;
