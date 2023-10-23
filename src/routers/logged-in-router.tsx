import { gql, useQuery } from '@apollo/client';
import { MeQuery } from '../__generated__/graphql';

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;
export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h1>{data.me.email}</h1>
    </div>
  );
};
