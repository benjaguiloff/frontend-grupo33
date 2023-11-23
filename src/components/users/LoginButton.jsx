import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const loginURL = `${backendURL}/users/login`;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const [userIdSent, setUserIdSent] = useState(false);
  let roles;
  if (user) {
    roles = user['https://arquisis-ifgg.me/roles']; // Si no es admin, devuelve un arreglo vacío
  }

  useEffect(() => {
    if (isAuthenticated && user && !userIdSent) {
      // Obtener el token de acceso de forma silenciosa
      getAccessTokenSilently()
        .then((token) => {
          const userObj = { userId: user.sub, roles: roles};
          axios
            .post(loginURL, userObj, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('User sent to backend');
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error al enviar user al backend', error);
              console.log("El token de acceso es", token);
            });

          setUserIdSent(true);
        })
        .catch((error) => {
          console.error('Error obteniendo el token', error);
        });
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
