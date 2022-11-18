export const storedRanking = () => JSON.parse(localStorage.getItem('ranking'));

export const saveScorePlayer = (ranking) => {
  const data = storedRanking();
  localStorage.setItem('ranking', JSON.stringify([...data, ranking]));
};
