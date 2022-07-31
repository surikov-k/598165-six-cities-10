const LoadingScreen = (): JSX.Element => (
  <div className="page">
    <main
      className="page__main"
      style={{height: '100vh', display: 'grid', placeContent: 'center'}}
    >
      <section className="property">
        <div className="property__container container">
          <div
            className="property__wrapper"
          >
            <img
              style={{display: 'block', margin: '0 auto', textAlign: 'center'}}
              className="header__logo" src="img/spinner.svg"
              alt="6 cities logo" width="81" height="41"
            />
            <div className="property__name-wrapper">
              <h1 className="property__name">
                The offers are loading...
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);
export default LoadingScreen;
