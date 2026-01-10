function ActionCard({ icon, title, description, bgColor, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-6 cursor-pointer
        transition hover:scale-[1.03]
        ${bgColor}
      `}
    >
      <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/80 mt-1">{description}</p>
    </div>
  );
}

export default ActionCard;
