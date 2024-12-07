import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  // State to manage loading status
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setIsLoggingOut(true); // Show loading spinner
      setTimeout(() => {
        localStorage.removeItem('accessToken');
        setIsLoggingOut(false); // Hide spinner after completion
        navigate('/'); // Redirect to home
      }, 3000); // 3-second delay for loading effect
    }
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken, navigate]);

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
            <a
                style={{ pointerEvents: 'none', color: 'blue', cursor: 'not-allowed' }}
                onClick={(e) => e.preventDefault()}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href='/main/movies'>Movies</a>
            </li>
            <li className='logout'>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <div className='outlet'>
          {isLoggingOut ? (
            <div className="loading-spinner"></div> // Show spinner during logout
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
