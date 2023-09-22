import { useAuth0 } from "@auth0/auth0-react";
// import "./LoginPage.css";
import LogoutButton from "./LogoutButton";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="profile">
                <div className="card">
                    {user?.picture && <img src={user.picture} alt={user?.name} style={{width: "100%"}} />}
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