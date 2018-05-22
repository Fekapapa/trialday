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

  const prevButton = document.createElement('button');
  prevButton.onclick = prevSlide;
  prevButton.innerHTML = 'prev';
  prevButton.style.position = 'absolute';
  prevButton.style.top = '50%';
  prevButton.style.transform = 'translateY(50%)';
  prevButton.style.zIndex = 1;
  swiperContainer.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.onclick = nextSlide;
  nextButton.innerHTML = 'next';
  nextButton.style.position = 'absolute';
  nextButton.style.top = '50%';
  nextButton.style.right = 0;
  nextButton.style.transform = 'translateY(50%)';
  nextButton.style.zIndex = 1;
  swiperContainer.appendChild(nextButton);

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
  });

  //Initiating the sipwer slides from the json data.
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
    console.log('Swiper initiated with the data:', swiperslides);
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
    //call these functions from the html or js to make the swiper slide next/prev.
    nextSlide: nextSlide,
    prevSlide: prevSlide
  }

})();
