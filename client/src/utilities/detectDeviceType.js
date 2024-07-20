export const DEVICE_TYPE = Object.freeze({
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    MOBILE: 'mobile'
});

const detectDeviceType = () => {
    const ua = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    const isTouch = 'ontouchend' in document;

    const deviceChecks = [
        {
            check: () => /android.*mobile/.test(ua),
            type: DEVICE_TYPE.MOBILE
        },
        {
            check: () => /android/.test(ua) || /ipad/.test(ua) || (/mac/.test(ua) && isTouch),
            type: DEVICE_TYPE.TABLET
        },
        {
            check: () => /iphone|ipod/.test(ua),
            type: DEVICE_TYPE.MOBILE
        },
        {
            check: () => /win|mac|linux|cros/.test(platform),
            type: DEVICE_TYPE.DESKTOP
        },
        {
            check: () => /tablet/.test(ua),
            type: DEVICE_TYPE.TABLET
        },
        {
            check: () => /mobile/.test(ua),
            type: DEVICE_TYPE.MOBILE
        }
    ];

    return deviceChecks.find(device => device.check())?.type || DEVICE_TYPE.DESKTOP;
};

export default detectDeviceType;