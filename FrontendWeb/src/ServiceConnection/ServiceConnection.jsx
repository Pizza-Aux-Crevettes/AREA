import Title from '../Title'
import './ServiceConnection.css'
import logo_discord from '../assets/discord.png'
import logo_X from '../assets/X.png'
import logo_spotify from '../assets/spotify.png'
import logo_google from '../assets/google.png'

function RectangleService({text, logo}) {
  return (
    <div className='rectangle'>
      <button>
        <h3 dangerouslySetInnerHTML={{ __html: text }} />
      </button>
      <img src={logo} className="logo-rect"/>
    </div>
  );
}

function Service() {
  return (
    <div className='service'>
      <div className='all-container'>
        <Title title="Service Connection"/>
        <div className='container'>
          <div className='back-rectangle'>
            <div className='column-container'>
              <RectangleService text="<b>Connect to<br />discord<b\>" logo={logo_discord}/>
              <RectangleService text="<b>Connect to<br />Google<b\>" logo={logo_google}/>
            </div>
            <div className='column-container'>
              <RectangleService text="<b>Connect to<br />Twitter (X)<b\>" logo={logo_X}/>
              <RectangleService text="<b>Connect to<br />Spotify<b\>" logo={logo_spotify}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service;
