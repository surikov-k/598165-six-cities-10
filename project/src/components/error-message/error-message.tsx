import {useAppSelector} from '../../hooks';
import './error-message.css';

const ErrorMessage = (): JSX.Element | null => {
  const error = useAppSelector((state) => state.error);
  return (error)
    ?
    <div className="error-message">
      <span>{error}</span>
    </div>
    : null;
};

export default ErrorMessage;
