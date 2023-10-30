import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const[loading, setLoading] = useState(false)

    const imageGemerator = async () =>{
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    "prompt":`${inputRef.current.value}`,
                    n1:1,
                    size:"512x512"
                }),
            }
        );
        // let data = await response.json();
        // console.log(data);
        // let data_array = data.data;
        // setImage_url(data_array[0].url);
        // setLoading(false);

        try {
            let data = await response.json();
            if (data && data.data && data.data.length > 0) {
              let data_array = data.data;
              setImage_url(data_array[0].url);
              setLoading(false);
            } else {
              console.error('Invalid or empty JSON response.');
              // Handle the error or set a default value for setImage_url if necessary.
            }
          } catch (error) {
            console.error('Error parsing JSON response:', error);
            // Handle the error here, e.g., display an error message to the user.
          }
    }


    return(
        <div className="ai-image-generator" >
            <div className="header" >Ai image <span>generator</span></div>
            <div className='img-loading'>
                <div className='image'>
                    <img src={image_url === "/"?default_image:image_url} alt='generated image' ></img>
                    <div className="loading">
                        <div className={loading?"loading-bar-full":'loading-bar'}></div>
                        <div className={loading?'loading-text':"display-none"}>Loading...</div>
                    </div>
                </div>
            </div>
            <div className="search-box">
                <input type='text' ref =  {inputRef} className="search-input" placeholder='Describe What You Want To See' ></input>
                <div className="generate-btn" onClick={()=>{imageGemerator()}} >Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator;