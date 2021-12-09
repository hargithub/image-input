import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "./styles.css";

function App() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  
  const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457"
    }
  };

  const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;

  Button.defaultProps = {
    theme: "blue"
  };

  function kirimData(dataJson){
    console.log(dataJson);
    (async () => {
      const rawResponse = await fetch('http://172.16.6.133:8080/postData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dataJson
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  }

  function clickMe(dataToSend) {
    // kirim pesan data terkirim
    alert("Data terkirim!");
  }

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => { 
        current.src = e.target.result;
        let base64Obj = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        var datagps = new Object();
        datagps.latitude = -6.959134;
        datagps.longitude = 107.609706;

        var Ddata = new Object();
        Ddata.img_geladak = "yy";
        Ddata.img_palka = base64Obj;
        Ddata.gps = datagps;
        Ddata.volume_palka = 500; 
    
        var obj = new Object();
        obj.boat_id = "Demo792";
        obj.timestamp = new Date().getTime();
        obj.data = Ddata;
        var jsonString = JSON.stringify(obj);
        kirimData(jsonString);
      };
      reader.readAsDataURL(file);
    }
  };

    return (
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
      >

      <div class="header">
        <h1>Boat Pengirim Data</h1>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />

      <div
        style={{
          height: "300px",
          width: "600px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            position: "relative"
          }}
          alt="klik disini"
          />
      </div>
      Img Palka
        <div>
        <Button onClick={clickMe}>Kirim Data</Button>
        </div> 
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);