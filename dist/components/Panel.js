'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesheet = {
  panelWrapper: {
    width: '100%'
  },
  panel: {
    padding: '10px 15px',
    width: 'auto',
    position: 'relative'
  }
};

var Info = function (_React$Component) {
  (0, _inherits3.default)(Info, _React$Component);

  function Info(props) {
    (0, _classCallCheck3.default)(this, Info);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Info.__proto__ || (0, _getPrototypeOf2.default)(Info)).call(this, props));

    _this.state = { info: '' };
    _this.onAddInfo = _this.onAddInfo.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Info, [{
    key: 'onAddInfo',
    value: function onAddInfo(info) {
      this.setState({ info: info });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          channel = _props.channel,
          api = _props.api;
      // Listen to the info and render it.

      channel.on('kadira/info/add_with_info', this.onAddInfo);

      // Clear the current info on every story change.
      this.stopListeningOnStory = api.onStory(function () {
        _this2.onAddInfo('');
      });
    }

    // This is some cleanup tasks when the Info panel is unmounting.

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      var _props2 = this.props,
          channel = _props2.channel,
          api = _props2.api;

      this.props.channel.removeListener('kadira/info/add_with_info', this.onAddInfo);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: stylesheet.panelWrapper },
        _react2.default.createElement(
          'div',
          { style: stylesheet.panel },
          _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.info } })
        )
      );
    }
  }]);
  return Info;
}(_react2.default.Component);

exports.default = Info;