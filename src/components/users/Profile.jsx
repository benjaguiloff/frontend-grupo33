import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Verificar si el usuario está autenticado
  if (isAuthenticated) {
    // Obtener el token de acceso de forma silenciosa
    getAccessTokenSilently().then((accessToken) => {
      // Ahora puedes usar el token de acceso en tus solicitudes API
      console.log('Token de acceso:', accessToken);
    });
  }

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="card">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user?.name}
              style={{ width: '100%' }}
            />
          )}
          <h3 className="username">{user.name}</h3>
          <p className="title">@{user.nickname}</p>
          <p className="contact">{user.email}</p>
          <LogoutButton />
        </div>
      </div>
    )
  );
};

export default Profile;
