'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _markdownToReactComponents = require('markdown-to-react-components');

var _markdownToReactComponents2 = _interopRequireDefault(_markdownToReactComponents);

var _PropTable = require('./PropTable');

var _PropTable2 = _interopRequireDefault(_PropTable);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _theme = require('./theme');

var _markdown = require('./markdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  This is an awesome looking button for React.
*/
var stylesheet = {
  infoBody: (0, _extends3.default)({}, _theme.baseFonts, {
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: 15
  }),
  header: {
    h1: {
      margin: 0,
      padding: 0,
      fontSize: 34
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: 14,
      color: '#828282',
      textTransform: 'uppercase'
    },
    h3: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 600,
      fontSize: 18
    },
    h4: {
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 600,
      fontSize: 15
    },
    body: {
      borderBottom: '1px solid #eaeaea',
      marginBottom: 20
    }
  },
  section: {
    margin: '0 0 20px 0'
  },
  subSection: {
    padding: '0 15px',
    margin: '0 0 20px 0'
  }
};

var Info = function (_React$Component) {
  (0, _inherits3.default)(Info, _React$Component);

  function Info(props) {
    (0, _classCallCheck3.default)(this, Info);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Info.__proto__ || (0, _getPrototypeOf2.default)(Info)).call(this, props));

    _markdownToReactComponents2.default.configure(_this.props.mtrcConf);
    return _this;
  }

  (0, _createClass3.default)(Info, [{
    key: '_getInfoHeader',
    value: function _getInfoHeader() {
      var _props = this.props,
          context = _props.context,
          showHeader = _props.showHeader;


      if (!context || !showHeader) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { style: stylesheet.header.body },
        _react2.default.createElement(
          'h1',
          { style: stylesheet.header.h1 },
          context.kind
        ),
        _react2.default.createElement(
          'h2',
          { style: stylesheet.header.h2 },
          context.story
        )
      );
    }
  }, {
    key: '_getInfoContent',
    value: function _getInfoContent() {
      if (!this.props.info) {
        return '';
      }
      var lines = this.props.info.split('\n');
      while (lines[0].trim() === '') {
        lines.shift();
      }
      var padding = 0;
      var matches = lines[0].match(/^ */);
      if (matches) {
        padding = matches[0].length;
      }
      var source = lines.map(function (s) {
        return s.slice(padding);
      }).join('\n');
      return _react2.default.createElement(
        'div',
        { style: stylesheet.section },
        (0, _markdownToReactComponents2.default)(source).tree
      );
    }
  }, {
    key: '_getSourceCode',
    value: function _getSourceCode() {
      if (!this.props.showSource) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { style: stylesheet.section },
        _react2.default.createElement(
          'h3',
          { style: stylesheet.header.h3 },
          'Story Source'
        ),
        _react2.default.createElement(
          'div',
          { style: stylesheet.subSection },
          _react2.default.createElement(
            _markdown.Pre,
            null,
            _react2.default.Children.map(this.props.children, function (root, idx) {
              // console.log(root, 'root');
              // console.log(root.__docgenInfo, '__docgenInfo');
              // console.log(STORYBOOK_REACT_CLASSES, 'STORYBOOK_REACT_CLASSES');
              return _react2.default.createElement(_Node2.default, { key: idx, depth: 0, node: root });
            })
          )
        )
      );
    }
  }, {
    key: '_getPropTables',
    value: function _getPropTables() {
      var types = new _map2.default();

      if (this.props.propTables === null) {
        return null;
      }

      if (!this.props.children) {
        return null;
      }

      if (this.props.propTables) {
        this.props.propTables.forEach(function (type) {
          types.set(type, true);
        });
      }

      // depth-first traverse and collect types
      function extract(children) {
        if (!children) {
          return;
        }
        if (Array.isArray(children)) {
          children.forEach(extract);
          return;
        }
        if (children.props && children.props.children) {
          extract(children.props.children);
        }
        if (typeof children === 'string' || typeof children.type === 'string') {
          return;
        }
        if (children.type && !types.has(children.type)) {
          types.set(children.type, true);
        }
      }

      // extract components from children
      extract(this.props.children);

      var array = (0, _from2.default)(types.keys());
      array.sort(function (a, b) {
        return (a.displayName || a.name) > (b.displayName || b.name);
      });

      var propTables = array.map(function (type, idx) {
        return _react2.default.createElement(
          'div',
          { style: stylesheet.subSection, key: idx },
          _react2.default.createElement(
            'h4',
            { style: stylesheet.header.h4 },
            '<',
            type.displayName || type.name,
            ' /> Component:'
          ),
          _react2.default.createElement(_PropTable2.default, { type: type })
        );
      });

      if (!propTables || propTables.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { style: stylesheet.section },
        _react2.default.createElement(
          'h3',
          { style: stylesheet.header.h3 },
          'Documentation'
        ),
        propTables
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: stylesheet.infoBody },
        this._getInfoHeader(),
        this._getInfoContent(),
        this._getSourceCode(),
        this._getPropTables()
      );
    }
  }]);
  return Info;
}(_react2.default.Component);

exports.default = Info;


Info.displayName = 'Story';
Info.propTypes = {
  /**
    Label for the button.
  */
  context: _react2.default.PropTypes.object,
  propTables: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
  showHeader: _react2.default.PropTypes.bool,
  showSource: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),
  mtrcConf: _react2.default.PropTypes.object
};

Info.defaultProps = {
  showHeader: true,
  showSource: true,
  mtrcConf: {}
};