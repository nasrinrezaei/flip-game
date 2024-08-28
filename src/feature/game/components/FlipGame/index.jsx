import Card from './Card';
import { useMemo } from 'react';
import RcCountDown from '@/components/RcCountDown';
import PropTypes from 'prop-types';
import classes from './index.module.scss';
import { memo, useEffect, useState, useRef, useCallback } from 'react';
const originalArray = [
  { src: './src/assets/images/images/t1.jpeg', selected: false },
  { src: './src/assets/images/images/t2.jpeg', selected: false },
  { src: './src/assets/images/images/t3.jpeg', selected: false },
  { src: './src/assets/images/images/t4.jpeg', selected: false },
  { src: './src/assets/images/images/t5.jpg', selected: false },
  { src: './src/assets/images/images/t6.jpg', selected: false },
  { src: './src/assets/images/images/t7.jpg', selected: false },
  { src: './src/assets/images/images/t8.jpg', selected: false }
];

const shuffle = (array) => {
  let newArray = structuredClone(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function FlipGame({ movementNumber = 40, totalTime = 1 }) {
  const [arrayOfCards, setArrayOfCards] = useState([]);
  const [startCountDown, setStartCountDown] = useState(false);
  const [timeIsFinish, setTimeIsFinish] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  const [totalMovement, setTotalMovement] = useState(movementNumber);
  const [firstSelectedItem, setFirstSelectedItem] = useState();
  const [secondSelectedItem, setSecondSelectedItem] = useState();
  const oneSecondTimer = useRef(null);
  useEffect(() => {
    restInitialGame();
    return () => clearTimeout(oneSecondTimer?.current);
  }, []);

  const resetItems = (newSelectedItem = null) => {
    clearTimeout(oneSecondTimer?.current);
    setFirstSelectedItem(newSelectedItem);
    setSecondSelectedItem();
  };
  const changeStatusOfSelectedItems = (firstItem, secondItem) => {
    setArrayOfCards((prev) =>
      prev.map((item) =>
        item.id === firstItem.id || item.id === secondItem.id
          ? { ...item, selected: true }
          : { ...item }
      )
    );
  };
  const startOneSecondTime = () => {
    clearTimeout(oneSecondTimer?.current);
    oneSecondTimer.current = setTimeout(() => {
      resetItems();
    }, 1000);
  };

  const selectSecondItem = (selectedItem) => {
    setSecondSelectedItem(selectedItem);
    firstSelectedItem?.src === selectedItem?.src
      ? changeStatusOfSelectedItems(firstSelectedItem, selectedItem)
      : startOneSecondTime();
  };
  const selectItems = (selectedItem) => {
    !startCountDown && setStartCountDown(true);
    setTotalMovement((prev) => prev - 1);
    !firstSelectedItem
      ? setFirstSelectedItem(selectedItem)
      : secondSelectedItem
        ? resetItems(selectedItem)
        : selectSecondItem(selectedItem);
  };
  const selectItemsIsAble = useCallback(
    (selectedItem) => {
      return (
        totalMovement !== 0 &&
        !selectedItem.selected &&
        !showAllCards &&
        !timeIsFinish &&
        (!firstSelectedItem || firstSelectedItem !== selectedItem) &&
        selectItems(selectedItem)
      );
    },
    [selectItems, totalMovement, timeIsFinish, showAllCards]
  );
  const restInitialGame = () => {
    setArrayOfCards(() =>
      shuffle([...originalArray, ...originalArray].map((item, index) => ({ ...item, id: index })))
    );
    setShowAllCards((prev) => true);
    oneSecondTimer.current = setTimeout(() => {
      setShowAllCards((prev) => false);
    }, 1000);
  };

  const reStartGame = () => {
    clearTimeout(oneSecondTimer?.current);
    setIsStopped(() => false);
    resetItems();
    setArrayOfCards(() =>
      shuffle([...originalArray, ...originalArray].map((item, index) => ({ ...item, id: index })))
    );
    setStartCountDown(() => false);
    setTimeIsFinish(() => false);
    setTotalMovement(movementNumber);
    setShowAllCards((prev) => true);
    oneSecondTimer.current = setTimeout(() => {
      setShowAllCards((prev) => false);
    }, 1000);
  };
  const onDoneAction = useCallback(() => {
    setTimeIsFinish(() => true);
  }, []);
  const isWinner = useMemo(() => {
    if (arrayOfCards.length > 0 && arrayOfCards?.every((item) => !!item.selected)) {
      setIsStopped(() => true);
      return true;
    }
  }, [arrayOfCards]);
  const isLoser = useMemo(() => {
    if ((timeIsFinish || totalMovement === 0) && arrayOfCards?.some((item) => !item.selected)) {
      setIsStopped(() => true);
      return true;
    }
  }, [timeIsFinish, totalMovement, arrayOfCards]);
  return (
    <div className={classes['flip-game__container']}>
      <div className={classes['flip-game']}>
        <div className={classes['flip-game__movement-and-time-container']}>
          <div>{`تعداد حرکت :${totalMovement}`}</div>
          <div className={classes['flip-game__movement-and-time-container-timer']}>
            <span>زمان</span>

            <RcCountDown
              className={classes['flip-game__movement-and-time-container-timer-time']}
              minutes={totalTime}
              isStarted={startCountDown}
              doneTitle={`${totalTime}:00`}
              resetClass={classes['login__reset-otp']}
              onDoneAction={onDoneAction}
              isStopped={isStopped}
            />
          </div>
        </div>
        <div className={classes['flip-game__items-container']}>
          {arrayOfCards.map((item, index) => (
            <Card
              index={index}
              key={item.id}
              item={item}
              onSelect={selectItemsIsAble}
              isSelected={
                item?.id === firstSelectedItem?.id ||
                item?.id === secondSelectedItem?.id ||
                item.selected ||
                showAllCards
              }
            />
          ))}
        </div>
      </div>
      <div className={classes['flip-game-details']}>
        <div className={classes['flip-game-details-result']}>
          {isWinner && <div className={classes['flip-game-details-result-txt']}> برنده شدی :)</div>}

          {isLoser && <div className={classes['flip-game-details-result-txt']}>باختی:(</div>}
        </div>
        <div>
          <button onClick={() => reStartGame()} className={classes['flip-game__items-button']}>
            شروع دوباره
          </button>
        </div>
      </div>
    </div>
  );
}
FlipGame.propTypes = {
  movementNumber: PropTypes.number
};
export default memo(FlipGame);
