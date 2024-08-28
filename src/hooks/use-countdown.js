import { useEffect, useRef, useState, useMemo } from 'react'

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = `0${Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2)
  const minutes = `0${Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2)
  const seconds = `0${Math.floor((countDown % (1000 * 60)) / 1000)}`.slice(-2)

  return { days, hours, minutes, seconds }
}

export const useCountdown = (minutes, isStarted = false, isStopped = false, onExpire,) => {
  const countDownDate = useMemo(() => +new Date(new Date(+new Date() + minutes * 60 * 1000).getTime()), [minutes, isStarted])
  const timeout = useRef()

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime() > 0 ? countDownDate - new Date().getTime() : 0
  )
  const [isExpired, setIsExpired] = useState(isStarted ? countDownDate - new Date().getTime() < 0 : false)

  useEffect(() => {
    if (isStarted) {
      if (isStopped) { clearTimeout(timeout.current) }
      else {
        if (countDownDate - new Date().getTime() > 0) {
          timeout.current = setTimeout(() => {
            const updatedCountdown = countDownDate - new Date().getTime()
            if (updatedCountdown > 0) {
              setCountDown(countDownDate - new Date().getTime())
              setIsExpired(false)
            } else {
              setCountDown(0)
              setIsExpired(true)
              onExpire?.()
            }
          }, 1000)
        } else {
          setCountDown(0)
          setIsExpired(true)
        }
      }

    }
    return () => clearTimeout(timeout.current)
  }, [countDownDate, countDown, isStarted, isStopped])

  useEffect(() => {
    if (countDownDate - new Date().getTime() > 0 && isStarted && !isStopped) {
      setIsExpired(false)
      setCountDown(countDownDate - new Date().getTime())
    }
  }, [countDownDate, isStarted, isStopped])

  return { timer: getReturnValues(countDown), isExpired }
}
