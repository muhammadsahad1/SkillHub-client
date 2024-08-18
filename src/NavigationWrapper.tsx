import { useNavigate } from 'react-router-dom';

interface NavigationWrapperProps {
  children: (navigate: ReturnType<typeof useNavigate>) => React.ReactNode;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  return <>{children(navigate)}</>;
};

export default NavigationWrapper;