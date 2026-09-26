import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Promptedsite Agency',
  description: 'Promptedsite Agency offers AI-powered solutions to automate and optimize your marketing strategies, driving growth and efficiency for businesses of all sizes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/website-base.css" precedence="default" />
        <link rel="stylesheet" href="/styles.css" precedence="default" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com" rel="preconnect"/>
        <link href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=sans-serif:100,200,300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{ __html: `
          *{box-sizing:border-box;scrollbar-width:none}::-webkit-scrollbar{display:none}.pw-scene-style>canvas,.pwb-scene>canvas{display:block;width:100%;height:100%;user-select:none}a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border-width:0;border-style:none;border-color:currentcolor;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;font-variant-ligatures:inherit;font-variant-caps:inherit;font-variant-numeric:inherit;font-variant-east-asian:inherit;font-variant-alternates:inherit;font-variant-position:inherit;font-variant-emoji:inherit;font-weight:inherit;font-stretch:inherit;font-size:inherit;font-family:inherit;font-optical-sizing:inherit;font-size-adjust:inherit;font-kerning:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-language-override:inherit;vertical-align:baseline}a,abbr,acronym,address,applet,article,aside,audio,big,blockquote,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{font-style:inherit;line-height:inherit}b,body,em,i,strong{line-height:1}b,em,i,strong{line-height:inherit;font-style:italic}b,body,strong{font-style:inherit}b,strong{font-weight:bolder}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}ol,ul{list-style-position:initial;list-style-image:initial;list-style-type:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:none}table{border-collapse:collapse;-webkit-border-horizontal-spacing:0;-webkit-border-vertical-spacing:0}:root{--pw-user-color-style-6ce387c8-34d4-4438-91b3-ef15f7563451:#f8f1f1;--pw-user-color-style-18aa8819-e702-4f28-b8e6-ca428ebfcae1:#ffffff0f;--pw-user-color-style-530acd54-7ab7-4802-a2e6-537fc4327e1f:#ffffff;--pw-user-color-style-0369eed5-f163-4453-8bd0-a79a5b9221fe:#0000004d;--pw-user-color-style-5d5bbd6c-3d15-4617-9080-925229b574d0:#ffffff66;--pw-user-color-style-31856edf-d870-43ac-a0a5-dc0365dd60ac:#ebe9e5;--pw-user-color-style-46ffe95e-f531-4cae-9231-f44505279910:#000000;--pw-user-color-style-cd560c70-5097-46bd-a08c-307edce4bb4e:#0000001a;--pw-user-color-style-842da9d8-cb04-49f6-8552-411d814e9a65:#000000;--pw-user-color-style-5a50d038-4e8c-4199-971a-20e5da394938:#ffffff;--pw-user-color-style-a2d34486-9ce4-4655-b4d4-30b22f4b5e05:#ffffffb3;--pw-user-color-style-58a27c95-4b10-481b-b47d-975b9f47ec10:#000000;--pw-user-color-style-c5f0860a-42a5-4066-b0fc-8b742e0a8fe7:#ffffff;--pw-user-color-style-ab46486e-d3d5-467b-b13f-af34b513c6d3:#1a1a1a;--pw-user-color-style-0fa32ba8-dd03-4bce-909c-a4fe5287b588:#d9d9d9;--pw-user-color-style-6d0a807c-a691-4251-9a6c-9a4350ed59c1:#ffffff;--pw-user-color-style-7ec2d05b-f86e-4bad-8d3e-4e6e9869bbf5:#ffffff80;--pw-user-color-style-fc61959b-4221-42ed-bf99-4851044c8563:#e0b2ff;--pw-user-color-style-a38946c7-57f1-49e9-bbc9-7b70eda7278e:#a150ff;--pw-user-color-style-a7cde41e-0f7f-4095-a882-a21affbb5c85:#d178ff;--pw-user-color-style-c7660bd1-fc29-453a-9b4b-efed684e5ce6:#8800ff;--pw-user-color-style-5a32ccd6-d93e-4186-b25d-38c5b172d933:#772bcc}#pwb-loading-wrap{background-color:#f8f5ff}#im3p5,#iw9p8{display:flex;align-items:center;justify-content:center}#im3p5{top:0;width:100%;height:100vh;position:fixed}#iw9p8{position:relative}#ijg95,#iwpyv7{position:absolute}#ijg95{color:#fff;display:none;font-size:18px;text-align:center;font-family:Inter;font-weight:700}#iwpyv7{width:100px}#igqob3{width:250px;position:static}#ieupsz{width:100%;bottom:0;display:flex;position:fixed;align-items:center;flex-direction:row;padding-bottom:40px;justify-content:center}@media (max-width:480px){#iwpyv7{width:80px}#igqob3{width:175px}}
        

  #ieupsz, #igqob3, a[href="https://peachweb.io"], img[src*="pw-badge"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  
  @keyframes simpleSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
  #iwpyv7 {
    animation: simpleSpin 1.5s linear infinite !important;
  }
  
  /* Let's also hide the outer circle stroke that is incomplete, making it purely a spinning orb */
  #i1g4c {
    display: none !important;
  }
  
  /* Hue rotate 3D canvas and abstract generated WebP images to Purple */
  canvas, img[src*="chatgpt-image"] { 
    filter: hue-rotate(240deg) !important; 
  }
  
  /* Fix vertically stacked avatars (overlapping row) */
  #izwg2d {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #izwg2d img:not(:first-child) {
    margin-left: -15px;
  }

  /* Force Loading Screen to overlay everything until JS hides it */
  #pwb-loading-wrap {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;
    background-color: #f8f5ff !important;
    display: block;
  }
` }} />
      </head>
      <body id="i6mb">
        {children}
        <Script src="/inline-scripts.js" strategy="beforeInteractive" />
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
