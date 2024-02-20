import styles from './CylonLoadingBar.module.scss';
import { useGlobalState } from '../../providers/GlobalStateProvider/GlobalStateProvider';
import { useEffect, useState } from 'react';

export const CylonLoadingBar = () => {
  const { isLoading } = useGlobalState();
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    const timer = setTimeout(() => setShow(isLoading), 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return show ? <div className={styles.cylonLoadingBar} /> : null;
};
