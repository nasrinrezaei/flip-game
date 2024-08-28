import 'lazysizes';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import classes from './index.module.scss';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { lazyImage, noImage } from '@/configs/default-image';

function RcImage({ source, alt = '', ratio = '', lazy = false, className = '' }) {
  const [error, setError] = useState(false);
  const src = useMemo(
    () => (error ? noImage : lazy ? lazyImage : source || noImage),
    [error, source, lazy]
  );
  const dataSrc = useMemo(() => source || noImage, [source]);

  const onError = () => {
    setError(true);
  };
  return (
    <div
      className={clsx([
        classes['rc-image'],

        { [classes['rc-image--page-cover']]: ratio },
        className
      ])}>
      <img
        data-src={dataSrc}
        src={src}
        alt={alt}
        className={clsx([{ lazyload: lazy }])}
        onError={onError}
      />
      {ratio && <div style={{ paddingBottom: `${ratio * 100}%` }} />}
    </div>
  );
}

RcImage.propTypes = {
  lazy: PropTypes.bool,
  alt: PropTypes.string,
  source: PropTypes.string.isRequired,
  ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
export default RcImage;
