const initialState = {
  player: {
    nick: '',
    nombre: '',
    birthday: '',
    email: '',
    password: '',
    picture: '',
    partidasjugadas: 0,
    partidasganadas: 0,
    estado: 0,
    id: 0,
  },
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
    default:
      return state;
  }
}

export default Reducer;
