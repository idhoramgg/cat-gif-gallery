import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import './App.css';




const News = styled.div`
  width: 300px;
  height: 420px;
  border: 1px solid #333;
  margin: 7px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 4px;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const ButtonFight = styled.button`
  padding: 5px 20px;
  background-color: red;
  color: white;
  border-radius: 4px;
`

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // useEffect(() => {
  //   const url = 'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=R4zqJ5ZHschneHIM3WHmkEuBdif2TkOU&limit=5';
  //   fetch(url)
  //   .then((resp) => resp.json())
  //   .then(function(data) {
  //     // Here you get the data to modify as you please
  //     console.log(data)
  //     })
  //   .catch(function(error) {
  //     // If there is any error you will catch them here
  //     console.log(error);
  //   }); 
  // }, []);

  useEffect(() => {
    const url = 'https://api.giphy.com/v1/gifs/search?q=cat&api_key=bFfqWyzMfgvrFe64ANpT4CArPqS6aGki&limit=20';
    axios.get(url)
    .then(function (result) {
      console.log(result, 'test')
      setData(result.data.data);
      setLoading(false);
    })
    .catch(function(error) {
      setError(true);
      console.log(error.message)
      setErrorMessage(error.message)
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h2>Choose Your Fighter</h2>
      <Container>
      {loading ? (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      ) : (
          error ? (
            <div>{errorMessage}</div>
          ) : (
              data.map((item, index) => (
              <News key={index}>
                <img src={item.images.original.url} style={{height: "300px", objectFit: 'cover', width: "300px"}} alt="imageww" />
                <h3>{item.title}</h3>
                <ButtonFight>Fight !</ButtonFight>
              </News>
            ))
          )
      )
      }
    </Container>
    </div>
  );
};

export default App;
