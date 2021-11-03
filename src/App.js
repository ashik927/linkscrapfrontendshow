import './App.css';
import React, { useState } from 'react';

function App() {
  const [scrapData, setScrapData] = useState()
  const [loader, setLoader] = useState(false)
  const [getData, setGetData] = useState(false)
  const scrapUrl = (e) => {
    setLoader(true)
    console.log(e.target.value)
    const formData = new FormData();
    formData.append('linkData', e.target.value)
    fetch(`http://localhost:5000/linkscrap`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // var convertData = JSON.parse(data)
        setScrapData(JSON.parse(data.body))
        setLoader(false)
        setGetData(true)
      }).catch(err => console.log(err))
  }
  return (
    <>
      <div className="container">
        <div className="search-box">
          <input type="text" onChange={(e) => scrapUrl(e)} className="search-input" placeholder="Search.." />

          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {
          loader && <h6>Loading...</h6>
        }
       {getData && <div className="gallery">
          <h5>
            {scrapData?.title}
          </h5>
          <a>
            <img src={scrapData?.images} alt="Mountains" width="600" height="400" />
          </a>
          <div className="desc">{scrapData?.description}</div>
        </div>}
      </div>

    </>
  );
}

export default App;
