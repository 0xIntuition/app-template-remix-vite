import clsx from 'clsx'

export default function Avatar({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <g clipPath="url(#clip0_114_4411)">
        <rect width={32} height={32} rx={16} fill="#7F9CA8" />
        <rect
          width={32}
          height={32}
          rx={16}
          fill="url(#paint0_radial_114_4411)"
          fillOpacity="0.48"
        />
        <rect
          width={32}
          height={32}
          rx={16}
          fill="url(#paint1_radial_114_4411)"
          fillOpacity="0.64"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 20C19.3137 20 22 17.3137 22 14C22 10.6863 19.3137 8 16 8C12.6863 8 10 10.6863 10 14C10 17.3137 12.6863 20 16 20ZM16 46C22.6274 46 28 40.6274 28 34C28 27.3726 22.6274 22 16 22C9.37258 22 4 27.3726 4 34C4 40.6274 9.37258 46 16 46Z"
          fill="white"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_114_4411"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45) scale(22.6274 30.7174)"
        >
          <stop stopColor="#00D1FF" />
          <stop offset={1} stopColor="#00D1FF" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="paint1_radial_114_4411"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(32 32) rotate(-135) scale(22.6274 26.6156)"
        >
          <stop stopColor="#FB6166" />
          <stop offset={1} stopColor="#FB6166" stopOpacity={0} />
        </radialGradient>
        <clipPath id="clip0_114_4411">
          <rect width={32} height={32} rx={16} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
