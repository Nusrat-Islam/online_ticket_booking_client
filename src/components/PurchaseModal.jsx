import { X } from "lucide-react";

const PurchaseModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-scaleIn">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={22} />
        </button>

        {/* MODAL CONTENT */}
        {children}

      </div>
    </div>
  );
};

export default PurchaseModal;
