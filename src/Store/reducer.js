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

function Reducer(action, state = initialState) {
  switch (action.type) {
    case 'SELECT': {
      return { ...state, cont: state.cont + action.val };
    }
    case 'UPDATE': {
      return { ...state, cont: state.cont - action.val };
    }
    default:
      return state;
  }
}

export default Reducer;
