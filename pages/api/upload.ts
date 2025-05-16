// pages/api/upload
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // отключаем встроенную обработку тела
  },
};

interface ResponseData {
  url?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const form = new IncomingForm();

  // Папка для хранения загруженных файлов
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка при парсинге файла' });
      return;
    }

    const file = Array.isArray(files.file)
      ? files.file[0]
      : files.file;

    if (!file || !file.filepath) {
      return res
        .status(400)
        .json({ error: 'Файл не передан или некорректен' });
    }

    const filename = `${Date.now()}_${file.originalFilename}`;
    const destPath = path.join(uploadDir, filename);

    try {
      // Переносим файл в папку uploads
      fs.copyFileSync(file.filepath, destPath);
      // Возвращаем публичный URL
      const fileUrl = `/uploads/${filename}`;
      res.status(200).json({ url: fileUrl });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Ошибка при сохранении файла' });
    }
  });
}
