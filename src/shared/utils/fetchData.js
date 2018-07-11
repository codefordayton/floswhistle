// const fetchData = callback => fetch('https://api.floswhistle.com/v1/data')
const fetchData = callback => fetch('http://localhost:8080/v1/data')
  .then(res => res.json())
  .then(callback);

export default fetchData;
