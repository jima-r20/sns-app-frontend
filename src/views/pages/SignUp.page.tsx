import React from 'react';

import * as H from 'history';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const SignUpPage: React.FC<Props> = (props: Props) => {

  return (
    <div>
      This is SignUp page
      <button onClick={() => props.history.push('/signin')}>SignIn</button>
    </div>
  );
};

export default SignUpPage;
