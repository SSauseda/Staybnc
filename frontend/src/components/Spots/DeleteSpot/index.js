import React, { useState } from 'react';

export default function DeleteSpotModal ({ isOpen, onCancel, onDelete, onClose }) {
    if (!isOpen) {
        return null
    }

    const handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }
    return (
        <div className='delete-modal-overlay' onClick={handleOverlayClick}>
      <div className='delete-modal'>
        <p className='delete-review-title'>Are you sure you want to remove this spot from the listings?</p>
        <div className='delete-modal-btns'>
          <button className='yes-btn' onClick={onDelete}>Yes (Delete Spot)</button>
          <button className='no-btn' onClick={onCancel}>No (Keep Spot)</button>
        </div>
      </div>
    </div>
    )
}
