import React from 'react';
import addons from '@kadira/storybook-addons';
import Panel from './components/Panel';

addons.register('kadira/add_with_info', api => {
  const channel = addons.getChannel();

  addons.addPanel('kadira/add_with_info/panel', {
    title: 'Info',
    render: () => (
      <Panel channel={addons.getChannel()} api={api} key="with-info-panel" />
    ),
  });
});