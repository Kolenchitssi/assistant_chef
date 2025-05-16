import { Metadata } from 'next';

type TProps = {
  params: Promise<{ recipeID: string }>;
};

async function getData(id: string) {
  // получение данных для динамической страницы серверного компонента
  // этот фетч отрабатывает на серверe и отличается от того что в браузере
  try {
    const fetchResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      // доп настройки для кэширования
      {
        next: {
          revalidate: 60, // сервер будет отправлять запрос каждые 60 секунд для обновления
        },
      },
    );
    const result = await fetchResponse.json();
    // console.log('result', result);
    return result;
  } catch (error) {
    console.error('Get data failed:', error);
    return { success: false };
  }
}

export async function generateMetadata(
  props: TProps,
): Promise<Metadata> {
  const params = await props.params;

  const { recipeID } = params;

  // можем динамически получить данные
  const data = await getData(recipeID);
  return {
    title: `recipe ${recipeID} -dynamic-data: ${data.title}`,
  };
}

export default async function RecipeDetails(props: TProps) {
  const params = await props.params;

  const { recipeID } = params;

  const data = await getData(recipeID);
  return (
    <>
      <h2>Recipe Details {recipeID}</h2>
      <h3>title:{data.title}</h3>
      <p>text: {data.body}</p>
    </>
  );
}
