import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="profile">
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                </ul>
            </div>
        )
    );
};

export default Profile;