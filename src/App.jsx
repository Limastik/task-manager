import Header from './Header'
import Auth from './auth/Auth'
import "bootswatch/dist/morph/bootstrap.min.css";
import './App.css'

function App() {

  return (
    <div className="root">
          <Header/>
          <div className="container">
              <Auth/>
          </div>
    </div>

  )
}

export default App
