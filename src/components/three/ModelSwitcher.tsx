import React, { useRef } from 'react'
import { PresentationControls } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import ModelMacbook16 from '../models/Macbook-16'
import ModelMacbook14 from '../models/Macbook-14'
import { useThree } from '@react-three/fiber'

type Props = {
  scale: number
  isMobile: boolean
}

const ANIMATION_DURATION = 1
const OFFSET_DISTANCE = 5
const ROTATION_ANGLE = Math.PI / 6 // 30° tilt

// 🔹 Fade all meshes in a group
const fadeMeshes = (group: THREE.Group | null, opacity: number) => {
  if (!group) return

  group.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      const material = mesh.material
      if (Array.isArray(material)) {
        material.forEach((m) => {
          m.transparent = true
          gsap.to(m, { opacity, duration: ANIMATION_DURATION })
        })
      } else {
        material.transparent = true
        gsap.to(material, { opacity, duration: ANIMATION_DURATION })
      }
    }
  })
}

// 🔹 Move and rotate group smoothly
const moveGroup = (group: THREE.Group | null, x: number, rotationY: number) => {
  if (!group) return
  gsap.to(group.position, { x, duration: ANIMATION_DURATION, ease: 'power2.inOut' })
  gsap.to(group.rotation, { y: rotationY, duration: ANIMATION_DURATION, ease: 'power2.inOut' })
}

// 🔹 Animate lid (if model has a “screen” or “lid” node)
const openLaptopLid = (group: THREE.Group | null, angle: number) => {
  if (!group) return
  const lid = group.children.find(
    (c) => c.name.toLowerCase().includes('screen') || c.name.toLowerCase().includes('lid')
  )
  if (lid) {
    gsap.to(lid.rotation, { x: angle, duration: ANIMATION_DURATION, ease: 'power1.inOut' })
  }
}

// 🔹 Main component
const ModelSwitcher: React.FC<Props> = ({ scale, isMobile }) => {
  const { camera } = useThree()
  const smallMacbookRef = useRef<THREE.Group>(null)
  const largeMacbookRef = useRef<THREE.Group>(null)

  const SCALE_LARGE_DESKTOP = 0.08
  const SCALE_LARGE_MOBILE = 0.05
  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE

  useGSAP(
    () => {
      gsap.from([smallMacbookRef.current, largeMacbookRef.current], {
  y: -2,
  opacity: 0,
  duration: 1.5,
  ease: 'power3.out',
  stagger: 0.3,
})
      if (showLargeMacbook) {
        gsap.to(camera.position, { z: 7, duration: ANIMATION_DURATION })

        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE, -ROTATION_ANGLE)
        moveGroup(largeMacbookRef.current, 0, 0)

        fadeMeshes(smallMacbookRef.current, 0)
        fadeMeshes(largeMacbookRef.current, 1)

        openLaptopLid(largeMacbookRef.current, Math.PI / 3)
      } else {
        gsap.to(camera.position, { z: 9, duration: ANIMATION_DURATION })

        moveGroup(smallMacbookRef.current, 0, 0)
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE, ROTATION_ANGLE)

        fadeMeshes(smallMacbookRef.current, 1)
        fadeMeshes(largeMacbookRef.current, 0)

        openLaptopLid(smallMacbookRef.current, Math.PI / 4)
      }
    },
    { dependencies: [scale] }
  )

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
   polar: [-Math.PI, Math.PI] as [number, number],
  azimuth: [-Infinity, Infinity] as [number, number],
    config: { mass: 1, tension: 0, friction: 26 },
  }

   return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <ModelMacbook16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <ModelMacbook14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  )
}

export default ModelSwitcher
