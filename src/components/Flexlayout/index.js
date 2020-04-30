import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export const FlexLayout = ({ vertical, horizontal, classNme, children, other }) => {
  const cls = classNames(
    styles.flex,
    { [styles.vertical]: vertical, [styles.horizontal]: horizontal },
    classNme
  );

  return <div className={cls} {...other}>{children}</div>;
};
