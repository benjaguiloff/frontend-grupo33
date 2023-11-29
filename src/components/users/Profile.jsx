import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let roles;
  if (user) {
    roles = user['https://arquisis-ifgg.me/roles']; // Si no es admin, devuelve un arreglo vacío
    console.log(roles);
  }
  
  // Verificar si el usuario está autenticado
  if (isAuthenticated) {
    // Obtener el token de acceso de forma silenciosa
    getAccessTokenSilently().then((accessToken) => {
      // Ahora puedes usar el token de acceso en tus solicitudes API
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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
          <p>{roles[0] === 'admin' ? 'Admin' : 'User'}</p>
          <LogoutButton />
          <div className='link'>
            <Link to="/buy_stocks" className='custom-link'>Acciones Disponibles</Link>
          </div>
          <div>
            <Link to="/stocks" className='custom-link'>Acciones Compradas</Link>
          </div>
          <div>
            <Link to="/received_proposals" className='custom-link'>Propuestas Recibidas</Link>
          </div>
          <div>
            <Link to="/auctions" className='custom-link'>Subastas</Link>
          </div>
          <div className='link'>
            <Link to="/wallet" className='custom-link'>Billetera Virtual</Link>
          </div>
          <div className='link'>
            <Link to="/companies" className='custom-link'>Empresas Disponibles</Link>
          </div>
          <div className='link'>
            <Link to="/predictions" className='custom-link'>Predicciones solicitadas</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
