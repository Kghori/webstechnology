import React from 'react';
import { useNavigate } from 'react-router-dom';

function User_logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove userId and username from session storage
    sessionStorage.removeItem('inuserId');
    sessionStorage.removeItem('inusername');

    // Navigate to the Login component
    navigate('/user_login');
    window.location.reload();
  };

  // Call handleLogout when the component mounts
  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <h1>logout</h1>
    </>
  );
}

export default User_logout;
