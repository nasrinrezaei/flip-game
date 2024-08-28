import cx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import classes from './index.module.scss';
import { useCountdown } from '@/hooks/use-countdown';

function RcCountDown({
  title,
  doneTitle = '',
  resetClass = '',
  isStarted = false,
  onDoneAction = () => {},
  minutes = 2,
  className = '',
  isStopped = false
}) {
  const { timer, isExpired } = useCountdown(minutes, isStarted, isStopped);

  useEffect(() => {
    isExpired && onDoneAction?.();
  }, [isExpired]);
  return (
    <div>
      {isStarted ? (
        <div className={classes['rc-count-down']}>
          <span className={cx(classes['rc-count-down__time'], className)}>
            {timer.minutes}:{timer.seconds}
          </span>
          {title && <span className={classes['rc-count-down__title']}>{title}</span>}
        </div>
      ) : (
        <div className={cx([resetClass])}>{doneTitle}</div>
      )}
    </div>
  );
}
RcCountDown.propTypes = {
  isStarted: PropTypes.bool,
  title: PropTypes.string,
  doneTitle: PropTypes.string,
  resetClass: PropTypes.string,
  onDoneAction: PropTypes.func,
  minutes: PropTypes.number,
  className: PropTypes.string,
  isStopped: PropTypes.bool
};
export default memo(RcCountDown);
