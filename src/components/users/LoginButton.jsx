import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button className="login-button" onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    );
};

export default LoginButton;