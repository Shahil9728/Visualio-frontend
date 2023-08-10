import React, { useState } from 'react'
import './Home.css'
import FAQ from '../Components/FAQ'
import Footer from '../Components/Footer'

const Home = () => {
  const [script, setscript] = useState("");
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isscriptLoading, setIsscriptLoading] = useState(false);
  const [topic, settopic] = useState(false);
  const [scripttopic, setscripttopic] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, seterror] = useState("");


  const handleChange = async (event) => {
    setscript(event.target.value);
  }

  const handletopichange = async (event) => {
    setscripttopic(event.target.value);
  }

  const handleCreateVideoClick = async () => {
    if (script === '') {
      setErrorVisible(true);
      seterror("Please write the script !")
    }
    else {
      setIsLoading(true);
      try {
        const response = await fetch("https://visualio-backend.onrender.com/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ script }), // Sending the script data when the button is clicked
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const videoBlob = await response.blob();
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoBlobUrl);
      } catch (error) {
        console.error('Error:', error);
        setErrorVisible(true);
        seterror("Your credits are empty. Please contact us for more ai credits.")
      }
      setIsLoading(false);
    }
  };

  const getscript = () => {
    settopic(true);
  }

  const handlegetscriptClick = async () => {
    if (scripttopic === '') {
      setErrorVisible(true);
      seterror("Please write script topic!")
    }
    else {
      setIsscriptLoading(true);
      try {
        const response = await fetch("https://visualio-backend.onrender.com/getscript", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scripttopic }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setscript(data);
      } catch (error) {
        console.error('Error:', error);
        setErrorVisible(true);
        seterror("Your credits are empty. Please contact us for more ai credits.")
      }
      setIsscriptLoading(false);
    }
  }

  const handleDownloadVideoClick = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = videoUrl;
    downloadLink.download = 'video.mp4';
    downloadLink.click();
  };

  const closeError = () => {
    setErrorVisible(false);
  };

  const [faqs, setFaqs] = useState([
    {
      question: "How does Visualio's AI transform text into videos automatically?",
      answer:
        "Visualio employs robust AI models to create scripts based on your prompts. Subsequently, our AI comprehends the script within its context and integrates pertinent images or videos from an extensive library containing over 8 million visuals. Additionally, considering the video's theme, it incorporates suitable background music to enhance the overall experience.",
      open: true
    },
    {
      question: "Is an external application required to download the video?",
      answer: "No, you don't need an external application for downloading the video. Visualio AI provides a built-in function to download the video.",
      open: false
    },
    {
      question:
        "Is Visualio a good Invideo alternative?",
      answer: "Visualio has been the preferred choice of hundreds of thousand of users across the world ever since Invideo was discontinued.",
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  }

  return (
    <div className='home-container'>
      {errorVisible && (
        <div className="errordiv">
          <div className="errormsg">
            {error ? (
              <p>{error}</p>
            ) : (
              <p>No error</p>
            )}
            <button className="close" onClick={closeError}>+</button></div>
        </div>
      )}
      <div className="header">
        <h1 className='heading'>Convert <span className="highlight">Text to Video</span> with AI</h1>
        <p className='subheading'>Transform your text into videos using Visualio, an AI-driven Text-to-Video converter.</p>
        <p className="content">Utilize AI technology to generate videos for social media advertisements, promotions, or your own YouTube channel. Visualio's AI empowers you to effortlessly transform your written content into captivating videos with the simple act of pressing the play button.</p>
        <button className="home-btn">Turn text to video now!</button>
        <p className="btncontext">Just try at once!</p>
      </div>
      <div className="main">
        <div className="mainleft">
          {topic ? (
            <div className="aitopicdiv">
              <input type="text" className='scriptinput' placeholder='Enter a script topic' value={scripttopic} onChange={handletopichange} />
              <button className='create-btn btn scriptbtn' onClick={handlegetscriptClick}>
                {isscriptLoading ? (<>Getting Script..<img src="loading.gif" alt="" width={20} height={20} /></>) : (<>Generate Script</>)}
              </button>
            </div>
          ) : (
            <button className='script-btn btn' onClick={getscript}>Ask AI to write your script</button>
          )}
          <textarea name="main" id="main" cols="30" rows="9" placeholder='The easiest way to convert your text into videos.' className='scriptarea' value={script} onChange={handleChange}></textarea>
          <button className='create-btn btn' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }} onClick={handleCreateVideoClick}>
            {isLoading ? (<>Processing Video..<img src="loading.gif" alt="" width={20} height={20} /></>) : (<>Generate Video</>)}
          </button>
        </div>
        <div className="mainright">
          {videoUrl ? (
            <div className="videodiv">
              <video controls style={{ width: '100%', borderRadius: '0.5rem' }}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="create-btn btn" onClick={handleDownloadVideoClick}>Download</button>
            </div>
          ) : (
            <>
              <div className="mainrhtcont">
                <img src="arrow1.png" alt="" className="arrow" />
                <p>Write or paste your script to create scenes</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="image">
        <img src="head1.png" alt="" className='headimg' />
      </div>
      <div className="articles">
        <h1 className="articleheading heading">Transforming <span className="highlight">Text into Video</span> with AI</h1>
        <div className="articlediv">
          <div className="articleleft">
            <h2 className="articlehead">AI-powered tool for generating captivating video scripts</h2>
            <h5 className="articlecontent">
              Utilizing our AI script generator integrated into InVideo, fueled by ChatGPT, you have the ability to effortlessly produce a script based on any prompt. Say goodbye to the hassle of switching between different platforms or engaging in copy-pasting. Seamlessly create lively scripts that precisely align with your creative vision, all within a single unified platform.
            </h5>
            <button className="articlebtn">
              Try it Now!
            </button>
          </div>
          <div className="articleright">
            <img src="article1.png" alt="" className='articleimg' />
          </div>
        </div>
        <div className="articlediv">
          <div className="articleleft">
            <h2 className="articlehead">Transforming Scripts into Stunning Slideshow Videos</h2>
            <h5 className="articlecontent">
              Discover how AI can revolutionize the way you create slideshow videos from scripts. Unleash the power of cutting-edge AI technologies to automatically generate captivating visuals, synchronize with audio, and craft impressive slideshows that engage and mesmerize your audience like never before.
            </h5>
            <button className="articlebtn">
              Try Script to Video!
            </button>
          </div>
          <div className="articleright">
            <img src="article2.png" alt="" className='articleimg' />
          </div>
        </div>
      </div>
      <div className="textconverter">
        <h1 className='heading'>Easy <span className="highlight">text-to-video converter</span></h1>
        <div className="textconverterdiv">
          <div className="imagediv">
            <h2>Add your team and collaborate on your video</h2>
            <img src="p1.png" alt="" className='textimg' />
            <button className="home-btn" style={{ width: "fit-content" }}>Start Now</button>
          </div>
          <div className="videodiv1">
            <video autoPlay loop muted className="background-video">
              <source src="v1.mp4" type="video/mp4" />
            </video>
            <div className="videocontent">
              <h2>8 million+ stock media</h2>
              <div className="videoimgdiv">
                <img src="p2.svg" alt="" />
                <img src="p3.svg" alt="" />
                <img src="p4.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="videodiv1">
          <video autoPlay loop muted className="background-video">
            <source src="v2.mp4" type="video/mp4" />
          </video>
          <div className="videocontent">
            <h1>Video creation made easy</h1>
          </div>
        </div>
      </div>
      <div className="wanttoknowmore">
        <h1 className='heading'>Want to <br /> <span className="highlight">Know More ?</span></h1>
        <div className="faqs">
          {faqs.map((faq, index) => (
            <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
      <div className="footerbar">
        <img src="logo4.png" alt="" className='footerlogo' />
        <h1 className='heading'>Start creating videos.<br /> <span className="highlight">No experience needed.</span></h1>
        <button className="articlebtn" style={{ backgroundColor: "#0f73ff", color: "white" }}>
          Get Started - It's Free!
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Home