import {useAppSelector} from '../../hooks';
import './error-message.css';
import {getError} from '../../store/app-data/selectors';

const ErrorMessage = (): JSX.Element | null => {
  const error = useAppSelector(getError);
  return (error)
    ?
    <div className="error-message">
      <span>{error}</span>
    </div>
    : null;
};

export default ErrorMessage;
