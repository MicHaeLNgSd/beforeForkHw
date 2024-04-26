import { useState, useEffect } from 'react';
import styles from './FuncComponent.module.scss';

function FuncComponent(props) {
  // props.test = 1000;
  const { test, test2 } = props;

  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log(`Clicks is : ${clicks}`);
  }, [clicks]);

  useEffect(() => {
    console.log('after each render func component');

    return () => {
      console.log('before unmount and before 2+ render func component');
    };
  });

  const handleClick = () => {
    setClicks(clicks + 1);

    // setClicks((clicks) => clicks + 1);
  };

  return (
    <div className={styles.container}>
      <h1>FuncComponent</h1>
      <p>test is {test}</p>
      <p>test2 is{test2}</p>
      <p>Clicks count: {clicks}</p>
      <button onClick={handleClick}>Add click</button>
    </div>
  );
}

export default FuncComponent;
