import { useState } from "react";
import CarBasic from "./CarBasic";
import CarComplex from "./car-complex/CarComplex";
import Tokyo from "./Tokyo";

function App() {
  const [chosen, setChosen] = useState(1);

  const project = () => {
    switch (chosen) {
      case 1:
        return <CarBasic />;
      case 2:
        return <Tokyo />;
      case 3:
        return <CarComplex />;

      default:
        return <CarBasic />;
    }
  };

  return (
    <>
      <div className="navigation">
        <div
          onClick={() => setChosen(1)}
          className={`navigation_item ${
            chosen === 1 ? "navigation_item-active" : ""
          }`}
        >
          Car Basic
        </div>
        <div
          onClick={() => setChosen(2)}
          className={`navigation_item ${
            chosen === 2 ? "navigation_item-active" : ""
          }`}
        >
          Tokyo ( Scrollable )
        </div>
        <div
          onClick={() => setChosen(3)}
          className={`navigation_item ${
            chosen === 3 ? "navigation_item-active" : ""
          }`}
        >
          Car Complex
        </div>
      </div>

      {project()}
    </>
  );
}

export default App;
