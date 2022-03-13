import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
function App() {
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);

  // ! addNote
  const addNote = async () => {
    // console.warn(note);
    if (note) {
      Axios.post("https://shah-todo-app.herokuapp.com/addnote", {
        note: note,
      })
        .then((res) => {
          setNoteList([...noteList, { note }]);
          setNote("");
        })
        .catch(() => {
          alert("Not Added");
        });
    } else {
      alert("plz fill all the feild");
    }
  };
  // ! update function
  const updateVal = (id) => {
    console.log(id);
    const newNote = prompt("Update your note here...");
    if (newNote) {
      Axios.put("https://shah-todo-app.herokuapp.com/update", {
        id: id,
        newNote: newNote,
      })
        .then(() => {
          setNoteList(
            noteList.map((val) => {
              return val._id == id ? { _id: id, note: newNote } : val;
            })
          );
        })
        .catch(() => {
          console.log("ERROR");
        });
    } else {
      alert("Your note can't be empty Please do write something");
    }
  };
  // ! Delete function

  const deleteNote = (id) => {
    console.log(id);
    Axios.delete(`https://shah-todo-app.herokuapp.com/${id}`).then(() => {
      setNoteList(
        noteList.filter((val) => {
          return val._id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("https://shah-todo-app.herokuapp.com/read")
      .then((res) => {
        setNoteList(res.data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);
  return (
    <div className="App">
      <div className="inputBox">
        <textarea
          name="note"
          cols="26"
          rows="10"
          value={note}
          placeholder="Write your Note here...."
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button onClick={addNote}> Add Note</button>
      </div>
      <div className="notelist">
        {noteList.map((val, index) => {
          return (
            <div className="note" key={index}>
              <h3 className="no">{index + 1}.</h3>
              <h3 className="notebox">{val.note}</h3>
              <div className="btns">
                <button
                  className="rm"
                  onClick={() => {
                    updateVal(val._id);
                  }}
                >
                  Upadate
                </button>
                <button
                  id="deletebtn"
                  onClick={() => {
                    deleteNote(val._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
