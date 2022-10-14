import { addNote, getAllNotes, Note } from "./db/db";

function setStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  for (const key of Object.keys(style)) {
    el.style[key] = style[key];
  }
}

async function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
  }

  const root = document.getElementById("root");
  if (!root) {
    return;
  }

  setStyle(root, {
    maxWidth: "800px",
    width: "100%",
    margin: "0 auto",
  });

  const noteList = document.createElement("div");
  setStyle(noteList, {
    height: "calc(100vh - 50px)",
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column-reverse",
  });
  root.append(noteList);

  const input = document.createElement("input");
  input.autofocus = true;
  setStyle(input, {
    width: "100%",
    height: "30px",
    padding: "10px",
  });
  root.append(input);

  const NoteListItem = (note: Note) => {
    const noteDiv = document.createElement("div");
    noteDiv.innerText = note.body || "";
    noteList.prepend(noteDiv);
  };

  document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      if (!input.value) {
        noteList.innerHTML = "";
      } else if (!e.shiftKey) {
        const note = await addNote({
          body: input.value,
        });

        input.value = "";

        NoteListItem(note);
      }
    }
  });

  const notes = await getAllNotes();
  const sortedNotes = notes.sort((a, b) => {
    return (a.createdAt as any).getTime() - (b.createdAt as any).getTime();
  });
  for (const note of sortedNotes) {
    NoteListItem(note);
  }
}

init();
