const breakPoints = {
    smallMobile: 350,
    Mobile: 400,
    iPad: 768,
    iPadPro: 1024,
    Desktop: 1200,
    largeDesktop: 1600
}

 export const Devices = {
    small: `(min-width: ${breakPoints.smallMobile}px) and (max-width: ${breakPoints.Mobile - 1}px) `,
    mobile: `(min-width: ${breakPoints.Mobile}px) and (max-width: ${breakPoints.iPad - 1}px) `,
    ipad: `(min-width: ${breakPoints.iPad}px) and (max-width: ${breakPoints.iPadPro - 1}px) `,
    pro: `(min-width: ${breakPoints.iPadPro}px) and (max-width: ${breakPoints.Desktop - 1}px) `,
    desktop: `(min-width: ${breakPoints.Desktop}px) and (max-width: ${breakPoints.largeDesktop - 1}px) `,
    large: `(min-width: ${breakPoints.largeDesktop}px) `,
}