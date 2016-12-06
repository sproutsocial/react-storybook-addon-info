'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypesMap = new _map2.default();
for (var typeName in _react2.default.PropTypes) {
  if (!_react2.default.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  var type = _react2.default.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

var stylesheet = {
  propTable: {
    fontSize: 14,
    width: '100%',
    maxWidth: '100%',
    borderSpacing: '0',
    borderCollapse: 'collapse'
  },
  req: {
    fontWeight: 600
  },
  notReq: {
    color: '#828282'
  },
  propTableThead: {
    th: {
      padding: 10,
      verticalAlign: 'bottom',
      borderBottom: '2px solid #eaeaea',
      textAlign: 'left'
    }
  },
  propTableTbody: {
    td: {
      padding: 10,
      borderTop: '1px solid #eaeaea',
      verticalAlign: 'top',
      textAlign: 'left'
    }
  },
  valueStyles: {
    func: {
      color: '#1fad83'
    },
    attr: {
      color: '#a6a28c'
    },
    object: {
      color: '#d73737'
    },
    array: {
      color: '#d43552'
    },
    number: {
      color: '#b65611'
    },
    string: {
      color: '#6684e1'
    },
    bool: {
      color: '#b854d4'
    },
    empty: {
      color: '#9a967f'
    }
  }
};

var PropTable = function (_React$Component) {
  (0, _inherits3.default)(PropTable, _React$Component);

  function PropTable() {
    (0, _classCallCheck3.default)(this, PropTable);
    return (0, _possibleConstructorReturn3.default)(this, (PropTable.__proto__ || (0, _getPrototypeOf2.default)(PropTable)).apply(this, arguments));
  }

  (0, _createClass3.default)(PropTable, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;

      if (!type) {
        return null;
      }

      var props = {};

      if (type.propTypes) {
        for (var property in type.propTypes) {
          if (!type.propTypes.hasOwnProperty(property)) {
            continue;
          }
          var typeInfo = type.propTypes[property];
          var propType = PropTypesMap.get(typeInfo) || 'other';
          var required = typeInfo.isRequired === undefined ? _react2.default.createElement(
            'span',
            { style: stylesheet.req },
            '\u2713'
          ) : _react2.default.createElement(
            'span',
            { style: stylesheet.notReq },
            '-'
          );
          props[property] = { property: property, propType: propType, required: required };
        }
      }

      if (type.defaultProps) {
        for (var _property in type.defaultProps) {
          if (!type.defaultProps.hasOwnProperty(_property)) {
            continue;
          }
          var value = type.defaultProps[_property];
          if (value === undefined) {
            continue;
          }
          if (!props[_property]) {
            props[_property] = { property: _property };
          }
          props[_property].defaultValue = value;
        }
      }

      var array = (0, _values2.default)(props);
      if (!array.length) {
        return _react2.default.createElement(
          'small',
          null,
          'No propTypes defined!'
        );
      }
      array.sort(function (a, b) {
        return a.property > b.property;
      });

      return _react2.default.createElement(
        'table',
        { style: stylesheet.propTable },
        _react2.default.createElement(
          'thead',
          { style: stylesheet.propTableThead.base },
          _react2.default.createElement(
            'tr',
            { style: stylesheet.propTableThead.tr },
            _react2.default.createElement(
              'th',
              { style: stylesheet.propTableThead.th },
              'Property'
            ),
            _react2.default.createElement(
              'th',
              { style: stylesheet.propTableThead.th },
              'Default'
            ),
            _react2.default.createElement(
              'th',
              { style: stylesheet.propTableThead.th },
              'PropType'
            ),
            _react2.default.createElement(
              'th',
              { style: stylesheet.propTableThead.th },
              'Required'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          { style: stylesheet.propTableTbody.base },
          array.map(function (row) {
            return _react2.default.createElement(
              'tr',
              { key: row.property, style: stylesheet.propTableTbody.tr },
              _react2.default.createElement(
                'td',
                { style: stylesheet.propTableTbody.td },
                row.property
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.propTableTbody.td },
                row.defaultValue === undefined ? _react2.default.createElement(
                  'span',
                  { style: stylesheet.notReq },
                  '-'
                ) : _react2.default.createElement(_PropVal2.default, { val: row.defaultValue })
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.propTableTbody.td },
                _react2.default.createElement(
                  'span',
                  { style: stylesheet.valueStyles[row.propType] },
                  row.propType
                )
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.propTableTbody.td },
                row.required
              )
            );
          })
        )
      );
    }
  }]);
  return PropTable;
}(_react2.default.Component);

exports.default = PropTable;


PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: _react2.default.PropTypes.func
};