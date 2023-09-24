import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// GET BACKEND_URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [userIdSent, setUserIdSent] = useState(false);
  useEffect(() => {
    if (isAuthenticated && user && !userIdSent) {
      const userObj = { userId: user.sub };
      axios
        .post(BACKEND_URL, userObj)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('Error al enviar user al backend', error);
        });

      setUserIdSent(true);
    }
  }, [isAuthenticated, user, userIdSent]);

  return (
    !isAuthenticated && (
      <button className="login-button" onClick={() => loginWithRedirect()}>
        LOG IN
      </button>
    )
  );
};

export default LoginButton;
