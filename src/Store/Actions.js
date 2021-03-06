export const Select = () => ({ type: 'SELECT' });

export const Update = (playerData) => ({ type: 'UPDATE', val: playerData });

export const Letters = (letters) => ({ type: 'LETTERS', val: letters });

export const GameId = (gameId) => ({ type: 'GAMEID', val: gameId });

export const wordToGuess = (word) => ({ type: 'WORD', val: word });
