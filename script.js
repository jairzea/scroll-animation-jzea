const container = document.querySelector(".container");

// Clonación de imagenes que se pierden el foco
function cloneImage(image, direction) {
  const imageContainer = document.getElementById("imageContainer");
  const clonedImage = image.cloneNode(true);
  const firstChild = imageContainer.firstChild;

  console.log("direction", direction);
  if (direction){
    imageContainer.appendChild(clonedImage);
  } else {
    imageContainer.insertBefore(clonedImage, firstChild);
  }
}

function calculateContainerWidth(container, images) {
  // Suma los anchos de todas las imágenes en el contenedor
  const totalWidth = Array.from(images).reduce((width, image) => width + image.clientWidth, 0);

  // Agrega algún espacio adicional (puedes ajustar este valor según tus necesidades)
  const padding = 20; 

  // Establece el ancho del contenedor
  container.style.width = totalWidth + padding + 'px';
}

function observeVisibility(image) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        console.log(`La imagen está fuera de la vista. `);

        // Determina la dirección de la salida (izquierda o derecha)
        const direction = entry.boundingClientRect.x < 0;

        cloneImage(image, direction);
      }
    });
  });

  observer.observe(image);
}

function removeAttr(element, attr) {
  var miBoton = document.getElementById('miBoton');
  miBoton.removeAttribute('onclick');
}

function onImageHover(element) {
  const contentElement = element.querySelector(".content");

  // Busca la imagen dentro del elemento clickeado
  const imgElement = element.querySelector(".gallery-image");

  // Obtiene el contenido desde el atributo content de la imagen
  const content = element.querySelector(".content");

  const images = document.querySelectorAll(".image-wrapper");
  images.forEach((img) => {
    img.classList.remove("scroll-animation");
    // img.removeEventListener("mouseenter", onImageHover);
    img.removeAttribute("onmouseenter");
  });

  const imageContainer = document.getElementById("imageContainer");

  imageContainer.style.overflow = "hidden";
  const offset =
    element.offsetLeft - (imageContainer.offsetWidth - element.offsetWidth) / 2;

  imageContainer.scrollTo({
    left: offset,
    behavior: "smooth",
  });
 
  setTimeout(() => {
    imgElement.classList.add("fade-out");
    element.classList.add("scaler");
    content.classList.add("fade-in");
    contentElement.style.zIndex = 1;
  }, 2000);
}

function closeButtonClicked(element) {
  const contentElement = element.parentNode;
  // contentElement.classList.add("z-index-n1");
  
  const parentContainer = contentElement.parentNode;

  // Busca la imagen dentro del elemento padre del contenedor de contenido
  const imgElement = contentElement.previousElementSibling;
  
  setTimeout(() => {
    
    imgElement.classList.remove("fade-out");
    imgElement.classList.add("fade-in");
    parentContainer.classList.remove("scaler");
    parentContainer.classList.add("revertScaler");
    
    contentElement.style.zIndex = -1;

    const images = document.querySelectorAll(".image-wrapper");

    images.forEach((img) => {
      // img.classList.add("scroll-animation");
      // if (img.hasAttribute("onmouseenter")) 
      // {
      //   console.log("img", img);
      //   img.addEventListener("mouseenter", function () {
      //     onImageClick(img);
      //   });
      // }
      img.setAttribute("onmouseenter", "onImageHover(this)");
    });

    setTimeout(() => {
      parentContainer.classList.remove("revertScaler");
      contentElement.classList.remove("fade-in");  
      parentContainer.classList.remove("fade-in");
      imgElement.classList.remove("fade-in");
    }, 1500)

  }, 2000);
  
}

document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("imageContainer");
  const images = document.querySelectorAll(".image-wrapper");
  for (let i = 0; i < images.length; i++) {
    images.forEach((img) => {
      const clonedImage = img.cloneNode(true);
      imageContainer.appendChild(clonedImage);
    });
  }
})

