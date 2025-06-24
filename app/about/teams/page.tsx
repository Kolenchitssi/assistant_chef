import type { Metadata } from 'next';

async function getData() {
  // получение данных для статической страницы серверного компонента
  // этот фетч отрабатывает на серверe и отличается от того что в браузере

  const fetchResponse = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    // доп настройки для кэширования
    {
      next: {
        revalidate: 60, // сервер будет отправлять запрос каждые 60 секунд ля обновления
      },
    },
  );
  if (!fetchResponse.ok) throw new Error('Sorry we have error');
  const result = await fetchResponse.json();
  console.log('result', result);
  return result;
}

// post запрос
/*
async function sendVerificationRequest(data) {
  const apiUrl = 'https://yourapi.com/verify';
  try {
    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(fetchResponse.json());
    return fetchResponse.json(); // Attempting another operation here could cause the error
  } catch (error) {
    console.error('Verification failed:', error);
    return { success: false };
  }
}*/

// серверные компоненты могут быть асинхронными

export const metadata: Metadata = {
  title: 'About Teams Assistant Chef',
  description: 'Information about Teams Assistant Chef',
};

export default async function About() {
  const data = (await getData()) || [];
  return (
    <>
      <h2>Teams</h2>;
      <ul>
        {data.map(
          (item: { id: string; title: string }, index: number) => (
            <li key={index}>
              id: {item.id} title: {item.title}
            </li>
          ),
        )}
      </ul>
    </>
  );
}
