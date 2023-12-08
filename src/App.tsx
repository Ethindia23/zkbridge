import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Home from "./Home"
// import About from "./About"
// import Contact from "./Contact"
// import Layout from "./components/Layout";
import { Landing } from "./components/landing";
import Navbar from "./components/navbar/Navbar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Dashboard } from "./components/dashboard";
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {sepolia,polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import {ParticleAnimation} from 'react-particle-animation'

function App() {
  const { chains, publicClient } = configureChains(
    [sepolia,polygonMumbai],
    [alchemyProvider({ apiKey: 'c63e42ee270545b423495ea9f1a230e6' }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  const particlesInit = async (main: any) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
 

 
 
 
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}  theme={darkTheme({
        accentColor: 'rgb(20 184 166)',
      
      })}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={{
                fullScreen: {
                  enable: true,
                  zIndex: 1,
                },
                particles: {
                  number: {
                    value: 20,
                    density: {
                      enable: false,
                      value_area: 400,
                    },
                  },
                  color: {
                    value: "random",
                  },
                  // "shape": {
                  //     "type": "star",
                  //     "options": {
                  //         "sides": 5
                  //     }
                  // },
                  opacity: {
                    value: 0.8,
                    random: false,
                    anim: {
                      enable: false,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 5,
                    random: false,
                    anim: {
                      enable: false,
                      speed: 40,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  rotate: {
                    value: 0,
                    random: true,
                    direction: "clockwise",
                    animation: {
                      enable: true,
                      speed: 5,
                      sync: false,
                    },
                  },
                  line_linked: {
                    enable: true,
                    distance: 600,
                    color: "random",
                    opacity: 0.4,
                    width: 2,
                  },
                  // "number": {
                  //               "density": {
                  //                   "enable": true,
                  //                   "area": 600
                  //               },
                  //               "limit": 500,
                  //               "value": 150
                  //           },
                  move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: true,
                      mode: ["grab"],
                    },
                    onclick: {
                      enable: false,
                      mode: "bubble",
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 40,
                      duration: 2,
                      opacity: 8,
                      speed: 3,
                    },
                    repulse: {
                      distance: 200,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
                retina_detect: true,
                background: {
                  color: "#111",
                  image: "",
                  position: "50% 50%",
                  repeat: "no-repeat",
                  size: "cover",
                },
              }}
            />
            {/* <Particles
      id="tsparticles"
      init={particlesInit}
options={options}
    //   options={{
    //     "fullScreen": {
    //         "enable": true,
    //         "zIndex": 0
    //     },
    //     "detectRetina": true,
    //     "fpsLimit": 120,
    //     "interactivity": {
    //         "events": {
    //             "onClick": {
    //                 "enable": true,
    //                 "mode": "push"
    //             },
    //             "onDiv": {
    //                 "elementId": "repulse-div",
    //                 "enable": false,
    //                 "mode": "repulse"
    //             },
    //             "onHover": {
    //                 "enable": true,
    //                 "mode": "connect",
    //                 "parallax": {
    //                     "enable": false,
    //                     "force": 60,
    //                     "smooth": 10
    //                 }
    //             },
    //             "resize": true
    //         },
    //         "modes": {
    //             "bubble": {
    //                 "distance": 400,
    //                 "duration": 2,
    //                 "opacity": 0.8,
    //                 "size": 40,
    //                 "speed": 1
    //             },
    //             "connect": {
    //                 "distance": 80,
    //                 "lineLinked": {
    //                     "opacity": 0.5
    //                 },
    //                 "radius": 100
    //             },
    //             "grab": {
    //                 "distance": 400,
    //                 "lineLinked": {
    //                     "opacity": 1
    //                 }
    //             },
    //             "push": {
    //                 "quantity": 4
    //             },
    //             "remove": {
    //                 "quantity": 2
    //             },
    //             "repulse": {
    //                 "distance": 200,
    //                 "duration": 0.4
    //             }
    //         }
    //     },
    //     "particles": {
    //         "color": {
    //             "value": "#a0a0a0"
    //         },
    //         "lineLinked": {
    //             "blink": false,
    //             "color": "#ffffff",
    //             "consent": false,
    //             "distance": 150,
    //             "enable": false,
    //             "opacity": 0.4,
    //             "width": 1
    //         },
    //         "move": {
    //             "attract": {
    //                 "enable": false,
    //                 "rotate": {
    //                     "x": 600,
    //                     "y": 1200
    //                 }
    //             },
    //             "bounce": false,
    //             "direction": "none",
    //             "enable": true,
    //             "outMode": "out",
    //             "random": false,
    //             "speed": 0.5,
    //             "straight": false
    //         },
    //         "number": {
    //             "density": {
    //                 "enable": true,
    //                 "area": 600
    //             },
    //             "limit": 500,
    //             "value": 150
    //         },
    //         "opacity": {
    //             "animation": {
    //                 "enable": false,
    //                 "minimumValue": 0.1,
    //                 "speed": 1,
    //                 "sync": false
    //             },
    //             "random": false,
    //             "value": 0.5
    //         },
    //         "shape": {
    //             "type": "square",
          
    //         },
    //         "size": {
    //             "animation": {
    //                 "enable": false,
    //                 "minimumValue": 0.1,
    //                 "speed": 40,
    //                 "sync": false
    //             },
    //             "random": true,
    //             "value": 6
    //         }
    //     },
    //     "polygon": {
    //         "draw": {
    //             "enable": false,
    //             "lineColor": "#ffffff",
    //             "lineWidth": 0.5
    //         },
    //         "move": {
    //             "radius": 10
    //         },
    //         "scale": 1,
    //         "type": "none",
    //         "url": ""
    //     },
    //     "background": {
    //         "color": "#000000",
    //         "image": "",
    //         "position": "50% 50%",
    //         "repeat": "no-repeat",
    //         "size": "cover"
    //     }
    // }}
    /> */}
            {/* <ParticleAnimation /> */}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
