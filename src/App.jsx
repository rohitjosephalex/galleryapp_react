// import { useState } from 'react'
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faSquareShareNodes, } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { saveAs } from 'file-saver';



function App() {
  // const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showDiv, setShowDiv] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [download, setDownload] = useState(false);
  const [showImageSearchDiv, setShowImageSearchDiv] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState('');
  const [downloadCount, setDownloadCount] = useState('');

  const apiKey = 'dd8ln_-asBmyJ6ZwHWl79jCNkTtpSKXDmZkqUdv0mNc';



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const darkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark')
  }
  const lightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light')
  }
  const toggleTheme = (e) => {
    if (e.target.checked) darkMode();
    else lightMode();
  }

  // used to download the image
  const handleDownloadClick = () => {
    const downloadImage = async () => {

      try {
        const response = await axios.get(`${popupData.links.download_location}`, {

          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });




        setDownload(response.data.url);
        console.log('download', response);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };
    downloadImage();
    saveAs(download, `${popupData.alt_description}.jpg`)
  }
  const handleCopyClick = () => {

    // console.log('copied')

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

  };

  const handleCardClick = async (event) => {
    const divKey = event.target.getAttribute('data');
    // console.log( divKey);
    // load the popup images when id is passed
    const fetchPopup = async (id) => {

      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {

          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });

        setPopupData(response.data);
        if(popupData.likes>1000 )
         {
          const like=Math.floor(popupData.likes/1000);


          setLikeCount(`${like}K`)
        }
        else{
          setLikeCount(popupData.likes)

        }
        if(popupData.downloads>1000)
        {
 
         const download=Math.floor(popupData.downloads/1000);
         setDownloadCount(`${download}K`)

       }
       else{
         setDownloadCount(popupData.downloads)
       }
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
      //search for a specific set of images
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: searchTerm, per_page: 100,
          },
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });
        console.log(response.data.results[0]);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Unsplash:', error);
      }
    };
    //loads a random set of images on the load screen
    const loadRandom = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          params: {
            query: searchTerm, per_page: 100,
          },
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
      <div className='desktop'>
        <header className='header-top'>
          <p className='header-item name'>Image Galery</p>
          <div className='input-group'>
            {showDiv && (<span>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />&nbsp;Search Images here
            </span>)}
            <input type="text" className='header-item1 searchDesktop' style={{ position: "relative" }} value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setShowDiv(e.target.value === ''); setShowImageSearchDiv(false) }} />
          </div>

          <div className='header-top page-btn'>
            <p className='header-item components '>Explore</p>
            <p className='header-item components'>Collection</p>
            <p className='header-item components'>Community</p>
          </div>
          <div className='header-top dark-btn'>
            <p className='header-item'>Dark Mode</p>
            <label className="switch">
              <input type="checkbox" onChange={toggleTheme} />
              <span className="slider round"></span>
            </label>
          </div>
        </header>
      </div>
      <div className='mobile'><header className='header-top'>
        <p className='header-item name'>Image Galery</p>
        <div className='input-groupm'>
          <span>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />&nbsp;
          </span>

        </div>
        <div className="hamburger-menu">
          <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          {isOpen && (
            <ul className="menu-items">
              <li>Explore</li>
              <li>Collection</li>
              <li>Community</li>
              <li><div className='dark-btnm'>
                <p style={{ margin: '0px' }} className='header-items'>Dark Mode</p>
                <label className="switch">
                  <input type="checkbox" onChange={toggleTheme} />
                  <span className="slider round"></span>
                </label>
              </div></li>
            </ul>
          )}
        </div>

      </header></div>
      {showImageSearchDiv && (<div className='image-search-box'>
        <p id='download' >Download High Quality Images by Creators</p>
        <p id='over' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>Over 2.4million+ stock Images by our talented commuinty</p>
        <div className='input-group2'>
          {showDiv && (<span style={{ margin: '0', padding: '0' }}>
            <div className='desktop'>
              <FontAwesomeIcon icon={faSearch} className="search-icon2" />&nbsp;Search high resolution Images, categories, wallpaper
            </div>
            <div className='mobile'>
              <FontAwesomeIcon icon={faSearch} className="search-icon2" />&nbsp;Search high resolution Images
            </div>
          </span>)}
          <input type="text" className='search2' id='s2' value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowDiv(e.target.value === ''); }} />
        </div>
      </div>)}
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
                        <div className='creator-section userdetailsbig'>
                          <div className='creator-section dpbig'>
                            <img className='dpic' src={popupData.user.profile_image.medium} alt="dp" />
                          </div>
                          <div className='creator-section user'>
                            <div id='nameBig'>{popupData.user.first_name}</div>
                            <div id='userIdBig'> @{popupData.user.username}</div>
                          </div>
                        </div>
                        <div className='creator-section social'>
                          <div  style={{display:'flex',flexDirection:'row',gap:'5px'}}>  <FontAwesomeIcon id='instaIcon' icon={faInstagram} /> {popupData.user.instagram_username}</div>
                          <div style={{display:'flex',flexDirection:'row',gap:'5px'}} ><FontAwesomeIcon id='twitterIcon' icon={faTwitter} /> {popupData.user.social.twitter_username} </div>
                        </div>
                        <div className='creator-section count'>


                          <div className='downloadCount'>
                            <div>{downloadCount}</div>
                            <div>downloads</div>
                          </div>

                          <div className='likes'>
                            <FontAwesomeIcon id='thumbsupIcon' icon={faThumbsUp} />
                            <div id='like2'>{likeCount}</div>
                          </div>

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
                    <button className='copy-btn' onClick={() => { navigator.clipboard.writeText(popupData.urls.full); handleCopyClick(); }}><FontAwesomeIcon icon={faSquareShareNodes} className="share-icon" /></button>
                    {isCopied && (<div className='copied-notification'>Copied to clipboard!</div>)}
                    <a download>
                      <button className='download-btn' onClick={handleDownloadClick}>Download Image</button></a>
                    {/* {isCopied && (<div className='copied-notification'>Copied to clipboard!</div>)} */}
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
