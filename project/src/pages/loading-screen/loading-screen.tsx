const LoadingScreen = (): JSX.Element => (
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
              <span>Loading</span>
            </div>
            <div className="property__name-wrapper">
              <h1 className="property__name">
                The offers are loading...
              </h1>

              <img
                style={{display: 'block', margin: '0 auto', textAlign:'center'}}
                className="header__logo" src="img/logo.svg"
                alt="6 cities logo" width="81" height="41"
              />

            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default LoadingScreen;
