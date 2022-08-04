import {FormEvent, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import Logo from '../../components/logo/logo';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {changeCity} from '../../store/app-process/app-process';

function Login(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }

  }, [authorizationStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null
    ) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      } as AuthData));
    }
  };

  const validatePassword = () => {
    const passwordConstrain = /^(?:\d+[a-z]|[a-z]+\d)[a-z\d]*$/i;

    if (passwordRef.current !== null) {
      const password = passwordRef.current.value.trim();
      if (!passwordConstrain.test(password)) {
        passwordRef.current.setCustomValidity('Password must contain at least one letter and one number');
        return;
      }

      passwordRef.current.setCustomValidity('');
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  onChange={validatePassword}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={'/'}
                onClick={() => {
                  dispatch(changeCity(randomCity));
                }}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
