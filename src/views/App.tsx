import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/SignIn.page';
import SignUpPage from './pages/SignUp.page';
import TopPage from './pages/Top.page';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route path="/signin/" component={SignInPage} />
          <Route path="/signup/" component={SignUpPage} />
          <Route path="/top/" component={TopPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
