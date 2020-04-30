import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export const Avator = ({ src, classNme, children }) => {
  const cls = classNames({ [styles.img]: true }, classNme);

  return <img className={cls} src={src} />;
};
