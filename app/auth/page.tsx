'use client';
import { FC, useState } from 'react';

import {
  signInWithEmailAndPassword /* User */,
} from '@firebase/auth';
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
} from '@mantine/core';
import { auth } from '@/utils/firebase'; // Импортируйте инициализацию Firebase
import Link from 'next/link';

import styles from './page.module.scss';

export interface ILoginData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm<ILoginData>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isNotEmpty('Field required'),
      password: isNotEmpty('Field required'),
    },
    onValuesChange: (values) => {
      form.validate();
      console.log('onValuesChange', values);
    },
  });

  const { values } = form;
  console.log('values', values);

  const [errorMsg, setErrorMsg] = useState('');
  // const [thisUser, setThisUser] = useState({} as User);

  const handleLogin = async (email: string, password: string) => {
    setErrorMsg('');
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log('user', user, 'values', values);
      // const currentUser: User = user.user;
      // setThisUser(currentUser);
      // addCurrentUserToStore(currentUser);
      // add to store isAutorization true
      // setAuth(true); // todo
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Ошибка входа');
      }
    }

    form.reset();
  };

  return (
    <div className={styles.auth}>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(JSON.stringify(values, null, 2));
          const { email, password } = values;
          handleLogin(email, password);
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
          placeholder="password"
          label="Password"
          defaultValue="secret"
          visible={visible}
          onVisibilityChange={toggle}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        {errorMsg && <div className="error"> {errorMsg} </div>}

        <Group justify="center" mb="xs">
          <Button
            mt="md"
            onClick={
              () => form.reset()
              // form.setValues({
              //   email: '',
              //   password: '',
              // })
            }
          >
            Clear
          </Button>

          <Button type="submit" mt="md">
            Login
          </Button>
        </Group>
      </form>

      <div className={styles.registration}>
        Don&apos;t have an account?
        <Link
          className={styles.registrationLink}
          href="'registration"
        >
          Registration.
        </Link>
      </div>
    </div>
  );
};

export default Auth;
