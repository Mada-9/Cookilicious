import {useNavigate} from "react-router-dom"

const PageConnexion = () => {
    const navigate = useNavigate()
  return (
    <div className="" style={{marginTop:"4rem"}} >
      <div style={{fontSize:"3rem"}}>Connexion</div>

      <form action="submit" style={{display:"flex", flexDirection:"column", gap:"2rem" , width:"40rem", justifySelf:"center", marginBottom:"5rem"}}>
        <label htmlFor="email" id="email">email</label>
        <input type="text"  />
        <label htmlFor="password" id="password">Mot de passe</label>
        <input type="password"  />
        <button type="submit" onClick={()=>navigate("/produit")}>connexion</button>
      </form>
    </div>
  );
};

export default PageConnexion;
