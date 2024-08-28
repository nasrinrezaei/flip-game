import cx from 'clsx';
import { memo } from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.scss';
import RcImage from '@/components/RcImage';

export function Card({ item = {}, onSelect = () => [], isSelected = false, index }) {
  const selectItemsIsAble = (item) => {
    onSelect?.(item);
  };
  return (
    <div
      className={cx([
        classes['card__item'],
        {
          [classes['card__item--selected']]: isSelected
        }
      ])}
      onClick={() => selectItemsIsAble(item)}>
      <RcImage source={item.src} className={classes['card__item-back']} ratio="1" />
      <div className={classes['card__item-front']}> {index + 1}</div>
    </div>
  );
}
Card.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  index: PropTypes.number
};
export default memo(Card);
