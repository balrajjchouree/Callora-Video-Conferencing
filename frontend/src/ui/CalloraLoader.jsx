function CalloraLoader({
  fullScreen = true,
  label = "Connecting…",
  size = "16",
}) {
  const Wrapper = fullScreen ? "div" : "span";

  return (
    <Wrapper
      className={
        fullScreen
          ? "fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md"
          : "inline-flex items-center gap-3"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`relative h-${size} w-${size}`}>
          <div className="absolute inset-0 rounded-full border-2 border-orange-400/40 animate-ping" />

          <div className="absolute inset-0 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />

          <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20" />
        </div>

        {label && (
          <p className="text-sm text-gray-300 tracking-wide">{label}</p>
        )}
      </div>
    </Wrapper>
  );
}

export default CalloraLoader;
