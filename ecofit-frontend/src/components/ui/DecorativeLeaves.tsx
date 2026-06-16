export function DecorativeLeaves() {
  return (
    <>
      <div className="absolute top-12 right-20 text-[#8FA86A] rotate-12 opacity-50">
        <LeafSvg />
      </div>
      <div className="absolute bottom-16 left-12 text-[#8FA86A] -rotate-12 opacity-40">
        <LeafSvg />
      </div>
      <div className="absolute bottom-24 right-16 text-[#8FA86A] rotate-45 opacity-30">
        <LeafSvg />
      </div>
    </>
  );
}

function LeafSvg() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" />
    </svg>
  );
}
