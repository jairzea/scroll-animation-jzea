
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

function onImageClick(element) {
  // Busca la imagen dentro del elemento clickeado
  const imgElement = element.querySelector(".gallery-image");

  // Obtiene el contenido desde el atributo content de la imagen
  const content = element.querySelector(".content");

  const images = document.querySelectorAll(".image-wrapper");
  images.forEach((img) => {
    img.classList.remove("scroll-animation");
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
  }, 2000);
}

function closeButtonClicked(element) {
  const contentContainer = element.parentNode;
  const parentContainer = contentContainer.parentNode;

  // Busca la imagen dentro del elemento padre del contenedor de contenido
  const imgElement = contentContainer.previousElementSibling;
  setTimeout(() => {
    
    imgElement.classList.remove("fade-out");
    imgElement.classList.add("fade-in");
    parentContainer.classList.remove("scaler");
    parentContainer.classList.add("revertScaler");
    contentContainer.classList.remove("fade-in");    
    contentContainer.style.zIndex = -1;

    const images = document.querySelectorAll(".image-wrapper");
    images.forEach((img) => {
      img.classList.add("scroll-animation");
    });

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

