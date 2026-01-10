import { Link } from "react-router-dom";

function DeveloperIcon({
  to = "/about",
  image = "/developer.jpg",
  alt = "About Developer",
}) {
  return (
    <Link to={to} className="z-50 group" aria-label={alt}>
      <div
        className="
          relative h-12 w-12 sm:h-14 sm:w-14 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-xl
          flex items-center justify-center
          transition-all duration-300
          hover:scale-105
        "
      >
        <img
          src={image}
          alt={alt}
          className="
            h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover
            opacity-20
            transition-opacity duration-300
            group-hover:opacity-90
          "
        />

        <div
          className="
            absolute inset-0 rounded-full
            bg-orange-400/20
            blur-lg
            opacity-0
            group-hover:opacity-100
            transition
          "
        />
      </div>
    </Link>
  );
}

export default DeveloperIcon;
