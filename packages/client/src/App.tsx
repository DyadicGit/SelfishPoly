import React, { FC, ReactNode } from "react";
import { CylonLoadingBar, ErrorView, SkeletonList } from "./components";
import { useLoadGlobalState } from "./providers/hooks";
import { useGlobalState } from "./providers/GlobalStateProvider";
import { EditableListItem } from "./components/EditableListItem";
import s from "./components/components.module.scss";
import { CreationPanel } from "./components/CreationPanel";
import { ErrorResponse } from "./providers/utils";

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

  if (error && typeof error === "string") {
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
      <CreationPanel />
      <ul className={s.list}>
        {notes?.map((note) => (
          <EditableListItem key={note.id} {...note}></EditableListItem>
        ))}
      </ul>
    </Base>
  );
}

export default App;
