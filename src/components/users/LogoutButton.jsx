import { useAuth0 } from "@auth0/auth0-react";
// import "./LoginPage.css";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button className="login-button" onClick={() => logout()}>
                Log Out
            </button>
        )
    );
};

export default LogoutButton;