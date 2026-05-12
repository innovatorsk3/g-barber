/* App.jsx — composes a click-through homepage. */

const App = () => {
  const [page, setPage] = React.useState("home");
  const handleCta = () => {
    document.getElementById("pricing")?.scrollIntoView({behavior: "smooth", block: "start"});
  };
  const homeData = window.HOME_DATA;
  return (
    <>
      <Header active={page} onNav={setPage} />
      <main style={{paddingTop: 0}}>
        <Hero data={homeData.hero} onCta={handleCta} />
        <About data={homeData.about} />
        <Services data={homeData.services} />
        <Pricing data={homeData.pricing} />
        <Team data={homeData.team} />
        <Gallery data={homeData.gallery} />
        <Branches data={homeData.branches} />
      </main>
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
