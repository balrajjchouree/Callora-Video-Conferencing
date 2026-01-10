import CallList from "../components/CallList";

function UpComingPage() {
  return (
    <section className="w-full max-w-7xl text-white space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center xl:text-start">
        <h1 className="text-4xl font-bold tracking-tight">Upcoming Meetings</h1>
        <p className="text-gray-400 text-sm md:text-base">
          View and manage all your scheduled meetings in one place.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      <CallList type="upcoming" />
    </section>
  );
}

export default UpComingPage;
