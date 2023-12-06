import './App.css'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import Porsche from './component/porsche'
import BenzComp from './component/benz'
import { Center } from '@react-three/drei'
import { ContentComponent } from '../src/component'
import BmwComp from './component/bmw'
import carLogo from './assets/3dcar-logo.jpg'
function App() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const canvasRefs = Array.from({ length: 3 }, () => useRef()) // Create an array of refs

  const [porscheTotalScroll, setPorscheTotalScroll] = useState(0)
  const [benzTotalScroll, setBenzTotalScroll] = useState(0)
  const [bmwTotalScroll, setBmwTotalScroll] = useState(0)
  const maxScroll = 65 // Adjust this value based on your requirements
  const negativeMaxScroll = -65 // Negative maxScroll for zooming in

  const handlePScroll = (event) => {
    // setPorscheTotalScroll(
    //   (prevTotalScroll) => prevTotalScroll + Math.abs(event.deltaY)
    // )
    const newTotalScroll = porscheTotalScroll + event.deltaY

    // Limit totalScroll within the specified range
    const limitedTotalScroll = Math.max(
      Math.min(newTotalScroll, maxScroll),
      negativeMaxScroll
    )

    // Set totalScroll to the limited value
    setPorscheTotalScroll(limitedTotalScroll)
  }

  const handleBzScroll = (event) => {
    // setBenzTotalScroll(
    //   (prevTotalScroll) => prevTotalScroll + Math.abs(event.deltaY)
    // )
    const newTotalScroll = benzTotalScroll + event.deltaY

    // Limit totalScroll within the specified range
    const limitedTotalScroll = Math.max(
      Math.min(newTotalScroll, maxScroll),
      negativeMaxScroll
    )

    // Set totalScroll to the limited value
    setBenzTotalScroll(limitedTotalScroll)
  }

  const handleBmwScroll = (event) => {
    // setBmwTotalScroll(
    //   (prevTotalScroll) => prevTotalScroll + Math.abs(event.deltaY)
    // )
    const newTotalScroll = bmwTotalScroll + event.deltaY

    // Limit totalScroll within the specified range
    const limitedTotalScroll = Math.max(
      Math.min(newTotalScroll, maxScroll),
      negativeMaxScroll
    )

    // Set totalScroll to the limited value
    setBmwTotalScroll(limitedTotalScroll)
  }

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <div
        className='logo'
        style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
      >
        <h1 style={{ fontFamily: 'Hedvig Letters Sans', color: '#ccccff' }}>
          myExoticCars
        </h1>
        <span>
          <img
            src={carLogo}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            alt=''
          />
        </span>
      </div>
      <p style={{ color: '#f2f2f2', textAlign: 'center' }}>
        Here are top three of my favorite exotic cars in the world, fascinated
        by these incredible automobiles in three-dimension.{' '}
      </p>
      <div className='porshe-div'>
        <h1
          style={{
            fontSize: '1.5rem',
            color: '#ccccff',
            textAlign: 'center',
            fontFamily: 'Hedvig Letters Sans',
          }}
        >
          Porsche 718
        </h1>
        <div>
          <Canvas
            id='three-canvas-container'
            shadows
            ref={canvasRefs[0]}
            onWheel={handlePScroll}
          >
            <Suspense fallback={null}>
              <Center>
                <Porsche
                  porscheTotalScroll={porscheTotalScroll}
                  maxScroll={maxScroll}
                  negativeMaxScroll={negativeMaxScroll}
                />
              </Center>
            </Suspense>
          </Canvas>
        </div>
        <div style={{ transform: 'translateY(-30px)' }}>
          <ContentComponent
            content='The Porsche 718 is a series of one- or two-seat sports-racing cars built by Porsche from 1957 to 1962. An open-wheel single-seat model was developed for Formula racing...'
            Category='Sportscar, F1, F2'
            Constructor='Porsche'
            Designer='Wilhelm Hild'
            Predecessor='Porsche 550'
            Engine='Type 547 1,498 cc (91.4 cu in) DOHC F4 boxer engine normally aspirated Mid-engined'
            Transmission='5-speed manual'
            Weight='570 kg (1,256.6 lb)'
            Fuel='Petrol'
            customStyles={{
              color: 'white',
              paddingTop: '80px',
              paddingBottom: '80px',
              marginInline: '5%',
            }}
          />
        </div>
      </div>
      <div className='benz-div'>
        <h1
          style={{
            fontSize: '1.5rem',
            color: '#ccccff',
            textAlign: 'center',
            fontFamily: 'Hedvig Letters Sans',
          }}
        >
          Mercedes-Benz W223
        </h1>
        <Canvas
          id='three-canvas-container'
          shadows
          ref={canvasRefs[1]}
          onWheel={handleBzScroll}
        >
          <Suspense fallback={null}>
            <BenzComp
              benzTotalScroll={benzTotalScroll}
              maxScroll={maxScroll}
              negativeMaxScroll={negativeMaxScroll}
            />
          </Suspense>
        </Canvas>
        <div>
          <ContentComponent
            content='The Mercedes-Benz W223 is the seventh generation of the S‑Class produced by Mercedes-Benz since 2020.[3] It replaces the W222 S‑Class which has been produced since 2013. The W223 Mercedes-Benz S-Class is a full-size luxury sedan produced by Mercedes-Benz.'
            Category='Luxury car'
            Constructor='Mercedes-Benz Group'
            Designer='Balázs Filczer'
            Predecessor='Mercedes-Benz S-Class (W222)'
            Engine='M177 twin-turbo V8'
            Transmission='9-speed 9G-Tronic/9G-TRONIC plug-in-hybrid automatic'
            Weight='2069 Kg / 4561 lbs.'
            Fuel='Petrol'
            customStyles={{
              color: 'white',
              paddingTop: '80px',
              paddingBottom: '80px',
              marginInline: '5%',
            }}
          />
        </div>
      </div>
      <div className='bmw-div'>
        <h1
          style={{
            fontSize: '1.5rem',
            color: '#ccccff',
            textAlign: 'center',
            fontFamily: 'Hedvig Letters Sans',
          }}
        >
          BMW i8
        </h1>
        <Canvas
          id='three-canvas-container'
          shadows
          ref={canvasRefs[2]}
          onWheel={handleBmwScroll}
        >
          <Suspense fallback={null}>
            <BmwComp
              bmwTotalScroll={bmwTotalScroll}
              maxScroll={maxScroll}
              negativeMaxScroll={negativeMaxScroll}
            />
          </Suspense>
        </Canvas>
        <div>
          <ContentComponent
            content="The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 was part of BMW's electrified fleet and was marketed under the BMW i sub-brand. The production version of the BMW i8 was unveiled at the 2013 Frankfurt Motor Show and was released in Germany in June 2014. Deliveries to retail customers in the U.S began in August 2014 A roadster variant was launched in May 2018. Production ended in June 2020."
            Category='Sportscar'
            Constructor='BMW'
            Designer='Vision EfficientDynamics, Benoit Jacob, Richard Kim'
            Predecessor='BMW Vision EfficientDynamics (Concept)
          BMW ActiveE'
            Engine='B38K15T0 1.5L turbocharged I3 engine gasoline'
            Transmission='Aisin F21-360 FT EOP'
            Fuel='Gasoline'
            customStyles={{
              color: 'white',
              paddingTop: '80px',
              paddingBottom: '80px',
              marginInline: '5%',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
