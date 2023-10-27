import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

let accessToken = '';
const backendURL = process.env.REACT_APP_BACKEND_URL;
const loginURL = `${backendURL}/users/login`;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const [userIdSent, setUserIdSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !userIdSent) {
      // Verificar si el usuario está autenticado
      if (isAuthenticated) {
        // Obtener el token de acceso de forma silenciosa
        getAccessTokenSilently().then((accessToken) => {
          // Ahora puedes usar el token de acceso en tus solicitudes API
        });
      }
      const userObj = { userId: user.sub };
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios
        .post(loginURL, userObj)
        .then((response) => {
          // console.log(response);
          console.log('User sent to backend');
        })
        .catch((error) => {
          console.error('Error al enviar user al backend', error);
        });

      setUserIdSent(true);
    }
  }, [isAuthenticated, user, userIdSent, getAccessTokenSilently]);

  return (
    !isAuthenticated && (
      <button className="login-button" onClick={() => loginWithRedirect()}>
        LOG IN
      </button>
    )
  );
};

export default LoginButton;
