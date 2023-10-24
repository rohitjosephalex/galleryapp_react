// import { useState } from 'react'
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



function App() {
  // const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showDiv, setShowDiv] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const apiKey = 'dd8ln_-asBmyJ6ZwHWl79jCNkTtpSKXDmZkqUdv0mNc';
  const handleCardClick = async (event) => {
    const divKey = event.target.getAttribute('data');
    // console.log( divKey);
    const handleCopyClick = () => {
      
        // Copy the selected text to the clipboard
        document.execCommand('copy');
      }
    const fetchPopup = async (id) => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {

          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });

        setPopupData(response.data);
        console.log(response.data);
        setExpanded(!isExpanded);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };
    fetchPopup(divKey);


  }
  const togglePopup = () => {

    setExpanded(!isExpanded);
  };

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

        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };
    const loadRandom = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          }
        });

        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
    else {
      loadRandom()
    }
  }, [searchTerm]);

  return (
    <div>
      <header className='header-top'>
        <p className='header-item name'>Image Galery</p>
        <div className='input-group'>
          {showDiv && (<span>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />&nbsp;Search Images here
          </span>)}
          <input type="text" className='header-item1 search' style={{ position: "relative" }} value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowDiv(e.target.value === ''); }} />
        </div>

        <div className='header-top page-btn'>
          <p className='header-item components '>Explore</p>
          <p className='header-item components'>Collection</p>
          <p className='header-item components'>Community</p>
        </div>
        <div className='header-top dark-btn'>
          <p className='header-item'>Dark Mode</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </header>
      <div className='image-search-box'>
        <p id='download'>Download High Quality Images by Creators</p>
        <p id='over'>Over 2.4million+ stock Images by our talented commuinty</p>
        <div className='input-group2'>
          {showDiv && (<span style={{ margin: '0', padding: '0' }}>
            <FontAwesomeIcon icon={faSearch} className="search-icon2" />&nbsp;Search high resolution Images, categories, wallpaper
          </span>)}
          <input type="text" className='search2' id='s2' value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowDiv(e.target.value === ''); }} />
        </div>
      </div>
      <div className='grid-gallery'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry className='masonry' gutter="10px">
            {results.map((photo) => (<div key={photo.id} className='grid-item'>
              <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={handleCardClick} >
                <div className='photo-section' >
                  <img src={photo.urls.small} alt={photo.alt_description} className='photo' data={photo.id} />
                </div>
                <div className='creator-section' >
                  <div className='creator-section dp'>
                    <img className='dpic' src={photo.user.profile_image.medium} alt="dp" />
                  </div>
                  <div className='creator-section user'>
                    <div id='name'>{photo.user.name}</div>
                    <div id='userId'> @{photo.user.username}</div>
                  </div>
                  <div className='creator-section like'>
                    <FontAwesomeIcon id='likeicon' icon={faThumbsUp} />
                    <div id='like'>{photo.likes}</div>
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="popup">
                  <div className="popup-content">
                    {/* <div>{popupData.urls.regular}</div> */}

                    <div className={`card1`}  >
                      <div className='photo-section1' >
                        <img src={popupData.urls.regular} alt={popupData.alt_description} className='photoBig' data={popupData.id} />
                        
                      </div>
                      <div className='creator-section big' >
                        <div className='creator-section dpbig'>
                          <img className='dpic' src={popupData.user.profile_image.medium} alt="dp" />
                        </div>
                        <div className='creator-section user'>
                          <div id='nameBig'>{popupData.user.first_name}</div>
                          <div id='userIdBig'> @{popupData.user.username}</div>
                        </div>
                        <div className='creator-section social'>
                          <div  >  <FontAwesomeIcon id='likeicon' icon={faInstagram} /> {popupData.user.instagram_username}</div>
                          <div  ><FontAwesomeIcon id='likeicon' icon={faTwitter} /> {popupData.user.social.twitter_username} </div>
                        </div>

                        <div className='creator-section like'>
                          <div className='creator-section download' >

                            <div>{popupData.downloads}</div>
                            <div>Download</div>
                          </div>
                          <FontAwesomeIcon id='likeicon' icon={faThumbsUp} />
                          <div id='like'>{popupData.likes}</div>
                        </div>
                      </div>
                      <div className='creator-section tagsection'>
                        <div className='tag-heading'>Related Tags</div>
                        <div className='creator-section tagsection tags' >
                          {popupData.tags.map((tags) => (<div key={tags.type}>
                            <div className='tag'>{tags.title}</div></div>))}
                        </div>

                      </div>
                    </div>
                    <button className='copy-btn' onClick={handleCopyClick}>share</button>
                    <button className=" popup-content close-button" onClick={togglePopup}>x</button>
                  </div>
                  
                </div>
              )}
            </div>))}
          </Masonry>
        </ResponsiveMasonry>
      </div>




    </div>
  )
}


export default App
