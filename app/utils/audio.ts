export const playAudio = async (path: string, fallbackText?: string) => {
  try {
    const audio = new Audio(path)
    await audio.play()
  } catch (error) {
    console.log('Audio playback failed:', error)
    if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }
} 