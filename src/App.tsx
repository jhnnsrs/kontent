import { gql } from "@apollo/client";
import { Callback, EasyGuard, EasyProvider, useApp } from "@jhnnsrs/arkitekt";
import { useDatalayer } from "@jhnnsrs/datalayer";
import { useMikroQuery } from "@jhnnsrs/mikro";
import { TwoDKanvas, UnkoverProvider } from "@jhnnsrs/unkover";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

export const Image = ({ rep }: { rep: any }) => {
  const { s3resolve } = useDatalayer();

  return (
    <div className="rounded rounded-md overflow-hidden text-black flex flex-col">
      <TwoDKanvas path={s3resolve(rep.store)} shape={rep.shape} />
    </div>
  );
};

export const ImageGrid = () => {
  const { data } = useMikroQuery(gql`
    query {
      myrepresentations(limit: 3) {
        id
        name
        shape
        store
      }
    }
  `);

  return (
    <div className="grid grid-cols-3 gap-2 mt-1 ">
      {data?.representations?.map((r: any, index: number) => (
        <Image rep={r} key={index} />
      ))}
    </div>
  );
};

export const Test = () => {
  const { manifest } = useApp();

  return (
    <>
      <h1>
        {manifest.identifier}:{manifest.version}
      </h1>
      <div className="font-light">Lets look at your latest images</div>
      <EasyGuard>
        <ImageGrid />
      </EasyGuard>
    </>
  );
};

function App() {
  // This demo app uses the arkitekt easy provider
  // which enables the app manifest, configuration
  // retrieval anf authentication, as well as the
  // mikro service automatically.

  // For more information on the easy provider
  // see

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
