import { Link } from 'react-router-dom'

const Nothing = () => {
  return (
    <div style={{height:"36.5rem", alignContent:"center"}}>
        <h2 style={{fontSize:"4rem"}}>Nothing Here 🫤 404</h2>
        <Link to="/"  style={{justifySelf:"center", aHover:"black" }}>Click here to Back to Home page</Link>
    </div>
  )
}

export default Nothing