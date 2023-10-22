import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { UserRole } from '../__generated__/graphql';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { FormError } from '../components/form-error';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import nuberLogo from '../images/logo.svg';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;
interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CreateAccount = () => {
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const onSubmit = () => {};
  console.log(watch());
  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={nuberLogo} className="mb-10 w-52" alt="logo" />
        <h4 className="mb-5 w-full text-left text-3xl font-medium">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 mt-5 grid w-full gap-3"
        >
          <input
            {...register('email', { required: 'Email is required' })}
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register('password', { required: 'Password is required' })}
            required
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <select {...register('role', { required: true })} className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={false}
            actionText={'Create Account'}
          />
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
