import CellContainer from './components/CellContainer';
// import Navbar from './components/Navbar';

function App() {
  return (
    <main className="h-screen w-screen">
      <section className="h-[calc(100vh-2rem)] overflow-y-hidden">
        <CellContainer></CellContainer>
      </section>
      <footer className="h-[2rem]">heloo</footer>
    </main>
  );
}

export default App;
