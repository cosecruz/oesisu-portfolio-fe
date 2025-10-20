import * as THREE from 'three'
import React, { useEffect, type JSX } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { Color, SRGBColorSpace } from 'three'
import useMacbookStore from '../../store'
import { noChangeParts } from '../../constants'

// ✅ Define the expected structure of the GLTF file
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.MeshStandardMaterial>
}

const MacbookModel14: React.FC<JSX.IntrinsicElements['group']> = (props) => {
  const { color } = useMacbookStore()
  const { nodes, materials, scene } = useGLTF('/models/macbook-14-transformed.glb') as unknown as GLTFResult

  const texture = useTexture('/screen.png')
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true

  // ✅ Update material colors based on Zustand store
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (!noChangeParts.includes(mesh.name)) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.color = new Color(color)
        }
      }
    })
  }, [color, scene])

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.zhGRTuGrQoJflBD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_22.geometry} material={materials.lmWQsEjxpsebDlK} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_30.geometry} material={materials.LtEafgAVRolQqRw} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_32.geometry} material={materials.iyDJFXmHelnMTbD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_34.geometry} material={materials.eJObPwhgFzvfaoZ} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_38.geometry} material={materials.nDsMUuDKliqGFdU} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_42.geometry} material={materials.CRQixVLpahJzhJc} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_48.geometry} material={materials.YYwBgwvcyZVOOAA} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_54.geometry} material={materials.SLGkCohDDelqXBu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_58.geometry} material={materials.WnHKXHhScfUbJQi} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_66.geometry} material={materials.fNHiBfcxHUJCahl} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_74.geometry} material={materials.LpqXZqhaGCeSzdu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_82.geometry} material={materials.gMtYExgrEUqPfln} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_96.geometry} material={materials.PaletteMaterial003} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_107.geometry} material={materials.JvMFZolVCdpPqjj} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_123.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/macbook-14-transformed.glb')

export default MacbookModel14
