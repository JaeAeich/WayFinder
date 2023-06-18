import CellContainer from './components/CellContainer';

function App() {
  return (
    <main className="h-screen w-screen">
      <nav className="h-[4rem]">Welcome to WayFinder</nav>
      <section className="h-[calc(100vh-6rem)] overflow-y-hidden">
        <CellContainer></CellContainer>
      </section>
      <footer className="h-[2rem]">heloo</footer>
    </main>
  );
}

export default App;
