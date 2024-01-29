import React from 'react';
import { Note } from "@poly/domain";

const apiGetNotes = (): Promise<Note[]> => fetch('http://localhost:5000/api/notes',).then((res) => res.json());

function App() {
    apiGetNotes().then((notes: Note[]) => {console.log('%c /api/notes', 'color: yellow;', notes);})

    return (
        <main>
            <h1>SelfishPoly</h1>
            <code>OPEN DEVTOOLS CONSOLE</code>
        </main>
    );
}

export default App;
