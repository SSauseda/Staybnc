import React, { useState } from 'react'

function DeleteReviewModal ({ isOpen, onCancel, onDelete, onClose }) {
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
        <p className='delete-review-title'>
          Are you sure you want to delete this review?
        </p>
        <div className='delete-modal-btns'>
          <button className='yes-btn' onClick={onDelete}>
            Yes (Delete Review)
          </button>
          <button className='no-btn' onClick={onCancel}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteReviewModal
