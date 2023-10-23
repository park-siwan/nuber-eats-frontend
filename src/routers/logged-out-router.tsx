import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAccount from '../pages/create-account';
import Login from '../pages/login';
import { NotFound } from '../pages/404';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
