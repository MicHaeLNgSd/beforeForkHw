import React, { Component } from 'react';
import styles from './ClassComponent.module.scss';

class ClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0,
    };
  }

  handleClick = () => {
    this.setState({
      clicks: this.state.clicks + 1,
    });
    // this.setState({
    //   clicks: this.state.clicks + 1
    // });

    // this.setState((state) => {
    //   return {
    //     clicks: state.clicks + 1
    //   }
    // });
    // this.setState((state) => {
    //   return {
    //     clicks: state.clicks + 1
    //   }
    // });
  };

  componentDidMount() {
    console.log('first render class component');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('after first render class component');

    if (prevProps.isOn !== this.props.isOn) {
      // this.setState();
    }
  }

  componentWillUnmount() {
    console.log('before unmount class component');
  }

  render() {
    const { test, test2 } = this.props;
    const { clicks } = this.state;

    return (
      <div className={styles.container}>
        <h1>ClassComponent</h1>
        <p>test is {test}</p>
        <p>test2 is{test2}</p>
        <p>Clicks count: {clicks}</p>
        <button onClick={this.handleClick}>Add click</button>
      </div>
    );
  }
}

export default ClassComponent;
