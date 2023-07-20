
const API_KEY = "your api key here"

const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector('input')
const imageSection = document.querySelector('.images-section')


const getImages = async () => {
  
   const options = {
    method : 'POST',
    headers:{
      "Authorization" : `Bearer ${API_KEY}`,
      "Content-Type" :"application/json"
    },
    body : JSON.stringify({
      prompt : inputElement.value ,
      n : 4,
      size: "1024x1024"
    })
   }
    try{
      const response = await fetch('https://api.openai.com/v1/images/generations', options)
      const data = await response.json()
      // console.log(data)

      data?.data?.forEach(imageObject =>{
        const imageContainer = document.createElement('div')
        imageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src' , imageObject.url)
        imageContainer.append(imageElement)
        imageSection.append(imageContainer)
      })



    } catch (error){
    console.error(error)
  }
}


submitIcon.addEventListener('click' , getImages)



// animation for the cursor on webpage


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  
  "#6E45E1",
  
  // "#ffb56b",
  // "#fdaf69",
  // "#f89d63",
  // "#f59761",
  // "#ef865e",
  // "#ec805d",
  // "#e36e5c",
  // "#df685c",
  // "#d5585c",
  // "#d1525c",
  // "#c5415d",
  // "#c03b5d",
  // "#b22c5e",
  // "#ac265e",
  // "#9c155f",
  // "#950f5f",
  // "#830060",
  // "#7c0060",
  // "#680060",
  // "#60005f",
  // "#48005f",
  // "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();
