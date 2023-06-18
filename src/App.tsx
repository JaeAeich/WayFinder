import CellContainer from './components/CellContainer';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="h-screen w-screen">
      <nav className="h-[4rem]">
        <Navbar></Navbar>
      </nav>
      <section className="h-[calc(100vh-6rem)] overflow-y-hidden">
        <CellContainer></CellContainer>
      </section>
      <footer className="h-[2rem]">heloo</footer>
    </main>
  );
}

export default App;
