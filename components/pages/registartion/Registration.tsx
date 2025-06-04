'use client';

import { FC, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  addDoc,
  collection,
  getFirestore,
} from '@firebase/firestore';
// import { getDownloadURL } from '@firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import {
  FileInput,
  // Input,
  TextInput,
  PasswordInput,
  Button,
  Group,
} from '@mantine/core';
import { useAppAction } from '@/core/store/hooks';
import user from '@/assets/images/user.svg';
import { uploadFile } from '@/utils/upload-file/upload-file';

// import { writingImageToFirebase } from '@/utils/writingImageToFirebase/writingImageToFirebase';

import styles from './Registration.module.scss';
export interface IRegistrationData {
  email: string;
  name: string;
  photoURL: string;
  password: string;
  confirmPassword: string;
}

const Registration: FC = () => {
  const router = useRouter();
  const { setUser, setIsAuth } = useAppAction();

  // For password field
  const [visiblePassword, { toggle: toggle1 }] = useDisclosure(false);
  const [visibleConfirmPassword, { toggle: toggle2 }] =
    useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  // const [imgUrl, setImageUrl] = useState('');

  const form = useForm<IRegistrationData>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      photoURL: '',
      password: '',
      confirmPassword: '',
    },
    validateInputOnChange: true,
    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Field required'),
      confirmPassword: (value, values) => {
        if (!value) {
          return 'Field required';
        } else if (value !== values.password) {
          return 'Passwords must match';
        }
      },
    },
    onValuesChange: (values) => {
      // form.validate();
      console.log('onValuesChange', values);
    },
  });

  const { setFieldValue } = form;
  const values = form.getValues();
  console.log('values', values);

  const [errorMsg, setErrorMsg] = useState('');

  const auth = getAuth();
  const handleRegistration = async (values: IRegistrationData) => {
    try {
      // Create new user in DB Firebase
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const avatarLink = file ? await uploadFile(file) : null; // link img on server after save

      // Add values to fields  DB Firebase
      await updateProfile(user.user, {
        displayName: values.name,
        photoURL: avatarLink || '',
      });
      console.log(user);

      // Add to store
      setIsAuth(true);
      setUser(user.user);
      router.replace('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
        console.log(err.message);
      } else {
        setErrorMsg('Login error');
      }
    }

    // Add user to database allUsers
    await onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      addDoc(collection(db, 'allUsers'), {
        name: user?.displayName,
        email: user?.email,
        id: user?.uid,
        avatar: values.photoURL,
      });
    });

    form.reset();
  };

  /*   const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const avatarLink = file ? await uploadFile(file) : null;
			setUrlImage(avatarLink);
		}
	}; */

  const [urlImage, setUrlImage] = useState<string | null>('');

  const handleFileInputChange = /* async */ (file: File | null) => {
    setFile(file);
    if (file) {
      // const imagesRefs = writingImageToFirebase(file); // получаем ref  img файлa
      // const urlImg = await getDownloadURL(imagesRefs);
      console.log('urlImg-file', file); // получаем полный url картинки

      // Upload picture and get link
      const fileLink = URL.createObjectURL(file);
      setUrlImage(fileLink);
      // setFieldValue('photoURL', fileLink); // link for file in HDD
      // setFieldValue('photoURL', avatarLink || '');
      // setUrlImage(avatarLink);
    } else {
      setFieldValue('photoURL', '');
    }
  };

  return (
    <div className={styles.registration}>
      <h2>Registration</h2>
      <form
        onSubmit={form.onSubmit(handleRegistration, (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        })}
      >
        <div className={styles.avatar}>
          {urlImage ? (
            <Image
              src={urlImage}
              // src={values.photoURL}
              alt="logo"
              width={124}
              height={124}
            />
          ) : (
            <Image src={user} alt="logo" width={124} height={124} />
          )}
        </div>
        {/*  <Input
					type="file"
					accept=".jpg, .jpeg, .png"
					placeholder="Select photo"
					// {...form.getInputProps('photoURL')}
					onChange={handleFileChange}
				/>
 */}
        <FileInput
          accept=".jpg, .jpeg, .png"
          // label="Input label"
          description="Select photo for avatar"
          placeholder="Select photo"
          clearable
          // {...form.getInputProps('photoURL')}
          // {...form.getInputProps('avatar')}
          onChange={handleFileInputChange}
        />

        <TextInput
          mt="md"
          label="Name"
          placeholder="Name"
          key={form.key('name')}
          __clearable={true}
          {...form.getInputProps('name')}
        />

        <TextInput
          mt="md"
          label="Email"
          placeholder="Email"
          key={form.key('email')}
          __clearable={true}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          placeholder="Enter password"
          label="Password"
          defaultValue="secret"
          visible={visiblePassword}
          onVisibilityChange={toggle1}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          placeholder="Enter password"
          label="Confirm password"
          defaultValue="secret"
          visible={visibleConfirmPassword}
          onVisibilityChange={toggle2}
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        {errorMsg && <div className="error"> {errorMsg} </div>}

        <Group justify="center" mb="xs">
          <Button mt="md" onClick={() => form.reset()}>
            Clear
          </Button>

          <Button type="submit" mt="md">
            Register
          </Button>
        </Group>
      </form>

      <div className={styles.auth}>
        Have an account?
        <Link className={styles.authLink} href="auth">
          Login.
        </Link>
      </div>
    </div>
  );
};

export default Registration;
