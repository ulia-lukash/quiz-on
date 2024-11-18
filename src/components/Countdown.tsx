import React, { useState, useEffect } from 'react';

type CountdownProps = {
  registration_open_time: string;
  start_time: string
};

export default function Countdown({start_time, registration_open_time}: CountdownProps) {
  
  const calculateTimeLeft = () => {
    
    const difference = +new Date(registration_open_time) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        'часов': Math.floor((difference / (1000 * 60 * 60)) % 24),
        'минут': Math.floor((difference / 1000 / 60) % 60),
        'секунд': Math.floor((difference / 1000) % 60),
      };
    }

    if (difference > 86400000) {
      timeLeft = {
        'дней': Math.floor(difference / (1000 * 60 * 60 * 24))
      }
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());
  const [isOldGame, setIsOldGame]= useState(new Date(start_time) < new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setIsOldGame(new Date(start_time) < new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [registration_open_time]);

  const timerComponents: any[] = [];

  for (const [interval, value] of Object.entries(timeLeft)) {
    if (interval === 'дней' && value > 1) {
      timerComponents.push(
          "Регистрация скоро откроется!"
      );
      break;
    } else {
      timerComponents.push(value.toString().length === 1 ? '0' + value : value);
    }
  }

  return (
    <div className="text-white text-xl">
      {isOldGame ? <span>Игра завершена!</span> : timerComponents.length ? timerComponents.join(':') : <span></span>}
    </div>
  );
};