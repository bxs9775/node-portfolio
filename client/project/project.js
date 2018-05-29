// Events
//Changes the images being loaded when the screen goes below a cerain size.
const adjustImages = function(){
  const fullImage = document.querySelector("#fullImage");
  const thumbnail = document.querySelector("#thumbnail");
  if(window.innerWidth <= 900){
    fullImage.style.display = "none";
    thumbnail.style.display = "block";
  }else{
    fullImage.style.display = "block";
    thumbnail.style.display = "none";
  }
};

// Setup
const setup = function(){
  window.onresize = adjustImages;
  adjustImages();
};

window.onload = setup;