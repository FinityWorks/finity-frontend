import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { w3cwebsocket as WebSocket } from "websocket";

const socketUrl = "ws://127.0.0.1:8000/ws";
const socket = new WebSocket(socketUrl);

function CandlestickChart({ data, layout }) {
  layout = Object.assign({}, layout, {
    width: 2300,
    height: 1000,
    paper_bgcolor: "#222",
    plot_bgcolor: "#222",
    font: { color: "#fff" },
    xaxis: {
      gridcolor: "white",
      gridwidth: 1,
      rangeslider: { visible: false },
      title: "Bar ID",
      titlefont: {
        family: "Arial",
        size: 18,
        color: "#fff",
      },
    },
    yaxis: {
      gridcolor: "white",
      gridwidth: 1,
      title: "Price",
      titlefont: {
        family: "Arial",
        size: 18,
        color: "#fff",
      },
    },
  });
  return <Plot data={data} layout={layout} />;
}

function App() {
  const [bars, setBars] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    socket.onopen = () => console.log("socket connected");
    socket.onclose = () => console.log("socket disconnected");
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setBars([newData.bars]);
      setLayout(newData.layout);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ color: "#fff" }}>Live prices</h1>
      </div>
      <CandlestickChart data={bars} layout={layout} />
    </div>
  );
}

export default App;
