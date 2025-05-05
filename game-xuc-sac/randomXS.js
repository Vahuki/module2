
document.addEventListener("DOMContentLoaded", function() {
    const cubes = document.querySelectorAll(".cube");
  
    const faceRotations = {
      front: { x: 0, y: 0 },
      back: { x: 0, y: 180 },
      right: { x: 0, y: -90 },
      left: { x: 0, y: 90 },
      top: { x: -90, y: 0 },
      bottom: { x: 90, y: 0 }
    };
  
    function randomRotateCubes() {
      cubes.forEach(cube => {
        const faces = Object.keys(faceRotations);
        const randomFace = faces[Math.floor(Math.random() * faces.length)];
        const rotation = faceRotations[randomFace];
  
        cube.style.transition = "transform 1s";
        cube.style.transform = `scale(0.9) translateZ(-8rem) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      });
    }
  
    // Lần đầu tiên
    randomRotateCubes();
  
    // Sau đó cứ 5 giây random lại
    setInterval(randomRotateCubes, 15000);
  });
  
  