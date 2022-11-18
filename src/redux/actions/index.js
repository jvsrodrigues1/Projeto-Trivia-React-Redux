import { GET_PLAYER, UPDATE_SCORE, CONFIG_URL } from './actionTypes';

const getPlayerAction = (name, gravatarEmail) => ({
  type: GET_PLAYER,
  payload: {
    name, gravatarEmail,
  },
});

const getUpdatedScore = (questionScore, assertion) => ({
  type: UPDATE_SCORE,
  payload: {
    questionScore,
    assertion,
  },
});

const getUpdatedUrl = (configGame) => ({
  type: CONFIG_URL,
  payload: { ...configGame },
});

export {
  getPlayerAction,
  getUpdatedScore,
  getUpdatedUrl,
};
