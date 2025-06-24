'use client';
import { useState } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import { Table, Select, TextInput, MultiSelect } from '@mantine/core';
import {
  type IRecipe,
  IngredientKeys,
  RecipeKeys,
} from '@/core/recipe';
import {
  getUniqueIngredients,
  getUniqueMainIngredients,
} from './resipes-table-utils';

import styles from './Recipes-table.module.scss';
interface RecipesTableProps {
  recipes: IRecipe[];
}

const RecipesTable: React.FC<RecipesTableProps> = ({ recipes }) => {
  const allIngredients = getUniqueIngredients(recipes);
  const mainIngredients = getUniqueMainIngredients(recipes);

  const [nameFilter, setNameFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [mainIngredientFilter, setMainIngredientFilter] = useState<
    string | null
  >(null);
  const [ingredientFilter, setIngredientFilter] = useState<string[]>(
    [],
  );

  const filteredRecipes = recipes.length
    ? recipes.filter((recipe) => {
        const matchesName = recipe.Name.toLowerCase().includes(
          nameFilter.toLowerCase(),
        );

        const matchesDescription = recipe[
          RecipeKeys.recipeDescription
        ]
          .toLowerCase()
          .includes(descriptionFilter.toLowerCase());

        const matchesMainIngredient = mainIngredientFilter
          ? recipe[RecipeKeys.mainIngredient][IngredientKeys.name]
              .toLowerCase()
              .includes(mainIngredientFilter.toLowerCase())
          : true;

        const matchesIngredients =
          ingredientFilter.length === 0 ||
          recipe[RecipeKeys.ingredients].some((ingredient) =>
            ingredientFilter.includes(
              ingredient[IngredientKeys.name],
            ),
          );

        return (
          matchesName &&
          matchesDescription &&
          matchesMainIngredient &&
          matchesIngredients
        );
      })
    : [];

  const { Thead, Tbody, Th, Tr, Td, ScrollContainer } = Table;
  return (
    <ScrollContainer minWidth={500} type="native">
      <Table
        striped
        highlightOnHover
        className={cx({
          [styles.empty]: !filteredRecipes.length,
          [styles.filled]: filteredRecipes.length,
        })}

        //2 вариант
        // className={cx(
        //   !filteredRecipes.length && styles.empty,
        //   filteredRecipes.length && styles.filled,
        // )}
      >
        <Thead>
          <Tr>
            <Th className={styles.name}>Name</Th>
            <Th className={styles.description}>Description</Th>
            <Th className={styles.mainIngredients}>
              Main Ingredient
            </Th>
            <Th className={styles.ingredients}>Ingredients</Th>
          </Tr>
          <Tr className={styles.filters}>
            <Th>
              <TextInput
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(event) =>
                  setNameFilter(event.currentTarget.value)
                }
                mb="xs"
              />
            </Th>
            <Th>
              <TextInput
                placeholder="Filter by description"
                value={descriptionFilter}
                onChange={(event) =>
                  setDescriptionFilter(event.currentTarget.value)
                }
                mb="xs"
              />
            </Th>
            <Th>
              <Select
                placeholder="Filter by ingredients"
                data={mainIngredients}
                value={mainIngredientFilter}
                onChange={setMainIngredientFilter}
                clearable
                mb="xs"
              />
            </Th>
            <Th>
              <MultiSelect
                data={allIngredients}
                placeholder={
                  !ingredientFilter.length
                    ? 'Filter by ingredients'
                    : ''
                }
                value={ingredientFilter}
                onChange={setIngredientFilter}
                mb="xs"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRecipes.length ? (
            filteredRecipes.map((recipe, index) => (
              <Tr key={index}>
                <Td>
                  <Link
                    href={`recipe/${recipe[RecipeKeys.recipeID]}`}
                  >
                    {recipe.Name}
                  </Link>
                </Td>
                <Td>{recipe.description}</Td>
                <Td>
                  <span>
                    {recipe[RecipeKeys.mainIngredient].name}:
                    {recipe[RecipeKeys.mainIngredient].quantity}
                    {
                      recipe[RecipeKeys.mainIngredient]
                        .unitOfMeasurement
                    }
                  </span>
                </Td>
                <Td>
                  {recipe[RecipeKeys.ingredients].map(
                    (ingredient) => (
                      <div key={ingredient.name}>
                        {ingredient.name}: {ingredient.quantity}
                        {ingredient.unitOfMeasurement}
                      </div>
                    ),
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr className={styles.screenPlaceholder}>
              <Td
                className={styles.screenPlaceholderCell}
                colSpan={4}
              >
                <h4>
                  No recipes were found matching the specified
                  criteria.
                </h4>
                <h5> Please, change the selected filters</h5>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </ScrollContainer>
  );
};

export default RecipesTable;
