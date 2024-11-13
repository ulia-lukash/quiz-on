import React, { useState, useEffect } from 'react';

type CountdownProps = {
    targetDate: string;
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        'дней': Math.floor(difference / (1000 * 60 * 60 * 24)),
        'часов': Math.floor((difference / (1000 * 60 * 60)) % 24),
        'минут': Math.floor((difference / 1000 / 60) % 60),
        'секунд': Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div className="text-white text-xl">
      {timerComponents.length ? timerComponents : <span>Игра завершена!</span>}
    </div>
  );
};

export default Countdown;
