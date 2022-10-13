import { addNote, getAllNotes, Note } from "./db/db";

async function init() {
  const root = document.getElementById("root");
  if (!root) {
    return;
  }

  const noteList = document.createElement("div");
  root.append(noteList);

  const input = document.createElement("input");
  root.append(input);

  const NoteListItem = (note: Note) => {
    const noteDiv = document.createElement("div");
    noteDiv.innerText = note.body || "";
    noteList.append(noteDiv);
  };

  document.addEventListener("keydown", async (e) => {
    if (!e.shiftKey && e.key === "Enter" && input.value) {
      const note = await addNote({
        body: input.value,
      });

      NoteListItem(note);
    }
  });

  const notes = await getAllNotes();
  for (const note of notes) {
    NoteListItem(note);
  }
}

init();
