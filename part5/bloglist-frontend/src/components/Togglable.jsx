import React, { useState } from "react";
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}
  const toggleVisibility = ()=>setVisible(!visible)
  const handleFormSubmitSuccess = ()=> setVisible(false)
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { onFormSubmitSuccess: handleFormSubmitSuccess })}        
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
export default Togglable