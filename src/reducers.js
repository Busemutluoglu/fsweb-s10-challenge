import { NOT_EKLE, NOT_SIL, INITIAL_LOAD } from "./actions";
const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(data) {
  console.log(
    "localeyaz",
    window.localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data))
  );
  window.localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data));
}

function localStorageStateOku() {
  console.log("localden oku", JSON.parse(window.localStorage.getItem("s10ch")));
  return JSON.parse(window.localStorage.getItem("s10ch"));
}

function baslangicNotlariniGetir() {
  const eskiNotlar = localStorage.getItem("s10ch");
  console.log("eskinotlar", eskiNotlar);

  if (eskiNotlar) {
    return localStorageStateOku();
  } else {
    return baslangicDegerleri;
  }
}

const memur = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case INITIAL_LOAD:
      return {
        ...state,
        notlar: baslangicNotlariniGetir(),
      };
    case NOT_EKLE:
      localStorageStateYaz([...state.notlar, action.payload]);

      let newNote = action.payload;
      let copyNotes = [...state.notlar];
      let resultNotesArray = [...copyNotes, newNote];
      return {
        ...state,
        notlar: [...resultNotesArray],
      };

    case NOT_SIL:
      let selectedNote = action.payload;
      let copyNotes2 = [...state.notlar];
      let resultNotesArray2 = copyNotes2.filter(
        (note) => note.id === selectedNote.id
      );
      localStorageStateYaz([...resultNotesArray2]);
      return {
        ...state,
        notlar: [...resultNotesArray2],
      };

    default:
      return state;
  }
};

export default memur;
