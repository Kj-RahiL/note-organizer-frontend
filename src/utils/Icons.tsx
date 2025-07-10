import React from "react";

type CustomIconProps = {
  className?: string;
  size?: number;
};

export const ProjectListIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 17.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M6.1816 12.8001L6.84992 13.5343L7.96981 12.2952"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10879 13.5342H13.8184"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10879 12.2952H13.8184"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.1816 15.2782L6.84992 16.0125L7.96981 14.7733"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1251 16.0129H9.10888"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10879 14.7733H13.8184"
        stroke="currentColor"
        strokeWidth="0.585937"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const JobListIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 17.5 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_635_2648)">
          <mask id="mask0_635_2648" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_635_2648)">
            <path d="M15.5703 13.4881C17.2573 15.1776 18.4469 17.0203 18.3495 18.1323" stroke="currentColor" strokeWidth="0.585937" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.65054 18.1323C1.55316 17.0203 2.74277 15.1776 4.42976 13.4881" stroke="currentColor" strokeWidth="0.585937" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.65039 6.77227C1.59961 7.35039 1.89648 8.12539 2.43008 8.97383" stroke="currentColor" strokeWidth="0.585937" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3496 6.77232C18.4352 7.74927 17.5285 9.28833 16.1641 10.7934" stroke="currentColor" strokeWidth="0.585937" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_635_2648">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
};

export const CancelIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 20 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_757_1966)">
          <path d="M8.75 19.1667H3.75C2.14167 19.1667 0.833333 17.8583 0.833333 16.25V3.75C0.833333 2.14167 2.14167 0.833333 3.75 0.833333H8.34583C8.62417 0.833333 8.89833 0.858333 9.16667 0.905833V5.41667C9.16667 6.565 10.1008 7.5 11.25 7.5H16.0942C16.2225 7.5 16.3442 7.44083 16.4233 7.33917C16.5025 7.2375 16.53 7.105 16.4983 6.98C16.2575 6.03833 15.7667 5.1775 15.08 4.49083L12.1767 1.58667C11.1525 0.563333 9.7925 0 8.34583 0H3.75C1.6825 0 0 1.6825 0 3.75V16.25C0 18.3175 1.6825 20 3.75 20H8.75C8.98 20 9.16667 19.8133 9.16667 19.5833C9.16667 19.3533 8.98 19.1667 8.75 19.1667Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_757_1966">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
};

export const SupportIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 20 }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}><g clipPath="url(#clip0_635_2700)"><path d="M1.57891 15.7614L0.602734 15.2915C0.413281 15.2005 0.292969 15.0091 0.292969 14.7989V11.9263" stroke="currentColor" strokeWidth="0.585938" strokeLinecap="round" strokeLinejoin="round" /></g></svg>;
};

export const BlogIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 20 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_635_2720)">
          <path d="M18.8281 0H3.28125V18.5547C3.28125 19.3516 3.92961 20 4.72656 20H17.7734C18.5704 20 19.2188 19.3516 19.2188 18.5547V0.390625C19.2188 0.174922 19.0439 0 18.8281 0Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_635_2720">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };


 export const PaymentIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 20 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_635_2739)">
          <path d="M19.0908 10.0839V7.27292C19.0908 6.31975 18.3514 5.54458 17.4173 5.46941L14.8068 0.909826" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_635_2739">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  export const MemberIcon: React.FC<CustomIconProps> = ({ className = "text-icon-color", size = 20 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_635_2692)">
          <path d="M10.2644 19.3332C10.191 19.2602 10.0918 19.2191 9.98828 19.2188C9.88551 19.2188 9.78473 19.2605 9.71211 19.3332C9.63945 19.4059 9.59766 19.5066 9.59766 19.6094C9.59766 19.7121 9.63941 19.8129 9.71211 19.8855C9.78552 19.9585 9.88475 19.9997 9.98828 20C10.091 20 10.1918 19.9582 10.2644 19.8855C10.3371 19.8129 10.3789 19.7121 10.3789 19.6094C10.3789 19.5066 10.3371 19.4059 10.2644 19.3332Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_635_2692">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };


