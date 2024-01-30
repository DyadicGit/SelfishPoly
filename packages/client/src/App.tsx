import React, { FC, ReactNode } from "react";
import { CylonLoadingBar } from "./components";
import { useLoadGlobalState } from "./providers/hooks";
import { useGlobalState } from "./providers/GlobalStateProvider";
import { ErrorView } from "./components/ErrorView";
import { SkeletonList } from "./components/Skeletons/Skeletons";

const Base: FC<{ children: ReactNode }> = ({ children }) => (
  <main>
    <h1>SelfishPoly</h1>
    {children}
  </main>
);

function App() {
  useLoadGlobalState();
  const globalState = useGlobalState();
  const { notes, error, isLoading } = globalState;

  if (error) {
    return <ErrorView />;
  }

  if (isLoading && !notes.length) {
    return (
      <Base>
        <SkeletonList />
      </Base>
    );
  }

  return (
    <Base>
      <CylonLoadingBar />
      <ul>
        {notes?.map((note) => (
          <li>{note.text}</li>
        ))}
      </ul>
    </Base>
  );
}

export default App;
