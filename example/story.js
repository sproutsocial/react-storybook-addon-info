import React from 'react';
import Button from './Button';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { storiesOf, action } from '@kadira/storybook';
import { addInfo } from '../src';

storiesOf('Button', module)
  .addDecorator(addInfo)
  .addDecorator(withKnobs)
  .add('Example', () => (
    <Button
      label="The Button"
      onClick={action('onClick')}
    />
  ))
  .add('Simple Usage', () => (
    <div>
      <Button
        label="Lorem ipsum Eiusmod minim ex nulla irure officia velit ut labore aliqua mollit non deserunt aute voluptate amet cupidatat Ut sunt."
        onClick={action('onClick')}
      />
      <Button
        label="The Button"
        onClick={action('onClick')}
      />
      <Button
        label="Lorfg;dflsiglsdfgljhhflsdghjlkdsfghjklsdhjkfghjklsdfghksdfgjlkdsfghkljfdghkdslfgjhdjksflghjksdfghjklhjkdsfghjlkdsfhgjklsdfhjlghjkldsfgjhkldsfhjkldfshkhkjlunt."
        test="Lorfg;dflsiglsdfgljhhflsdghjlkdsfghjklsdhjkfghjklsdfghksdfgjlkdsfghkljfdghkdslfgjhdjksflghjksdfghjklhjkdsfghjlkdsfhgjklsdfhjlghjkldsfgjhkldsfhjkldfshkhkjlunt."
        onClick={action('onClick')}
      />
    </div>
  ));