/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { type FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, getFirestore, updateDoc } from '@firebase/firestore';
import { Trash2 } from 'lucide-react';
import { useForm, isNotEmpty } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  FileInput,
  NumberInput,
  Select,
} from '@mantine/core';

import {
  IngredientKeys,
  type IRecipe,
  RecipeKeys,
} from '@/core/recipe';
import { getDataByIdFromFirebase } from '@/utils/get-data-from-firebase/get-data-from-firebase';
import { uploadFile } from '@/utils/upload-file/upload-file';
import {
  INGREDIENT_INITIAL_VALUE,
  UOM,
} from '@/core/recipe/recipe.constants';

import styles from './Edit-recipe.module.scss';

interface EditRecipeProps {
  recipeID: string;
}

const EditRecipe: FC<EditRecipeProps> = ({ recipeID }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      [RecipeKeys.recipeName]: '',
      [RecipeKeys.recipeDescription]: '',
      mainIngredientName: '',
      mainIngredientQuantity: 0,
      mainIngredientUnit: '',
      [RecipeKeys.ingredients]: [
        {
          ...INGREDIENT_INITIAL_VALUE,
          [IngredientKeys.key]: randomId(),
        },
      ],
      [RecipeKeys.imgUrl]: '',
    },
    validate: {
      [RecipeKeys.recipeName]: isNotEmpty('Recipe name is required'),
      [RecipeKeys.recipeDescription]: isNotEmpty(
        'Description is required',
      ),
      mainIngredientName: isNotEmpty(
        'Main ingredient name is required',
      ),
      mainIngredientQuantity: (value) =>
        value <= 0 ? 'Must be greater than 0' : null,
      mainIngredientUnit: isNotEmpty('Unit is required'),
    },
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipe = await getDataByIdFromFirebase<IRecipe>(
          'recipes',
          recipeID,
        );
        if (recipe) {
          form.setValues({
            [RecipeKeys.recipeName]: recipe[RecipeKeys.recipeName],
            [RecipeKeys.recipeDescription]:
              recipe[RecipeKeys.recipeDescription],
            mainIngredientName:
              recipe[RecipeKeys.mainIngredient][IngredientKeys.name],
            mainIngredientQuantity:
              recipe[RecipeKeys.mainIngredient][
                IngredientKeys.quantity
              ],
            mainIngredientUnit:
              recipe[RecipeKeys.mainIngredient][
                IngredientKeys.unitOfMeasurement
              ],
            [RecipeKeys.ingredients]: recipe[RecipeKeys.ingredients],
            [RecipeKeys.imgUrl]: recipe[RecipeKeys.imgUrl] || '',
          });
          setImgUrl(recipe[RecipeKeys.imgUrl] || '');
        }
        setLoading(false);
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : 'Error loading recipe',
        );
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeID]);

  const handleFileInputChange = (file: File | null) => {
    setFile(file);
    if (file) {
      const fileLink = URL.createObjectURL(file);
      setImgUrl(fileLink);
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newImgUrl = file
        ? await uploadFile(file)
        : values[RecipeKeys.imgUrl];

      // Create a plain object for Firebase update
      const updateData = {
        [RecipeKeys.recipeName]: values[RecipeKeys.recipeName],
        [RecipeKeys.recipeDescription]:
          values[RecipeKeys.recipeDescription],
        [RecipeKeys.ingredients]: values[RecipeKeys.ingredients],
        [`${RecipeKeys.mainIngredient}.${IngredientKeys.key}`]:
          randomId(),
        [`${RecipeKeys.mainIngredient}.${IngredientKeys.name}`]:
          values.mainIngredientName,
        [`${RecipeKeys.mainIngredient}.${IngredientKeys.quantity}`]:
          values.mainIngredientQuantity,
        [`${RecipeKeys.mainIngredient}.${IngredientKeys.unitOfMeasurement}`]:
          values.mainIngredientUnit,
        [RecipeKeys.imgUrl]: newImgUrl || null,
      };

      const db = getFirestore();
      await updateDoc(doc(db, 'recipes', recipeID), updateData);
      router.push(`/recipe/${recipeID}`);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Error updating recipe',
      );
    }
  };

  const addIngredient = () => {
    form.insertListItem(RecipeKeys.ingredients, {
      ...INGREDIENT_INITIAL_VALUE,
      [IngredientKeys.key]: randomId(),
    });
  };

  if (loading) return <div>Loading...</div>;
  if (errorMsg) return <div>Error: {errorMsg}</div>;

  return (
    <div className={styles.recipe}>
      <h2>Edit Recipe</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {imgUrl && (
          <div className={styles.photo}>
            <Image
              src={imgUrl}
              alt="recipe photo"
              width={480}
              height={320}
            />
          </div>
        )}
        <FileInput
          label="Recipe Image"
          accept="image/*"
          placeholder="Upload recipe image"
          onChange={handleFileInputChange}
          mb="md"
        />

        <TextInput
          label="Recipe Name"
          placeholder="Enter recipe name"
          {...form.getInputProps(RecipeKeys.recipeName)}
          mb="md"
        />

        <Textarea
          label="Description"
          placeholder="Enter recipe description"
          rows={8}
          {...form.getInputProps(RecipeKeys.recipeDescription)}
          mb="md"
        />

        <div className={styles.row}>
          <TextInput
            label="Main Ingredient Name"
            placeholder="Enter main ingredient name"
            {...form.getInputProps('mainIngredientName')}
            mb="md"
          />

          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            {...form.getInputProps('mainIngredientQuantity')}
            mb="md"
          />

          <Select
            label="UOM"
            placeholder="Select unit"
            data={UOM}
            {...form.getInputProps('mainIngredientUnit')}
            mb="md"
          />
        </div>

        <Group justify="flex-end" mb="md">
          <Button type="button" onClick={addIngredient} color="teal">
            Add Ingredient
          </Button>
        </Group>

        <div className={styles.ingredients}>
          <div className={styles.header}>
            <span>Ingredient Name</span>
            <span>Quantity</span>
            <span>UOM</span>
            <span>Action</span>
          </div>
          {form.getValues().ingredients.map((ingredient, index) => {
            return (
              <div key={ingredient.key} className={styles.row}>
                <TextInput
                  placeholder="Enter ingredient name"
                  {...form.getInputProps(
                    `${RecipeKeys.ingredients}.${index}.${IngredientKeys.name}`,
                  )}
                />

                <NumberInput
                  placeholder="Enter quantity"
                  {...form.getInputProps(
                    `${RecipeKeys.ingredients}.${index}.${IngredientKeys.quantity}`,
                  )}
                />

                <Select
                  placeholder="Select unit"
                  data={UOM}
                  {...form.getInputProps(
                    `${RecipeKeys.ingredients}.${index}.${IngredientKeys.unitOfMeasurement}`,
                  )}
                />

                <div
                  className={styles.deleteButton}
                  data-testid="delete-ingredient"
                  onClick={() =>
                    form.removeListItem(RecipeKeys.ingredients, index)
                  }
                >
                  <Trash2 />
                </div>
              </div>
            );
          })}
        </div>

        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <Group justify="flex-end" mt="lg">
          <Button
            variant="outline"
            onClick={() => router.push(`/recipe/${recipeID}`)}
          >
            Cancel
          </Button>
          <Button type="submit" color="blue">
            Save Changes
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EditRecipe;
