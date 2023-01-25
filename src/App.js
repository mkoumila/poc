import { useState } from "react";
import CarBasic from "./car-basic/CarBasic";
import CarComplex from "./car-complex/CarComplex";
import Tokyo from "./tokyo/Tokyo";
import Ball from "./ball/Ball";

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
      case 4:
        return <Ball />;

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
        <div
          onClick={() => setChosen(4)}
          className={`navigation_item ${
            chosen === 4 ? "navigation_item-active" : ""
          }`}
        >
          Ball
        </div>
      </div>

      {project()}
    </>
  );
}

export default App;
