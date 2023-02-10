import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import "./Slider.css"
import {sliderData} from "./SliderData"

function Slider() {
  let [currentSlide, setCurrentSlide] = useState(0)
  
  let nextSlide = ()=>{
    setCurrentSlide(currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1)
  }
  
  let prevSlide = ()=>{
    setCurrentSlide(currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1)
  }
  
  let slideInterval;
  let intervalTime = 5000;
  
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval]);
  
  return (
    <div className='slider'>
        <div className='left-arrow' onClick = {prevSlide}><FontAwesomeIcon icon={faArrowLeft}/></div>
        <div className='right-arrow' onClick = {nextSlide}><FontAwesomeIcon icon={faArrowRight}/></div>
      {
        sliderData.map((slide, index)=>{
          const {image, heading, desc} = slide
          
          return(
            <div key = {index} className={index === currentSlide ? "slide current" : "slide"}>
              {
                index === currentSlide && (
                  <>
                    <img src={image} alt = "img" className='w-100'/>
                    
                    <div className='content'>
                        <h2>{heading}</h2>
                        <p>{desc}</p>
                        <div className='hr'></div>
                        <button className='btn btn-primary'>Shop Now</button>
                    </div>
                  </>
                )
              }
            </div>
          )
          
        })
      }
      
      
      
    </div>
  )
}

export default Slider