import React from 'react';
import PropVal from './PropVal';

const PropTypesMap = new Map();
for (const typeName in React.PropTypes) {
  if (!React.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  const type = React.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

const stylesheet = {
  propTable: {
    fontSize: 14,
    width: '100%',
    maxWidth: '100%',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  req: {
    fontWeight: 600,
  },
  notReq: {
    color: '#828282',
  },
  propTableThead: {
    th: {
      padding: 10,
      verticalAlign: 'bottom',
      borderBottom: '2px solid #eaeaea',
      textAlign: 'left', 
    },
  },
  propTableTbody: {
    td: {
      padding: 10,
      borderTop: '1px solid #eaeaea',
      verticalAlign: 'top',
      textAlign: 'left', 
    },
  },
  valueStyles: {
    func: {
      color: '#1fad83',
    },
    attr: {
      color: '#a6a28c',
    },
    object: {
      color: '#d73737',
    },
    array: {
      color: '#d43552',
    },
    number: {
      color: '#b65611',
    },
    string: {
      color: '#6684e1',
    },
    bool: {
      color: '#b854d4',
    },
    empty: {
      color: '#9a967f',
    },
  },
};

export default class PropTable extends React.Component {
  render() {
    const type = this.props.type;

    if (!type) {
      return null;
    }

    const props = {};

    if (type.propTypes) {
      for (const property in type.propTypes) {
        if (!type.propTypes.hasOwnProperty(property)) {
          continue;
        }
        const typeInfo = type.propTypes[property];
        const propType = PropTypesMap.get(typeInfo) || 'other';
        const required = typeInfo.isRequired === undefined ? <span style={stylesheet.req}>✓</span> : <span style={stylesheet.notReq}>-</span>;
        props[property] = { property, propType, required };
      }
    }

    if (type.defaultProps) {
      for (const property in type.defaultProps) {
        if (!type.defaultProps.hasOwnProperty(property)) {
          continue;
        }
        const value = type.defaultProps[property];
        if (value === undefined) {
          continue;
        }
        if (!props[property]) {
          props[property] = { property };
        }
        props[property].defaultValue = value;
      }
    }

    const array = Object.values(props);
    if (!array.length) {
      return <small>No propTypes defined!</small>;
    }
    array.sort(function (a, b) {
      return a.property > b.property;
    });

    return (
      <table style={stylesheet.propTable}>
        <thead style={stylesheet.propTableThead.base}>
          <tr style={stylesheet.propTableThead.tr}>
            <th style={stylesheet.propTableThead.th}>Property</th>
            <th style={stylesheet.propTableThead.th}>Default</th>
            <th style={stylesheet.propTableThead.th}>PropType</th>
            <th style={stylesheet.propTableThead.th}>Required</th>
          </tr>
        </thead>
        <tbody style={stylesheet.propTableTbody.base}>
          {array.map(row => (
            <tr key={row.property} style={stylesheet.propTableTbody.tr}>
              <td style={stylesheet.propTableTbody.td}>{row.property}</td>
              <td style={stylesheet.propTableTbody.td}>{row.defaultValue === undefined ? <span style={stylesheet.notReq}>-</span> : <PropVal val={row.defaultValue} />}</td>
              <td style={stylesheet.propTableTbody.td}><span style={stylesheet.valueStyles[row.propType]}>{row.propType}</span></td>
              <td style={stylesheet.propTableTbody.td}>{row.required}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: React.PropTypes.func,
};
