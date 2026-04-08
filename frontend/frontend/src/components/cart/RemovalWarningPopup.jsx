import React from "react"

const RemovalWarningPopup = ({ itemName, onCancel, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-title">Remove item?</div>
        <div className="popup-msg">
          Are you sure you want to remove <strong>{itemName}</strong> from your cart?
        </div>
        <div className="popup-actions">
          <button className="popup-btn-cancel" onClick={onCancel}>Keep it</button>
          <button className="popup-btn-confirm" onClick={onConfirm}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default RemovalWarningPopup
