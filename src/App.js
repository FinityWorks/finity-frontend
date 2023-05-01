import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const data = [
  {
    x: ["2022-01-01", "2022-01-02", "2022-01-03", "2022-01-04"],
    open: [100, 110, 120, 130],
    high: [120, 130, 140, 150],
    low: [90, 100, 110, 120],
    close: [110, 120, 130, 140],
    type: "candlestick",
    name: "Candlestick Chart",
  },
];

const layout = {
  title: "Bars",
  xaxis: {
    title: "Index",
  },
  yaxis: {
    title: "Price",
  },
};

function CandlestickChart({ data, layout }) {
  return <Plot data={data} layout={layout} />;
}

function App() {
  const [bars, setBars] = useState({});
  const [layout, setLayout] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tick_imbal/")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.layout);
        setBars([data.bars]);
        setLayout(data.layout);
      });
  }, []);

  return (
    <div className="App">
      <CandlestickChart data={bars} layout={layout} />
    </div>
  );
}

export default App;
