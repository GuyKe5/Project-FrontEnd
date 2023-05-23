import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate("/");
    window.location.reload();
  }, []);

  return <>Signing out...</>;
}

export default SignOut;
