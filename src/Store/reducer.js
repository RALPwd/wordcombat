const initialState = {
  player: {
    nick: '',
    name: '',
    birthday: '',
    email: '',
    picture: '',
    gamePlayed: 0,
    gameWon: 0,
    state: 0,
    id: 0,
  },
  gameLetters: 5,
};

// eslint-disable-next-line default-param-last
function Reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT': {
      return { ...state };
    }
    case 'UPDATE': {
      return { ...state, player: action.val };
    }
    case 'LETTERS': {
      return { ...state, gameLetters: action.val };
    }
    default:
      return state;
  }
}

export default Reducer;
