import { useState } from "react";
import Train from "./train/Train";
import TrainBokeh from "./train/TrainBokeh";

function App() {
  const [chosen, setChosen] = useState(1);

  const project = () => {
    switch (chosen) {
      case 1:
        return <Train />;
      case 2:
        return <TrainBokeh />;

      default:
        return <Train />;
    }
  };

  return (
    <>
      {
        <div className="navigation">
          <div
            onClick={() => setChosen(1)}
            className={`navigation_item ${
              chosen === 1 ? "navigation_item-active" : ""
            }`}
          >
            Train
          </div>
          <div
            onClick={() => setChosen(2)}
            className={`navigation_item ${
              chosen === 2 ? "navigation_item-active" : ""
            }`}
          >
            Train ( Bokeh )
          </div>
        </div>
      }

      {project()}
    </>
  );
}

export default App;
