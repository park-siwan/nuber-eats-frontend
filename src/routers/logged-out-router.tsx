import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log(watch());
  };

  const onInvalid = () => {
    console.log('cant create account');
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
