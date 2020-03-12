import React from 'react'

class Modal extends React.Component {
  //this isn't a real modal
  // here's a good article on using react to create modals:
  //https://medium.com/@pppped/build-a-simple-modal-window-with-react-and-jss-f05041d899cc
  //It's an older article, but it checks out.
  render() {
    if(this.props.modalDisplayed) {
      return(
        <div id="modal">
          A bunch of stuff
        </div>
        )
      } else {
        return <div />
      }
  }
}

export default Modal