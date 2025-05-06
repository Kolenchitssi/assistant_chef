import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const writingImageToFirebase = (imageFile: File) => {
  const storage = getStorage();

  // Create a reference to 'mountains.jpg'
  const mountainImagesRef = ref(storage, `images/${imageFile.name}`);

  // 'file' comes from the Blob or File API
  uploadBytes(mountainImagesRef, imageFile).then(() => {
    console.log('Uploaded a blob or file!');
  });
  return mountainImagesRef;
};
