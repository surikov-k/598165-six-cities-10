import {Link} from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className="page">
      <main
        className="page__main"
        style={{height: '100vh'}}
      >
        <section className="property">
          <div className="property__container container">
            <div
              className="property__wrapper"
              style={{marginTop: '350px'}}
            >
              <div className="property__mark">
                <span>404</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  The page you&apos;re looking for wasn&apos;t found
                </h1>
                <Link
                  className="header__logo-link" to="/"
                  style={{display: 'block', margin: '0 auto', textAlign:'center'}}
                >
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
