import React from 'react';
import Popup from 'reactjs-popup';
import '../Style/Popup.css';
import '../Style/Main.css';


const PostButton = () => (
  <Popup
    trigger={<button className='postButton'><div className='buttontext'>Post</div></button>}
    modal
    nested
  >
    {close => (
      <div className='bigBox' onClick={close}>{/*shadow background*/}
        <div className='boxinthemiddel' onClick={event=>event.stopPropagation()} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <button onClick={close}>Close</button>
        </div>
      </div>
    )}
  </Popup>


);

export default PostButton;
