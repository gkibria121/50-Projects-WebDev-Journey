const imageContainer = document.querySelector('.image-container')
const IMAGE_COUNT = 100


for (let index = 0; index < IMAGE_COUNT; index++) {
 
  const img = document.createElement('img')
  img.src = `https://picsum.photos/${getRandomNum()}/${getRandomNum()}`
 
  imageContainer.appendChild(img)
}


function getRandomNum(){
  return 300+ Math.floor(Math.random()*IMAGE_COUNT)
}