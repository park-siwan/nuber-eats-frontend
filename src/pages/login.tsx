import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import {
  LoginMutation,
  LoginMutationVariables,
} from '../__generated__/graphql';
import nuberLogo from '../image/logo.svg';
import Button from '../components/button';
const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] =
    useMutation<LoginMutation>(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-28">
      <div className="flex w-full max-w-screen-sm flex-col items-center rounded-lg px-5">
        <img src={nuberLogo} className="mb-10 w-52" alt="logo" />
        <h4 className="m-5 w-full text-left text-3xl font-medium">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 mt-5 grid w-full gap-3"
        >
          <input
            placeholder="Email"
            className="input"
            required
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            placeholder="Password"
            className="input"
            required
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 10,
                message: 'Password must be more than 10 chars.',
              },
            })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {/* <button className="btn">{loading ? 'Loading...' : 'Log In'}</button> */}
          <Button canClick={isValid} loading={loading} actionText="Log in" />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
