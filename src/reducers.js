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
  /*   console.log(
    "localeyaz",
    window.localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data))
  ); */
  localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data));
}

function localStorageStateOku(key) {
  console.log("localden oku", JSON.parse(localStorage.getItem(key)));
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);
  console.log("eskinot", eskiNotlar);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

const memur = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case INITIAL_LOAD:
      return {
        ...state,
        notlar: baslangicNotlariniGetir(s10chLocalStorageKey).notlar,
      };
    case NOT_EKLE:
      let newNote = action.payload;
      let copyNotes = [...state.notlar];
      let resultNotesArray = [...copyNotes, newNote];
      let UpdatedState = {
        ...state,
        notlar: [...resultNotesArray],
      };
      localStorageStateYaz(UpdatedState);

      return UpdatedState;

    case NOT_SIL:
      let selectedNote = action.payload;
      let copyNotes2 = [...state.notlar];
      let resultNotesArray2 = copyNotes2.filter(
        (note) => note.id !== selectedNote
      );
      console.log("casenotsil", action.payload, copyNotes2);
      /*  localStorageStateYaz([...resultNotesArray2]); */
      console.log("locali oku", resultNotesArray2);

      let UpdatedState2 = {
        ...state,
        notlar: resultNotesArray2,
      };
      localStorageStateYaz(UpdatedState2);

      return UpdatedState2;

    default:
      return state;
  }
};

export default memur;
