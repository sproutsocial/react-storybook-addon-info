'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _Panel = require('./components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_storybookAddons2.default.register('kadira/add_with_info', function (api) {
  var channel = _storybookAddons2.default.getChannel();

  _storybookAddons2.default.addPanel('kadira/add_with_info/panel', {
    title: 'Info',
    render: function render() {
      return _react2.default.createElement(_Panel2.default, { channel: _storybookAddons2.default.getChannel(), api: api, key: 'with-info-panel' });
    }
  });
});