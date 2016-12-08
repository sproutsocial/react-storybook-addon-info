import React from 'react';
import { configure } from '@kadira/storybook';
// import { setDefaults } from '../src';

// setDefaults({
// 	header: true
// });

configure(function () {
  require('../example/story');
}, module);
