import React from 'react';

const stylesheet = {
  panelWrapper: {
    width: '100%',
  },
  panel: {
    padding: '10px 15px',
    width: 'auto',
    position: 'relative',
  },
};

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: '' };
    this.onAddInfo = this.onAddInfo.bind(this);
  }

  onAddInfo(info) {
    this.setState({ info });
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the info and render it.
    channel.on('kadira/info/add_with_info', this.onAddInfo);

    // Clear the current info on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddInfo('');
    });
  }

  // This is some cleanup tasks when the Info panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    const { channel, api } = this.props;
    this.props.channel.removeListener('kadira/info/add_with_info', this.onAddInfo);
  }

  render() {
    return (
      <div style={stylesheet.panelWrapper}>
        <div style={stylesheet.panel}>
          <div dangerouslySetInnerHTML={{ __html: this.state.info }} />
        </div>
      </div>
    );
  }
}