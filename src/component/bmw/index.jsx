/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { angleToRadians } from '../../utils/angle'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Bmw } from './Bmw'

export default function BmwComp({
  bmwTotalScroll,
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
      bmwTotalScroll <= negativeMaxScroll || bmwTotalScroll >= maxScroll
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

      OrbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45))
      OrbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30))
      OrbitControlsRef.current.update()
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, -3, 5]} />
      <OrbitControls
        ref={OrbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Car */}
      <Bmw rotationY={rotationY} />

      {/* Floor*/}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow ref={meshRef}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#555555' />
      </mesh>
      {/* Ambient light */}
      <ambientLight args={['#ffffff', 0.7]} />

      {/* Directional light */}
      <spotLight
        args={['#ffffff', 7, 9, angleToRadians(45), 0.1]}
        position={[-3, 1, 0]}
        castShadow
        ref={meshRef}
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='#999999' side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  )
}
