import React from 'react';

import * as H from 'history';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const SignInPage: React.FC<Props> = (props: Props) => {

  return (
    <div>
      This is SignIn page
      <button onClick={() => props.history.push('/signup')}>SignUp</button>
    </div>
  );
};

export default SignInPage;
