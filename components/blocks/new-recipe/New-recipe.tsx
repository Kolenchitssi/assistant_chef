'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  addDoc,
  collection,
  getFirestore,
} from '@firebase/firestore';
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
import Image from 'next/image';
import {
  type IRecipe,
  IngredientKeys,
  RecipeKeys,
} from '@/core/recipe';
import { uploadFile } from '@/utils/upload-file/upload-file';

import styles from './New-recipe.module.scss';
import {
  INGREDIENT_INITIAL_VALUE,
  UOM,
} from '@/core/recipe/recipe.constants';

const NewRecipe: FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleFileInputChange = (file: File | null) => {
    setFile(file);
    if (file) {
      const fileLink = URL.createObjectURL(file);
      setImgUrl(fileLink);
    } else {
      form.setFieldValue(RecipeKeys.imgUrl, '');
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const imgUrl = file ? await uploadFile(file) : '';
      const recipe: IRecipe = {
        [RecipeKeys.recipeName]: values[RecipeKeys.recipeName],
        [RecipeKeys.recipeDescription]:
          values[RecipeKeys.recipeDescription],
        [RecipeKeys.ingredients]: values[RecipeKeys.ingredients],
        [RecipeKeys.mainIngredient]: {
          key: randomId(),
          name: values.mainIngredientName,
          quantity: values.mainIngredientQuantity,
          unitOfMeasurement: values.mainIngredientUnit,
        },
        [RecipeKeys.imgUrl]: imgUrl,
      };

      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'recipes'), recipe);
      router.push(`/recipe/${docRef.id}`);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Error creating recipe',
      );
    }
  };

  const addIngredient = () => {
    form.insertListItem(RecipeKeys.ingredients, {
      ...INGREDIENT_INITIAL_VALUE,
      [IngredientKeys.key]: randomId(),
    });
  };

  return (
    <div className={styles.recipe}>
      <h2>Create New Recipe</h2>
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

        <Group justify="flex-end">
          <Button type="submit" color="blue">
            Create Recipe
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default NewRecipe;
