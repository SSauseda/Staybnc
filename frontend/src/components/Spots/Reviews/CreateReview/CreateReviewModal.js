import React from 'react'

function CreateReviewModal ({ open, children, onClose }) {
  if (!open) return null

  const handleOverlayClick = e => {
    if (e.target.classList.contains('create-modal-close')) {
      onClose()
    }
  }

  return (
    <div className='review-modal-overlay' onClick={handleOverlayClick}>
      <div className='review-modal'>
        <button className='review-modal-close' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default CreateReviewModal
