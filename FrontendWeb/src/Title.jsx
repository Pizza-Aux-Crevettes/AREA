import logo_menu from './assets/menu.png'
import logo_exit from './assets/exit.png'
import './Title.css'

function Title ({title}) {
    return (
      <div>
        <div className='top-part'>
          <img src={logo_menu} className="logo menu" alt="Menu logo" height='30vh' />
          <h1>{title}</h1>
          <img src={logo_exit} className="logo exit" alt="Exit logo" height='35vh' />
        </div>
      </div>
    )
  }

export default Title;
