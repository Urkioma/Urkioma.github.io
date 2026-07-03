import { ref } from "vue";

export function useMouseParallax() {
  const mousePos = ref({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    mousePos.value = {
      x: (clientX / innerWidth) * 100,
      y: (clientY / innerHeight) * 100,
    };
  };

  return {
    mousePos,
    handleMouseMove,
  };
}
