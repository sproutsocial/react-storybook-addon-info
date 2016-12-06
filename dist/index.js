'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.addInfo = addInfo;
exports.setDefaults = setDefaults;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _Info = require('./components/Info');

var _Info2 = _interopRequireDefault(_Info);

var _markdown = require('./components/markdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
		header: true,
		source: true,
		propTables: []
};

var defaultMtrcConf = {
		h1: _markdown.H1,
		h2: _markdown.H2,
		h3: _markdown.H3,
		h4: _markdown.H4,
		h5: _markdown.H5,
		h6: _markdown.H6,
		code: _markdown.Code,
		p: _markdown.P,
		a: _markdown.A,
		li: _markdown.LI,
		ul: _markdown.UL
};

function addInfo(storyFn, context, _options) {
		// console.log(context, 'context');
		// console.log(storyFn, 'storyFn');

		var channel = _storybookAddons2.default.getChannel();
		var mtrcConf = (0, _extends3.default)({}, defaultMtrcConf);
		var options = (0, _extends3.default)({}, defaultOptions, _options);

		// props.propTables can only be either an array of components or null
		// propTables option is allowed to be set to 'false' (a boolean)
		// if the option is false, replace it with null to avoid react warnings
		if (!options.propTables) {
				options.propTables = null;
		}

		if (options && options.mtrcConf) {
				(0, _assign2.default)(mtrcConf, options.mtrcConf);
		}

		var props = {
				context: context,
				children: storyFn(context),
				showHeader: Boolean(options.header),
				showSource: Boolean(options.source),
				propTables: options.propTables,
				mtrcConf: mtrcConf
		};

		// console.log(Info.__docgenInfo, 'Info __docgenInfo');

		var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Info2.default, props));

		// send the info to the channel.
		channel.emit('kadira/info/add_with_info', html);

		return storyFn();
}

function setDefaults(newDefaults) {
		return (0, _assign2.default)(defaultOptions, newDefaults);
};