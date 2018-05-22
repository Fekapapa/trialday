'use strict'

const Swiper = (function() {

  //swiper slider counter variables
  let currentSlide = 0;
  let slidesNumber = 0;

  //This is the main swiper container. You can change the swiper display here.
  const swiperContainer = document.getElementById('swiper');
  swiper.style.width = '800px';
  swiper.style.height = '600px';
  swiper.style.margin = 'auto';
  swiper.style.marginTop = '50px';
  swiper.style.overflow = 'hidden';
  swiper.style.position = 'relative';

  //The slides inside the swiper.
  const slidesContainer = document.createElement('div');
  slidesContainer.style.display = 'flex';
  slidesContainer.style.flexDirection = 'row';
  slidesContainer.style.position = 'absolute';
  slidesContainer.style.transition = 'all .5s ease-out';
  swiperContainer.appendChild(slidesContainer);

  //Getting the json data for the swiper.
  function getJsonData(file, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let slidesData = JSON.parse(xhr.response);
      callback(slidesData);
    }
  }
  xhr.open('GET', file);
  xhr.send();
  }

  getJsonData('../json_data/swiper_slides.json', function(response) {
    let swiperslides = response;
    swiperInit(swiperslides);
    console.log(swiperslides);
  });

  //Initinating the sipwer slides from the json data.
  function swiperInit(swiperslides) {
    for (let slide in swiperslides) {
      const oneSlide = document.createElement("div");
      oneSlide.style.width = '800px';
      oneSlide.style.height = '600px';
      oneSlide.style.backgroundImage = 'url("' + swiperslides[slide] + '")';
      oneSlide.style.backgroundPosition = 'center';
      oneSlide.style.backgroundSize = 'contain';
      oneSlide.style.backgroundRepeat = 'no-repeat';
      slidesContainer.appendChild(oneSlide);

      slidesNumber += 1;
    }
  }

  //Calling the next slide with this function.
  function nextSlide(swiperslides) {
    if(currentSlide < slidesNumber - 1) {
      currentSlide += 1;
      slidesContainer.style.transform = 'translate(-' + currentSlide * 800 + 'px)';
    }
  }

  //Calling the previous slide with this function.
  function prevSlide(swiperslides) {
    if(currentSlide > 0) {
      currentSlide -= 1;
      slidesContainer.style.transform = 'translate(-' + currentSlide * 800 + 'px)';
    }
  }

  return {
    nextSlide: nextSlide,
    prevSlide: prevSlide
  }

})();
