export const OneServeLogo = ({ className = "", showText = true }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg className="h-10 w-10 text-black" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <rect height="36" rx="4" width="6" x="6" y="4" />
        <rect height="36" rx="4" width="6" x="18" y="4" />
        <rect height="36" rx="4" width="6" x="30" y="4" />
        <rect height="32" rx="5" width="16" x="12" y="36" />
        <path d="M56 4c6 6 9 16 9 28s-3 22-9 28h-6V4z" />
      </g>
    </svg>
    {showText ? <span className="text-2xl font-black tracking-tight text-black">OneServe</span> : null}
  </div>
);
