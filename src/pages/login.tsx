import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import { LoginMutation } from '../__generated__/graphql';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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
    formState: { errors },
  } = useForm<ILoginForm>();
  const [loginMutation, { data }] = useMutation<LoginMutation>(LOGIN_MUTATION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-lg rounded-lg bg-white pb-7 pt-10 text-center">
        <h3 className="text-2xl text-gray-800">login</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid gap-3 px-5"
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
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
