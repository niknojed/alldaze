import Script from 'next/script';

// Google Tag Manager container ID
export const GTM_ID = 'GTM-52SJQJGM';
// Google Ads conversion tag ID
export const GOOGLE_ADS_ID = 'AW-18351416027';

/** Google Ads gtag + Google Tag Manager. Render inside <head>. */
export function AnalyticsHead() {
  return (
    <>
      <Script
        id="google-tag-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-gtag-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  );
}

/** GTM noscript fallback. Render first inside <body>. */
export function AnalyticsBody() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
