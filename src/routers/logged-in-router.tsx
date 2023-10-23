import { gql, useQuery } from '@apollo/client';
import { MeQuery } from '../__generated__/graphql';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];
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
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Redirect from="/potato" to="/" />
      </Switch>
    </Router>
  );
};
