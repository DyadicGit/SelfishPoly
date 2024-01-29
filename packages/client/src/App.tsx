import React, { Suspense } from "react";
import { CylonLoadingBar } from "./components";
import { useLoadGlobalState } from "./providers/hooks";
import { useGlobalState } from "./providers/GlobalStateProvider";
import { ErrorView } from "./components/ErrorView";

function App() {
  useLoadGlobalState();
  const globalState = useGlobalState();
  const { notes, error, isLoading } = globalState;

  if (error) {
    return <ErrorView />;
  }

  return (
    <main>
      {isLoading && <CylonLoadingBar />}
      <h1>SelfishPoly</h1>
      <ul>
        {notes?.map((note) => (
          <li>{note.text}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
