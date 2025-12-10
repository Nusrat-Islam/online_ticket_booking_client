import React from "react";

const PurchaseModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default PurchaseModal;

