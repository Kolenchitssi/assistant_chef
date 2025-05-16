// export const uploadFile = async (file: File) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const res = await fetch('/api/upload', {
//     method: 'POST',
//     body: formData,
//   });
//   const data = await res.json();
//   // data.url - публичная ссылка на изображение
//   return data.url;
// };

export const uploadFile = async (
  file: File,
): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      // Обрабатываем ошибку ответа сервера
      console.error('Ошибка загрузки:', res.statusText);
      return null;
    }

    const data: { url?: string; error?: string } = await res.json();

    if (data.url) {
      return data.url; // публичная ссылка на изображение
    } else {
      console.error('Ошибка ответа:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Ошибка сети:', error);
    return null;
  }
};
