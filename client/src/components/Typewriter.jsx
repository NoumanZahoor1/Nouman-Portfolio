import { useState, useEffect } from 'react'

const Typewriter = ({ words, loop = true, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          if (loop || currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, loop, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span className="text-gradient">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default Typewriter
