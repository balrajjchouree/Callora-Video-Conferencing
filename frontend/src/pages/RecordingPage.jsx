import CallList from "../components/CallList";

function RecordingPage() {
  return (
    <section className="w-full max-w-7xl text-white space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center xl:text-start">
        <h1 className="text-4xl font-bold tracking-tight">
          Meeting Recordings
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Watch, manage, and revisit your recorded meetings anytime.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      <CallList type="recordings" />
    </section>
  );
}

export default RecordingPage;
