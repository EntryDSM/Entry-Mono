import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return null;
};
