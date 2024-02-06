import React, { FC, ReactNode } from "react";
import { CylonLoadingBar, SkeletonList } from "./components";
import { useLoadGlobalState } from "./providers/hooks";
import { useGlobalState } from "./providers/GlobalStateProvider";
import { EditableListItem } from "./page/EditableListItem";
import s from "./page/page.module.scss";
import { CreationPanel } from "./page/CreationPanel";
import { ErrorView } from "./page/ErrorView";
import { ChatBox } from "./page/Chat/ChatBox";

const Base: FC<{ children: ReactNode }> = ({ children }) => (
  <main>
    <h1 hidden={true}>SelfishPoly</h1>
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
      <ChatBox />
    </Base>
  );
}

export default App;
