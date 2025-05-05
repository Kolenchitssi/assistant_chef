'use client';

import { FC, useState } from 'react';

import Link from 'next/link';
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
  TextInput,
  PasswordInput,
  Button,
  Group,
} from '@mantine/core';

import styles from './page.module.scss';
import { useAppAction } from '@/core/store/hooks';

export interface IRegistrationData {
  email: string;
  name: string;
  photoURL: string;
  password1: string;
  password2: string;
}

const Registration: FC = () => {
  const router = useRouter();
  const { setUser, setIsAuth } = useAppAction();

  // For password field
  const [visible1, { toggle: toggle1 }] = useDisclosure(false);
  const [visible2, { toggle: toggle2 }] = useDisclosure(false);

  const form = useForm<IRegistrationData>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      photoURL: '',
      password1: '',
      password2: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password1: isNotEmpty('Field required'),
      password2: (value, values) => {
        if (!value) {
          return 'Field required';
        } else if (value !== values.password1) {
          return 'Passwords must match';
        }
      },
    },
    onValuesChange: (values) => {
      form.validate();
      console.log('onValuesChange', values);
    },
  });

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
        values.password1,
      );

      // Add values to fields  DB Firebase
      await updateProfile(user.user, {
        displayName: values.name,
        photoURL: values.photoURL || '',
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
        setErrorMsg('Ошибка входа');
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

  return (
    <div className={styles.registration}>
      <h2>Registration</h2>
      <form
        onSubmit={form.onSubmit(handleRegistration, (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        })}
      >
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
          visible={visible1}
          onVisibilityChange={toggle1}
          key={form.key('password1')}
          {...form.getInputProps('password1')}
        />

        <PasswordInput
          placeholder="Enter password"
          label="Confirm password"
          defaultValue="secret"
          visible={visible2}
          onVisibilityChange={toggle2}
          key={form.key('password2')}
          {...form.getInputProps('password2')}
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
