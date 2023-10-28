import { cn } from '@/lib/utils/misc'
import React from 'react'

const IntuitionLogotype = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    viewBox="0 0 311 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-6 md:h-10', className)}
    {...props}
  >
    <path
      d="M61.1122 67.5748C61.1345 67.6026 61.1751 67.6071 61.2029 67.5847C65.6813 63.9827 69.2726 59.3999 71.6993 54.1898C74.1352 48.9602 75.332 43.2397 75.1967 37.4732C75.0614 31.7067 73.5977 26.0496 70.9194 20.942C68.2511 15.8535 64.4489 11.447 59.8066 8.06255C59.7778 8.04154 59.7374 8.04792 59.7164 8.07677L58.4695 9.79287C58.4485 9.82172 58.455 9.86211 58.4838 9.88312C62.8461 13.0642 66.419 17.2055 68.9266 21.9875C71.4443 26.7887 72.8202 32.1063 72.9473 37.5268C73.0745 42.9474 71.9495 48.3247 69.6598 53.2405C67.3792 58.1368 64.0044 62.4438 59.7962 65.8293C59.7684 65.8516 59.7639 65.8923 59.7862 65.9201L61.1122 67.5748Z"
      fill="white"
    />
    <path
      d="M56.7478 6.12855C56.7659 6.09784 56.7557 6.05823 56.725 6.04015C52.1016 3.32148 46.9482 1.62646 41.6126 1.06983C36.2555 0.510961 30.8404 1.11276 25.7359 2.83427C20.6313 4.55578 15.9571 7.3566 12.0313 11.0461C8.12117 14.7209 5.04487 19.1914 3.00996 24.1556C2.99643 24.1886 3.01229 24.2263 3.04532 24.2398L5.00897 25.0401C5.04207 25.0536 5.07967 25.0377 5.09327 25.0047C7.00607 20.3398 9.89727 16.1388 13.5718 12.6854C17.2621 9.21725 21.6559 6.58448 26.4541 4.96626C31.2524 3.34804 36.3426 2.78235 41.3782 3.30768C46.3925 3.83078 51.2355 5.42342 55.5806 7.97783C55.6113 7.9959 55.6509 7.98573 55.669 7.95503L56.7478 6.12855Z"
      fill="white"
    />
    <path
      d="M1.52568 28.7733C1.49121 28.7641 1.45585 28.7847 1.44676 28.8191C0.600655 32.0278 0.184095 35.3345 0.208005 38.6524C0.208265 38.6881 0.237455 38.7167 0.273125 38.7164L2.39388 38.6966C2.42954 38.6963 2.45816 38.6671 2.45791 38.6315C2.43579 35.5152 2.82703 32.4096 3.62138 29.3958C3.63047 29.3613 3.60995 29.326 3.57547 29.3168L1.52568 28.7733Z"
      fill="white"
    />
    <path
      d="M0.604254 43.3616C0.568924 43.3664 0.544134 43.3989 0.548934 43.4342C1.23082 48.4492 2.92098 53.2742 5.51783 57.6182C8.12563 61.9806 11.5935 65.767 15.7105 68.7472C19.8275 71.7274 24.5078 73.8391 29.467 74.9542C34.4052 76.0645 39.5172 76.1634 44.4951 75.2453C44.5301 75.2388 44.5533 75.2051 44.5468 75.1701L44.1593 73.085C44.1528 73.05 44.119 73.0268 44.0839 73.0333C39.406 73.8956 34.602 73.8024 29.9614 72.759C25.2998 71.7108 20.9003 69.7258 17.0303 66.9244C13.1603 64.123 9.90053 60.5639 7.44913 56.4631C5.00883 52.3809 3.42027 47.8468 2.77895 43.1341C2.77413 43.0987 2.74162 43.0739 2.70626 43.0787L0.604254 43.3616Z"
      fill="white"
    />
    <path
      d="M48.2606 74.2803C48.2706 74.3145 48.3066 74.3341 48.3408 74.324C51.6142 73.3547 54.7402 71.9431 57.632 70.1282C57.6622 70.1092 57.6713 70.0694 57.6523 70.0392L56.5223 68.2449C56.5033 68.2147 56.4634 68.2057 56.4332 68.2246C53.7169 69.9289 50.7809 71.2548 47.7064 72.1655C47.6722 72.1756 47.6526 72.2115 47.6627 72.2457L48.2606 74.2803Z"
      fill="white"
    />
    <path
      d="M64.64 57.0318C54.3254 71.9002 33.9065 75.5945 19.0333 65.2833C4.16002 54.9721 0.464422 34.56 10.779 19.6916C21.0936 4.8232 41.5124 1.12887 56.3857 11.4401C71.259 21.7513 74.9546 42.1634 64.64 57.0318ZM15.6567 23.0732C7.21032 35.2486 10.2365 51.9636 22.4159 60.4072C34.5953 68.8509 51.3159 65.8256 59.7623 53.6502C68.2087 41.4748 65.1825 24.7598 53.0031 16.3162C40.8237 7.87253 24.1031 10.8977 15.6567 23.0732Z"
      fill="white"
    />
    <g filter="url(#filter0_b_6251_3648)">
      <path
        d="M94 26.6168H97.9013V52.3832H94V26.6168Z"
        fill="url(#paint0_linear_6251_3648)"
      />
      <path
        d="M109.105 26.6168H114.013L123.352 42.1965C125.082 45.2396 126.029 46.8903 126.194 47.1488C126.147 44.705 126.123 42.8427 126.123 41.562V26.6168H129.989V52.3832H125.011L115.902 37.297C115.196 36.0163 114.195 34.2598 112.901 32.0274C112.901 32.6384 112.913 33.6077 112.936 34.9354C112.96 36.2513 112.971 37.2441 112.971 37.9138V52.3832H109.105V26.6168Z"
        fill="url(#paint1_linear_6251_3648)"
      />
      <path
        d="M139.022 29.8949V26.6168H158.511V29.8949H150.691V52.3832H146.789V29.8949H139.022Z"
        fill="url(#paint2_linear_6251_3648)"
      />
      <path
        d="M187.227 42.8486C187.227 44.2937 187.027 45.6214 186.627 46.8316C186.238 48.0418 185.656 49.111 184.879 50.0392C184.102 50.9674 183.073 51.6958 181.79 52.2245C180.507 52.7415 179.03 53 177.359 53C175.676 53 174.187 52.7415 172.893 52.2245C171.61 51.7076 170.574 50.985 169.786 50.0568C168.997 49.1286 168.403 48.0594 168.003 46.8492C167.602 45.639 167.402 44.3055 167.402 42.8486V26.6168H171.321V42.8486C171.321 43.812 171.439 44.6991 171.674 45.5098C171.922 46.3205 172.281 47.0431 172.751 47.6775C173.234 48.3003 173.863 48.7879 174.64 49.1403C175.429 49.4928 176.335 49.6691 177.359 49.6691C179.336 49.6691 180.825 49.0346 181.825 47.7657C182.825 46.4967 183.326 44.8577 183.326 42.8486V26.6168H187.227V42.8486Z"
        fill="url(#paint3_linear_6251_3648)"
      />
      <path
        d="M198.307 26.6168H202.209V52.3832H198.307V26.6168Z"
        fill="url(#paint4_linear_6251_3648)"
      />
      <path
        d="M211.241 29.8949V26.6168H230.731V29.8949H222.91V52.3832H219.009V29.8949H211.241Z"
        fill="url(#paint5_linear_6251_3648)"
      />
      <path
        d="M239.781 26.6168H243.682V52.3832H239.781V26.6168Z"
        fill="url(#paint6_linear_6251_3648)"
      />
      <path
        d="M266.89 26C268.538 26 270.08 26.235 271.516 26.705C272.951 27.1749 274.199 27.827 275.258 28.6612C276.329 29.4954 277.247 30.4765 278.012 31.6044C278.777 32.7324 279.354 33.9661 279.742 35.3055C280.13 36.6449 280.325 38.0431 280.325 39.5C280.325 40.9569 280.13 42.3551 279.742 43.6945C279.354 45.0339 278.777 46.2676 278.012 47.3956C277.247 48.5235 276.329 49.5046 275.258 50.3388C274.199 51.173 272.951 51.8251 271.516 52.295C270.08 52.765 268.538 53 266.89 53C264.843 53 262.966 52.6416 261.259 51.9249C259.553 51.1965 258.135 50.2154 257.005 48.9817C255.887 47.7363 255.016 46.3029 254.392 44.6815C253.78 43.0483 253.474 41.3211 253.474 39.5C253.474 37.6789 253.78 35.9576 254.392 34.3362C255.016 32.703 255.887 31.2696 257.005 30.0359C258.135 28.7905 259.553 27.8094 261.259 27.0927C262.966 26.3642 264.843 26 266.89 26ZM258.011 35.658C257.587 36.8799 257.375 38.1606 257.375 39.5C257.375 40.8394 257.587 42.1201 258.011 43.342C258.435 44.5522 259.041 45.6332 259.829 46.5849C260.618 47.5366 261.618 48.2944 262.83 48.8584C264.054 49.4223 265.408 49.7043 266.89 49.7043C268.373 49.7043 269.727 49.4223 270.951 48.8584C272.175 48.2944 273.175 47.5366 273.952 46.5849C274.74 45.6332 275.346 44.5522 275.77 43.342C276.205 42.1201 276.423 40.8394 276.423 39.5C276.423 38.4308 276.288 37.3969 276.017 36.3982C275.758 35.3995 275.358 34.4713 274.817 33.6136C274.287 32.7441 273.646 31.9922 272.893 31.3577C272.139 30.7115 271.245 30.2063 270.209 29.842C269.185 29.4661 268.079 29.2781 266.89 29.2781C265.408 29.2781 264.054 29.5601 262.83 30.124C261.618 30.688 260.618 31.4458 259.829 32.3975C259.041 33.3492 258.435 34.436 258.011 35.658Z"
        fill="url(#paint7_linear_6251_3648)"
      />
      <path
        d="M290.116 26.6168H295.024L304.362 42.1965C306.092 45.2396 307.04 46.8903 307.205 47.1488C307.158 44.705 307.134 42.8427 307.134 41.562V26.6168H311V52.3832H306.022L296.913 37.297C296.207 36.0163 295.206 34.2598 293.912 32.0274C293.912 32.6384 293.924 33.6077 293.947 34.9354C293.971 36.2513 293.982 37.2441 293.982 37.9138V52.3832H290.116V26.6168Z"
        fill="url(#paint8_linear_6251_3648)"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_6251_3648"
        x="68.4"
        y="0.400002"
        width="268.2"
        height="78.2"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.8" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6251_3648"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6251_3648"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_6251_3648"
        x1="94"
        y1="26"
        x2="310.887"
        y2="53.0879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.44" />
        <stop offset="0.4" stopColor="white" />
        <stop offset="0.5625" stopColor="white" stopOpacity="0.54" />
        <stop offset="0.729167" stopColor="white" />
        <stop offset="0.78125" stopColor="white" stopOpacity="0.65" />
      </linearGradient>
    </defs>
  </svg>
))

export default IntuitionLogotype
