// import { useState } from 'react'
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  // const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = 'dd8ln_-asBmyJ6ZwHWl79jCNkTtpSKXDmZkqUdv0mNc';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: searchTerm,
          },
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });
        console.log(response.data.results)
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };
    const loadRandom = async()=>{
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          }
        });
        console.log(response)
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
    else{
      loadRandom()
    }
  }, [searchTerm]);

  return (
    <div>
      <header className='header-top'>
        <p className='header-item name'>Image Galery</p>
        <input type="text" className='header-item1 search' placeholder={faSearch} value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <div className='header-top page-btn'>
          <p className='header-item'>Explore</p>
          <p className='header-item'>Collection</p>
          <p className='header-item'>Community</p>
        </div>
        <div className='header-top dark-btn'>
          <button className='header-item darkmode'>Dark Mode</button>
        </div>
      </header>
      <div className='image-search-box'>
        <p id='download'>Download High Quality Images by Creators</p>
        <p id='over'>Over 2.4million+ stock Images by our talented commuinty</p>
        <input type="text" className='search2' placeholder='&#61442; '  value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className='grid-gallery'>
        
      {results.map((photo) => (<div key={photo.id} className='grid-item'>
          <div className='card'>
            <div className='photo-section' >
              <img key={photo.id} src={photo.urls.small} alt={photo.alt_description}  className='photo'  />
            </div>
            <div className='creator-section' >
              <div className='creator-section dp'>
                <img className='dpic' src={photo.user.profile_image.medium} alt="" />
              </div>
              <div className='creator-section user'>
                <div id='name'>{photo.user.name}</div>
                <div id='userId'> @{photo.user.instagram_username}</div>
              </div>
              <div className='creator-section like'>
                <div>like</div>
                <div>{photo.likes}</div>
              </div>
            </div>
          </div>
        </div> ))}
      
      </div>



    </div>
  )
}

export default App
