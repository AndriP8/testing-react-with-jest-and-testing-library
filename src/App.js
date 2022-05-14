import "./App.css";
import Option from "./pages/entry/Option";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  return (
    <div className="App">
      <SummaryForm />
      <Option optionType={"scoops"} />
      <Option optionType={"toppings"} />
    </div>
  );
}

export default App;
