import { ref, onUnmounted } from "vue";

export function useTextScramble(text) {
  const displayText = ref(text);
  let interval = null;

  const scramble = () => {
    let iteration = 0;
    const letters = text.split("");
    const textLength = letters.length;
    const minIterations = 6;
    const iterationsPerChar = 2;
    const maxIterations = Math.max(
      minIterations,
      textLength * iterationsPerChar,
    );

    clearInterval(interval);

    interval = setInterval(() => {
      const progress = iteration / maxIterations;
      const fixedLetters = Math.floor(progress * textLength);

      let result = "";
      for (let i = 0; i < textLength; i++) {
        if (i < fixedLetters) {
          result += text[i];
        } else {
          result += letters[Math.floor(Math.random() * textLength)];
        }
      }

      displayText.value = result;
      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        displayText.value = text;
      }
    }, 60);
  };

  onUnmounted(() => {
    if (interval) clearInterval(interval);
  });

  return {
    displayText,
    scramble,
  };
}
