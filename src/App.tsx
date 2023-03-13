import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Callback, EasyGuard, EasyProvider, useApp } from "@jhnnsrs/arkitekt";
import { MultiWell } from "./components/MultiWell";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UnkoverProvider } from "@jhnnsrs/unkover";

export const Test = () => {
  const { manifest } = useApp();

  return (
    <>
      <h1>
        {manifest.identifier}:{manifest.version}
      </h1>
      <div className="font-light">Lets look at your latest images</div>
      <EasyGuard>
        <MultiWell />
      </EasyGuard>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <EasyProvider
        manifest={{
          identifier: "github.io.jhnnsrs.arkitekt",
          version: "latest",
        }}
      >
        <UnkoverProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Test />} />
              <Route path="/callback" element={<Callback autoClose={true} />} />
            </Routes>
          </Router>
        </UnkoverProvider>
      </EasyProvider>
    </div>
  );
}

export default App;
