import { X } from "lucide-react";
import { useState } from "react";
import CalloraLoader from "../ui/CalloraLoader";

function MeetingModal({
  isOpen,
  onClose,
  title,
  buttonText = "Confirm",
  handleClick,
  className = "",
  children,
  icon: Icon,
  iconColor = "text-blue-500",
  image,
  showClose = true,
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const onButtonClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await handleClick?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`
          relative z-10 w-[90%] max-w-md
          rounded-xl bg-[#111827]
          border border-white/10
          p-6 shadow-xl
          text-white
          ${className}
        `}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        )}

        {(image || Icon) && (
          <div className="flex justify-center mb-4">
            {image ? (
              <div className="h-14 w-14 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                <img
                  src={image}
                  alt="modal visual"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Icon className="w-7 h-7" />
              </div>
            )}
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
          {title}
        </h2>

        {children && (
          <div className="text-sm text-gray-300 text-center mb-6">
            {children}
          </div>
        )}

        <button
          onClick={onButtonClick}
          disabled={isLoading}
          className="
            w-full bg-blue-600 hover:bg-blue-700
            text-white font-medium py-2 md:py-3 rounded-lg
            transition cursor-pointer
          "
        >
          {isLoading ? (
            <CalloraLoader size="4" fullScreen={false} label="" />
          ) : (
            buttonText
          )}
        </button>
      </div>
    </div>
  );
}

export default MeetingModal;
