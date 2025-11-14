import React from "react";
import { useParams } from "react-router-dom";

const PageRecette = () => {
  const { recette } = useParams();
  return (
    <div>
      <div style={{ height: "20rem", backgroundColor: "#911a1c" }}>
        <div style={{fontSize:"4rem", color:"#fff3e4"}}> Ma Page Recette </div>
       
       <p style={{ color:"#fff3e4", fontSize:"1.5rem", textAlign:"left"}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, distinctio, Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, fuga.</p>
      </div>
      <div
        style={{
          height: "7rem",
          width: "200rem",
          backgroundImage:
            "url(" +
            "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FEdit%2F2022-10-Double-Chocolate-Chip-Cookies%2Fdouble-chocolate-chip-cookies-2" +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80rem",
        }}
      >
        {" "}
      </div>
      <div style={{ height: "23rem", backgroundColor: "#fff3e4" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa
        consequuntur ullam corporis laboriosam reiciendis doloribus. Quae
        maiores similique nesciunt?
      </div>
      <div
        style={{
          height: "7rem",
          width: "200rem",
          backgroundImage:
            "url(" +  "https://foodoverr.com/wp-content/uploads/2024/12/chewychocolatecookies1-1645826087.jpg" 
            +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80rem",
        }}
      >
      
      </div>
      <div style={{ height: "23rem", backgroundColor: "#6c3619", color:"var(--creme)" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa
        consequuntur ullam corporis laboriosam reiciendis doloribus. Quae
        maiores similique nesciunt?
      </div>{" "}
      <div
        style={{
          height: "7rem",
          width: "200rem",
          backgroundImage:
            "url(" +
            "https://static01.nyt.com/images/2022/03/03/dining/SS-double-chocolate-cookies/merlin_203115636_8e81b8c5-a544-4598-8029-bb5b2399e3f9-superJumbo.jpg" +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80rem",
        }}
      >
        {" "}
      </div>
      <div style={{ height: "23rem", backgroundColor: "#e09534" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa
        consequuntur ullam corporis laboriosam reiciendis doloribus. Quae
        maiores similique nesciunt?
      </div>{" "}
      <div
        style={{
          height: "7rem",
          width: "200rem",
          backgroundImage:
            "url(" +
            "https://foodoverr.com/wp-content/uploads/2024/12/chewychocolatecookies1-1645826087.jpg" +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80rem",
        }}
      >
        {" "}
      </div>
      {recette}
    </div>
  );
};

export default PageRecette;
