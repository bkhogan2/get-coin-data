import Container from "@material-ui/core/Container";
import CoinData from "./components/CoinData";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <h1 style={{textAlign: 'center'}}>Coin Data</h1>
        <CoinData />
      </Container>
    </>
  );
}

export default App;
