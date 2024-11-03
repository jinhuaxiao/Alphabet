'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Volume2, Brain } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import confetti from 'canvas-confetti'
import { LetterDetails, LetterPair } from './types/letter'
import { letterDetails } from './data/letterDetails'
import { playAudio } from './utils/audio'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const shuffleArray = (array: any[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const generateLetterPairs = () => {
  return shuffleArray(alphabet.filter(Boolean).map(letter => ({
    uppercase: letter,
    lowercase: letter.toLowerCase()
  })))
}

const playLetterSound = (letter: string) => {
  const utterance = new SpeechSynthesisUtterance(letter)
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}

const letterImages: { [key: string]: string } = {
  A: '/alphabet/a.webp',
  B: '/alphabet/b.webp',
  C: '/alphabet/c.webp',
  D: '/alphabet/d.webp',
  E: '/alphabet/e.webp',
  F: '/alphabet/f.webp',
  G: '/alphabet/g.webp',
  H: '/alphabet/h.webp',
  I: '/alphabet/i.webp',
  J: '/alphabet/j.webp',
  K: '/alphabet/k.webp',
  L: '/alphabet/l.webp',
  M: '/alphabet/m.webp',
  N: '/alphabet/n.webp',
  O: '/alphabet/o.webp',
  P: '/alphabet/p.webp',
  Q: '/alphabet/q.webp',
  R: '/alphabet/r.webp',
  S: '/alphabet/s.webp',
  T: '/alphabet/t.webp',
  U: '/alphabet/u.webp',
  V: '/alphabet/v.webp',
  W: '/alphabet/w.webp',
  X: '/alphabet/x.webp',
  Y: '/alphabet/y.webp',
  Z: '/alphabet/z.webp'
}

export default function AlphabetGame() {
  const [letterPairs, setLetterPairs] = useState<LetterPair[]>([])
  const [lowercaseOrder, setLowercaseOrder] = useState<LetterPair[]>([])
  const [selectedUppercase, setSelectedUppercase] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showImage, setShowImage] = useState<string | null>(null)
  const [testMode, setTestMode] = useState(false)
  const [testLetter, setTestLetter] = useState<string | null>(null)
  const [currentLetterDetails, setCurrentLetterDetails] = useState<LetterDetails | null>(null)

  useEffect(() => {
    if (matchedPairs.length === alphabet.length) {
      setShowCelebration(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [matchedPairs])

  useEffect(() => {
    const pairs = generateLetterPairs()
    setLetterPairs(pairs)
    setLowercaseOrder(shuffleArray([...pairs]))
  }, [])

  const handleLetterClick = (letter: string, isUppercase: boolean) => {
    const upperLetter = letter.toUpperCase()
    const details = letterDetails[upperLetter] || {
      letter: upperLetter,
      lowercase: letter.toLowerCase(),
      word: upperLetter,
      pronunciation: upperLetter,
      audioPath: null
    }
    setCurrentLetterDetails(details)

    if (details.audioPath) {
      playAudio(details.audioPath, letter).catch(error => {
        console.log('Audio playback failed:', error)
        playLetterSound(letter)
      })
    } else {
      playLetterSound(letter)
    }

    if (testMode) {
      if (letter.toUpperCase() === testLetter) {
        const successSound = new Audio('/audio/success.mp3')
        successSound.play()
        setScore(score + 20)
        setStreak(streak + 1)
        generateTestLetter()
      } else {
        const failSound = new Audio('/audio/fail.mp3')
        failSound.play()
        setStreak(0)
      }
    } else {
      if (isUppercase) {
        setSelectedUppercase(letter)
      } else if (selectedUppercase) {
        if (selectedUppercase.toLowerCase() === letter) {
          const successSound = new Audio('/audio/success.mp3')
          successSound.play()
          setMatchedPairs([...matchedPairs, selectedUppercase])
          setScore(score + 10)
          setStreak(streak + 1)
          setShowImage(selectedUppercase)
          setTimeout(() => setShowImage(null), 2000)
          if (streak > 0 && streak % 5 === 0) {
            setScore(score + 50)
            const bonusSound = new Audio('/audio/bonus.mp3')
            bonusSound.play()
          }
        } else {
          const failSound = new Audio('/audio/fail.mp3')
          failSound.play()
          setStreak(0)
        }
        setSelectedUppercase(null)
      }
    }
  }

  const resetGame = () => {
    setLetterPairs(generateLetterPairs())
    setSelectedUppercase(null)
    setMatchedPairs([])
    setScore(0)
    setStreak(0)
    setShowCelebration(false)
    setTestMode(false)
    setTestLetter(null)
  }

  const startTestMode = () => {
    setTestMode(true)
    generateTestLetter()
  }

  const generateTestLetter = () => {
    const unmatched = alphabet.filter(letter => !matchedPairs.includes(letter))
    if (unmatched.length > 0) {
      setTestLetter(unmatched[Math.floor(Math.random() * unmatched.length)])
    } else {
      setTestMode(false)
      setShowCelebration(true)
    }
  }

  const renderLetterButton = (pair: LetterPair, isUppercase: boolean) => {
    if (!pair) return null;
    
    const letter = isUppercase ? pair.uppercase : pair.lowercase
    if (!letter) return null;

    const upperLetter = letter.toUpperCase();
    const details = letterDetails[upperLetter] || {
      letter: upperLetter,
      lowercase: letter.toLowerCase(),
      word: upperLetter,
      pronunciation: upperLetter
    };
    
    return (
      <motion.button
        key={letter}
        aria-label={`${isUppercase ? 'Uppercase' : 'Lowercase'} letter ${letter}`}
        title={`${details.word} (${details.pronunciation})`}
        className={`aspect-square w-[calc(100%-4px)] max-w-[60px] sm:w-16 sm:h-16 
          rounded-lg text-xl sm:text-3xl font-bold flex items-center justify-center
          ${matchedPairs.includes(pair.uppercase)
            ? 'bg-green-200 text-green-700'
            : selectedUppercase === pair.uppercase
            ? 'bg-yellow-200 text-yellow-700'
            : isUppercase 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
          }`}
        onClick={() => handleLetterClick(letter, isUppercase)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={matchedPairs.includes(pair.uppercase)}
      >
        {letter}
      </motion.button>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-200 py-2 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-3 sm:p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-purple-600 mb-3 sm:mb-8">
          Alphabet Matching Game
        </h1>
        
        <div className="flex justify-between items-center mb-3 sm:mb-6 px-2">
          <div className="text-lg sm:text-2xl font-semibold text-blue-600">Score: {score}</div>
          <div className="text-lg sm:text-2xl font-semibold text-green-600">Streak: {streak}</div>
        </div>

        <Progress value={(matchedPairs.length / alphabet.length) * 100} className="mb-4 sm:mb-6" />

        {testMode ? (
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-3">Find the letter:</h2>
            <div className="text-5xl sm:text-6xl font-bold text-blue-600">{testLetter}</div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* 只在有 letterPairs 时渲染内容 */}
            {letterPairs.length > 0 && (
              <>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-purple-500 text-center sm:text-left">
                    Uppercase
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-4 justify-center">
                    {letterPairs.filter(pair => pair && pair.uppercase).map(pair => renderLetterButton(pair, true))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-purple-500 text-center sm:text-left">
                    Lowercase
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-4 justify-center">
                    {lowercaseOrder.map(pair => renderLetterButton(pair, false))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6">
          <Button onClick={resetGame} variant="outline" className="text-sm sm:text-base">
            New Game
          </Button>
          <Button 
            onClick={() => selectedUppercase && playLetterSound(selectedUppercase)} 
            disabled={!selectedUppercase}
            className="text-sm sm:text-base"
          >
            <Volume2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Hear Letter
          </Button>
          <Button 
            onClick={startTestMode} 
            disabled={testMode || matchedPairs.length === 0}
            className="text-sm sm:text-base"
          >
            <Brain className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Test Mode
          </Button>
        </div>

        <AnimatePresence>
          {showImage && currentLetterDetails && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-4"
            >
              <div className="bg-white p-3 sm:p-4 rounded-xl w-[80vw] sm:w-auto max-w-[90vw] max-h-[90vh]">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">
                    {currentLetterDetails.letter} {currentLetterDetails.lowercase}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {currentLetterDetails.word} [{currentLetterDetails.pronunciation}]
                  </p>
                </div>
                <img 
                  src={letterImages[showImage]} 
                  alt={`${currentLetterDetails.word} - Letter ${showImage} illustration`}
                  aria-label={`Illustration for letter ${showImage}`}
                  role="img"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}