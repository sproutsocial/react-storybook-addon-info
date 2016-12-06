import React from 'react';
import addons from '@kadira/storybook-addons';
import ReactDOMServer from 'react-dom/server';
import Info from './components/Info';
import { H1, H2, H3, H4, H5, H6, Code, P, UL, A, LI } from './components/markdown';

const defaultOptions = {
  header: true,
  source: true,
  propTables: [],
};

const defaultMtrcConf = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: Code,
  p: P,
  a: A,
  li: LI,
  ul: UL,
};

export function addInfo(storyFn, context, _options) {
	// console.log(context, 'context');
	// console.log(storyFn, 'storyFn');

	const channel = addons.getChannel();
	const mtrcConf = { ...defaultMtrcConf };
	const options = {
	  ...defaultOptions,
	  ..._options
	};

	// props.propTables can only be either an array of components or null
	// propTables option is allowed to be set to 'false' (a boolean)
	// if the option is false, replace it with null to avoid react warnings
	if (!options.propTables) {
	  options.propTables = null;
	}

	if (options && options.mtrcConf) {
	  Object.assign(mtrcConf, options.mtrcConf);
	}

	const props = {
		context,
		children: storyFn(context),
		showHeader: Boolean(options.header),
		showSource: Boolean(options.source),
		propTables: options.propTables,
		mtrcConf
	};

	// console.log(Info.__docgenInfo, 'Info __docgenInfo');

	const html = ReactDOMServer.renderToStaticMarkup(<Info {...props} />);

	// send the info to the channel.
    channel.emit('kadira/info/add_with_info', html);

	return storyFn();
}

export function setDefaults(newDefaults) {
  return Object.assign(defaultOptions, newDefaults);
};