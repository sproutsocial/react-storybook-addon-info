/**
  This is an awesome looking button for React.
*/
import React from 'react';
import MTRC from 'markdown-to-react-components';
import PropTable from './PropTable';
import Node from './Node';
import { baseFonts } from './theme';
import { Pre } from './markdown';

const stylesheet = {
  infoBody: {
    ...baseFonts,
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: 15,
  },
  header: {
    h1: {
      margin: 0,
      padding: 0,
      fontSize: 34,
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: 14,
      color: '#828282',
      textTransform: 'uppercase',
    },
    h3: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 600,
      fontSize: 18,
    },
    h4: {
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 600,
      fontSize: 15,
    },
    body: {
      borderBottom: '1px solid #eaeaea',
      marginBottom: 20,
    },
  },
  section: {
    margin: '0 0 20px 0',
  },
  subSection: {
    padding: '0 15px',
    margin: '0 0 20px 0',
  },
};

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    MTRC.configure(this.props.mtrcConf);
  }

  _getInfoHeader() {
    const {
      context,
      showHeader
    } = this.props;

    if (!context || !showHeader) {
      return null;
    }

    return (
      <div style={stylesheet.header.body}>
        <h1 style={stylesheet.header.h1}>{context.kind}</h1>
        <h2 style={stylesheet.header.h2}>{context.story}</h2>
      </div>
    );
  }

  _getInfoContent() {
    if (!this.props.info) {
      return '';
    }
    const lines = this.props.info.split('\n');
    while (lines[0].trim() === '') {
      lines.shift();
    }
    let padding = 0;
    const matches = lines[0].match(/^ */);
    if (matches) {
      padding = matches[0].length;
    }
    const source = lines.map(s => s.slice(padding)).join('\n');
    return (
      <div style={stylesheet.section}>
        {MTRC(source).tree}
      </div>
    );
  }

  _getSourceCode() {
    if (!this.props.showSource) {
      return null;
    }

    return (
      <div style={stylesheet.section}>
        <h3 style={stylesheet.header.h3}>Story Source</h3>
        <div style={stylesheet.subSection}>
          <Pre>
          {React.Children.map(this.props.children, (root, idx) => {
            // console.log(root, 'root');
            // console.log(root.__docgenInfo, '__docgenInfo');
            // console.log(STORYBOOK_REACT_CLASSES, 'STORYBOOK_REACT_CLASSES');
            return (
              <Node key={idx} depth={0} node={root} />
            )
          })}
          </Pre>
        </div>
      </div>
    );
  }

  _getPropTables() {
    const types = new Map();

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

    const array = Array.from(types.keys());
    array.sort(function (a, b) {
      return (a.displayName || a.name) > (b.displayName || b.name);
    });

    const propTables = array.map(function (type, idx) {
      return (
        <div style={stylesheet.subSection} key={idx}>
          <h4 style={stylesheet.header.h4}>&lt;{type.displayName || type.name} /&gt; Component:</h4>
          <PropTable type={type} />
        </div>
      );
    });

    if (!propTables || propTables.length === 0) {
      return null;
    }

    return (
      <div style={stylesheet.section}>
        <h3 style={stylesheet.header.h3}>Documentation</h3>
        {propTables}
      </div>
    );
  }

  render() {
    return (
      <div style={stylesheet.infoBody}>
        { this._getInfoHeader() }
        { this._getInfoContent() }
        { this._getSourceCode() }
        { this._getPropTables() }
      </div>
    );
  }
}

Info.displayName = 'Story';
Info.propTypes = {
  /**
    Label for the button.
  */
  context: React.PropTypes.object,
  propTables: React.PropTypes.arrayOf(React.PropTypes.func),
  showHeader: React.PropTypes.bool,
  showSource: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
     React.PropTypes.object,
     React.PropTypes.array,
   ]),
  mtrcConf: React.PropTypes.object
};

Info.defaultProps = {
  showHeader: true,
  showSource: true,
  mtrcConf: {}
};