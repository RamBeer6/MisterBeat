import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export function SvgLoader() {
    const [loading, setLoading] = useState(false);
    const color = "#1DB954";
    const size = 200;
    const radius = 10;
    const margin = 4;
    const width = 6;

    useEffect(() => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 10000);
    }, []);

    return (
        <section className="svg-loader">
            <div>
                <ScaleLoader color={color} loading={loading} width={width} size={size} radius={radius} margin={margin} />
            </div>
        </section>
    );
}
{
    //Example 1
    /* <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    enable-background="new 0 0 100 100"
                    xml:space="preserve"
                >
                    <rect
                        fill="#fff"
                        width="3"
                        height="100"
                        transform="translate(0) rotate(180 3 50)"
                    >
                        <animate
                            attributeName="height"
                            attributeType="XML"
                            dur="1s"
                            values="30; 100; 30"
                            repeatCount="indefinite"
                        />
                    </rect>
                    <rect
                        x="17"
                        fill="#fff"
                        width="3"
                        height="100"
                        transform="translate(0) rotate(180 20 50)"
                    >
                        <animate
                            attributeName="height"
                            attributeType="XML"
                            dur="1s"
                            values="30; 100; 30"
                            repeatCount="indefinite"
                            begin="0.1s"
                        />
                    </rect>
                    <rect
                        x="40"
                        fill="#fff"
                        width="3"
                        height="100"
                        transform="translate(0) rotate(180 40 50)"
                    >
                        <animate
                            attributeName="height"
                            attributeType="XML"
                            dur="1s"
                            values="30; 100; 30"
                            repeatCount="indefinite"
                            begin="0.3s"
                        />
                    </rect>
                    <rect
                        x="60"
                        fill="#fff"
                        width="3"
                        height="100"
                        transform="translate(0) rotate(180 58 50)"
                    >
                        <animate
                            attributeName="height"
                            attributeType="XML"
                            dur="1s"
                            values="30; 100; 30"
                            repeatCount="indefinite"
                            begin="0.5s"
                        />
                    </rect>
                    <rect
                        x="80"
                        fill="#fff"
                        width="3"
                        height="100"
                        transform="translate(0) rotate(180 76 50)"
                    >
                        <animate
                            attributeName="height"
                            attributeType="XML"
                            dur="1s"
                            values="30; 100; 30"
                            repeatCount="indefinite"
                            begin="0.1s"
                        />
                    </rect>
                </svg> */
}
            //Example 2
//     <svg
//         width="38"
//         height="38"
//         viewBox="0 0 38 38"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//         <defs>
//             <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
//                 <stop stop-color="#fff" stop-opacity="0" offset="0%" />
//                 <stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
//                 <stop stop-color="#fff" offset="100%" />
//             </linearGradient>
//         </defs>
//         <g fill="none" fill-rule="evenodd">
//             <g transform="translate(1 1)">
//                 <path
//                     d="M36 18c0-9.94-8.06-18-18-18"
//                     id="Oval-2"
//                     stroke="url(#a)"
//                     stroke-width="2"
//                 >
//                     <animateTransform
//                         attributeName="transform"
//                         type="rotate"
//                         from="0 18 18"
//                         to="360 18 18"
//                         dur="0.9s"
//                         repeatCount="indefinite"
//                     />
//                 </path>
//                 <circle fill="#fff" cx="36" cy="18" r="1">
//                     <animateTransform
//                         attributeName="transform"
//                         type="rotate"
//                         from="0 18 18"
//                         to="360 18 18"
//                         dur="0.9s"
//                         repeatCount="indefinite"
//                     />
//                 </circle>
//             </g>
//         </g>
//     </svg>
// </section>
