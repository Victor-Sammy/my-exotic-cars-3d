/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { angleToRadians } from '../../utils/angle'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Showroom } from '../showroom.jsx/Showroom'
import { Car } from './porsche'

export default function Porsche({
  porscheTotalScroll,
  maxScroll,
  negativeMaxScroll,
}) {
  const meshRef = useRef()
  const { size } = useThree()

  const OrbitControlsRef = useRef(null)
  const [rotationY, setRotationY] = useState(0)

  useFrame(() => {
    // Enable or disable zoom based on the totalScroll range
    OrbitControlsRef.current.enableZoom = !(
      porscheTotalScroll <= negativeMaxScroll || porscheTotalScroll >= maxScroll
    )
  })

  // Update rotation on each frame
  useFrame(() => {
    setRotationY((prevRotationY) => prevRotationY + angleToRadians(1)) // Increment rotation angle
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

      OrbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(60))
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
        minPolarAngle={angleToRadians(75)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Car showroom */}
      <Showroom />

      {/* Car */}
      <Car rotationY={rotationY} />

      {/* Floor*/}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow ref={meshRef}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#000C66' />
      </mesh>
      {/* Ambient light */}
      <ambientLight args={['#000', 0.7]} />

      {/* Directional light */}
      <spotLight
        args={['#ffffff', 7, 9, angleToRadians(45), 0.1]}
        position={[-5, 1, 1]}
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
