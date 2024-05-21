import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './counterSlice';

const CounterButtons = ({ increment, decrement }) => {
  return (
    <div>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default connect(null, { increment, decrement })(CounterButtons);