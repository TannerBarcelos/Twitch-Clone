import React from 'react';
import ReactDOM from 'react-dom'; // this is from react-dom not react-router-dom! [see docs on portals]

//remember this modal is only shown when the route to streams/delete is seen

// props: the message header, content and buttons
const Modal = props => {
  // create reactdom.createportals for modals and to get around issues with modals [we attach this right to the body element in the html!]
  return ReactDOM.createPortal (
    //all these classnames are SEMANTIC UI MODAL CLASSES ALONG WITH THE 'HTML' STRUCUTRE : THIS WHOLE APP USES SEMANTIC UI
    <div
      className="ui dimmer modals visible active"
      onClick={props.onDismiss}
      //caution! this is event callback delegated.. it will be passed down to all children of this, then bubble up the event call back up to this event, so, we would get bac behavior
    >
      <div
        className="ui standard modal visible active"
        onClick={e => e.stopPropagation ()} // got rid of propagation with the event object. perfect. the modal WILL NOT go away unless we click anywhere outside it
      >
        <div className="header">
          {props.title}
        </div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    //do not forget this comma to add seconda param to the portal such that we need this to attach the modal to the body [see video 275]
    // we need to grab the modal div we add for portal an dhook into it
    document.querySelector ('#modal')
  );
};
export default Modal; // we need to add this modal itself as a renderable component in stream delete [which is the reason we have a modal in this app... to confirm deletion]
