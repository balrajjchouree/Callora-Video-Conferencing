import CallList from "../components/CallList";

function PreviousPage() {
  return (
    <section className="w-full max-w-7xl text-white space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center xl:text-start">
        <h1 className="text-4xl font-bold tracking-tight">Past Meetings</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Review your completed meetings and access details anytime.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      <CallList type="ended" />
    </section>
  );
}

export default PreviousPage;
