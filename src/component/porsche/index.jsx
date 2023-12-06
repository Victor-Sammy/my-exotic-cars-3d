/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { angleToRadians } from '../../utils/angle'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { Car } from './car'
import { Showroom } from '../showroom.jsx/Showroom'

export default function Porsche({
  porscheTotalScroll,
  maxScroll,
  negativeMaxScroll,
}) {
  const meshRef = useRef()
  const { size } = useThree()

  const OrbitControlsRef = useRef(null)

  useFrame(() => {
    // Enable or disable zoom based on the totalScroll range
    OrbitControlsRef.current.enableZoom = !(
      porscheTotalScroll <= negativeMaxScroll || porscheTotalScroll >= maxScroll
    )
  })

  // Calculate scale based on the size of the viewport
  const scaleFactor = Math.min(size.width, size.height) / 8

  useFrame(() => {
    // Update the scale of the mesh in the animation loop
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor)
  })

  useFrame((state) => {
    if (OrbitControlsRef.current) {
      const { x, y } = state.pointer
      //console.log(-x * angleToRadians(90))
      //console.log(y * angleToRadians(90 - 30))
      OrbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45))
      OrbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30))
      OrbitControlsRef.current.update()
    }
  })

  console.log(porscheTotalScroll)

  return (
    <React.Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls
        ref={OrbitControlsRef}
        //enableZoom={true}
        minPolarAngle={angleToRadians(75)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Car */}
      <Showroom />

      {/* Car */}
      <Car />

      {/* Floor*/}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow ref={meshRef}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>
      {/* Ambient light */}
      <ambientLight args={['#ffffff', 0.7]} />

      {/* Directional light */}
      <spotLight
        args={['#ffffff', 7, 9, angleToRadians(50), 0.1]}
        position={[-2, 1, 1]}
        castShadow
        ref={meshRef}
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='#2280cc' side={THREE.BackSide} />
        </mesh>
      </Environment>
    </React.Suspense>
  )
}
