const breakPoints = {
  smallMobile: 350,
  Mobile: 400,
  iPad: 768,
  iPadPro: 1024,
  Desktop: 1200,
  largeDesktop: 1600
};

export const Devices = {
  smallMobile: `(min-width: ${
    breakPoints.smallMobile
  }px) and (max-width: ${breakPoints.Mobile - 1}px) `,
  Mobile: `(min-widthS: ${
    breakPoints.Mobile
  }px) and (max-width: ${breakPoints.iPad - 1}px) `,
  iPad: `(min-width: ${
    breakPoints.iPad
  }px) and (max-width: ${breakPoints.iPadPro - 1}px) `,
  iPadPro: `(min-width: ${
    breakPoints.iPadPro
  }px) and (max-width: ${breakPoints.Desktop - 1}px) `,
  Desktop: `(min-width: ${
    breakPoints.Desktop
  }px) and (max-width: ${breakPoints.largeDesktop - 1}px) `,
  largeDesktop: `(min-width: ${breakPoints.largeDesktop}px) `
};
