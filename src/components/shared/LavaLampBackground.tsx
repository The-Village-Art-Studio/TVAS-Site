"use client"

import type React from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { useRef, useMemo, useState, useCallback, useEffect } from "react"
// Note: SimplexNoise might need a different path or package in some environments
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js"

const noise = new SimplexNoise()

export type BlobMode = "standard" | "leviathan" | "molten" | "bioluminescent" | "swarm"

const BLOB_RECHECK_INTERVAL = 3500
const BLOB_MAX_INACTIVE_TIME = 7000

type GeometryType = "sphere" | "icosahedron"

interface BlobData {
  id: string
  position: THREE.Vector3
  velocity: THREE.Vector3
  scale: number
  targetScale: number
  baseScale: number
  color: THREE.Color
  targetColor: THREE.Color
  baseColor: THREE.Color
  speedFactor: number
  isActive: boolean
  lastActiveTime: number
  repulsionIntensity: number
  morphIntensity: number
  morphSpeed: number
  geometryType: GeometryType
  timeOffset: number
  opacity: number
  targetOpacity: number
  initialDelay: number
  hasAppeared: boolean
}

const ORIGINAL_COUNTS = {
  standard: 7,
  leviathan: 3,
  molten: 6,
  bioluminescent: 9,
  swarm: 20,
}

const BLOB_CONFIGURATIONS = {
  standard: {
    count: ORIGINAL_COUNTS.standard + 7,
    minScale: 1.8,
    maxScale: 3.8,
    minSpeedFactor: 0.04,
    maxSpeedFactor: 0.12,
    maxBlobsPool: ORIGINAL_COUNTS.standard + 7 + 3,
    colors: ["#0cbcf5", "#0091c2", "#38bdf8", "#7dd3fc", "#bae6fd"], // Adjusted to TVAS colors
    morphIntensity: 0.2,
    morphSpeed: 0.16,
    geometryType: "sphere" as GeometryType,
  },
  leviathan: {
    count: ORIGINAL_COUNTS.leviathan + 7,
    minScale: 5.0,
    maxScale: 7.5,
    minSpeedFactor: 0.01,
    maxSpeedFactor: 0.06,
    maxBlobsPool: ORIGINAL_COUNTS.leviathan + 7 + 2,
    colors: ["#0cbcf5", "#0091c2", "#38bdf8", "#0cbcf5", "#7dd3fc"],
    morphIntensity: 0.05,
    morphSpeed: 0.1,
    geometryType: "sphere" as GeometryType,
  },
  molten: {
    count: ORIGINAL_COUNTS.molten + 7,
    minScale: 2.2,
    maxScale: 4.2,
    minSpeedFactor: 0.07,
    maxSpeedFactor: 0.18,
    maxBlobsPool: ORIGINAL_COUNTS.molten + 7 + 3,
    colors: ["#38bdf8", "#0cbcf5", "#0ea5e9", "#0284c7", "#0369a1"],
    morphIntensity: 0.35,
    morphSpeed: 0.3,
    geometryType: "icosahedron" as GeometryType,
  },
  bioluminescent: {
    count: ORIGINAL_COUNTS.bioluminescent + 7,
    minScale: 1.0,
    maxScale: 3.0,
    minSpeedFactor: 0.18,
    maxSpeedFactor: 0.45,
    maxBlobsPool: ORIGINAL_COUNTS.bioluminescent + 7 + 4,
    colors: ["#0cbcf5", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75"],
    morphIntensity: 0.16,
    morphSpeed: 0.6,
    geometryType: "icosahedron" as GeometryType,
  },
  swarm: {
    count: ORIGINAL_COUNTS.swarm + 7,
    minScale: 0.25,
    maxScale: 0.9,
    minSpeedFactor: 0.6,
    maxSpeedFactor: 1.4,
    maxBlobsPool: ORIGINAL_COUNTS.swarm + 7 + 5,
    colors: ["#0cbcf5", "#38bdf8", "#ffffff", "#e0f2fe", "#f0f9ff", "#f8fafc"],
    morphIntensity: 0.08,
    morphSpeed: 1.2,
    geometryType: "sphere" as GeometryType,
  },
}

function createBlob(
  id: string,
  viewport: { width: number; height: number },
  config: (typeof BLOB_CONFIGURATIONS)[BlobMode],
  isInitialBlob: boolean,
  blobIndex: number,
): BlobData {
  const colors = config.colors
  const randomBaseScale = Math.random() * (config.maxScale - config.minScale) + config.minScale

  let initialPositionX, initialPositionY, initialPositionZ
  const edgeFactor = 1.1

  if (!isInitialBlob) {
    const angle = (blobIndex / 7) * Math.PI * 2 + Math.random() * 0.5
    const radiusX = viewport.width * 0.5 * edgeFactor
    const radiusY = viewport.height * 0.5 * edgeFactor
    const depthRadius = 8 * edgeFactor
    const entryType = blobIndex % 4

    if (entryType === 0) {
      initialPositionX = Math.cos(angle) * radiusX
      initialPositionY = (Math.random() - 0.5) * viewport.height * 0.4
      initialPositionZ = (Math.random() - 0.5) * 10
    } else if (entryType === 1) {
      initialPositionX = (Math.random() - 0.5) * viewport.width * 0.4
      initialPositionY = Math.sin(angle) * radiusY
      initialPositionZ = (Math.random() - 0.5) * 10
    } else if (entryType === 2) {
      initialPositionX = (Math.random() - 0.5) * viewport.width * 0.4
      initialPositionY = (Math.random() - 0.5) * viewport.height * 0.4
      initialPositionZ = Math.cos(angle) * depthRadius
    } else {
      initialPositionX = Math.cos(angle) * radiusX * 0.7
      initialPositionY = Math.sin(angle) * radiusY * 0.7
      initialPositionZ = Math.cos(angle + Math.PI / 4) * depthRadius * 0.7
    }
  } else {
    initialPositionX = (Math.random() - 0.5) * viewport.width * 0.3
    initialPositionY = (Math.random() - 0.5) * viewport.height * 0.3
    initialPositionZ = (Math.random() - 0.5) * 10 - 5
  }

  const initialPosition = new THREE.Vector3(initialPositionX, initialPositionY, initialPositionZ)
  const baseColor = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
  const randomFactor = (range: number) => 1 + (Math.random() - 0.5) * range

  return {
    id,
    position: initialPosition.clone(),
    velocity: new THREE.Vector3(0, 0, 0),
    scale: 0.01,
    targetScale: randomBaseScale,
    baseScale: randomBaseScale,
    color: baseColor.clone().offsetHSL(0, 0.05, 0.1),
    targetColor: baseColor.clone(),
    baseColor: baseColor.clone(),
    speedFactor:
      (Math.random() * (config.maxSpeedFactor - config.minSpeedFactor) + config.minSpeedFactor) * randomFactor(0.15),
    isActive: true,
    lastActiveTime: Date.now(),
    repulsionIntensity: 0,
    morphIntensity: config.morphIntensity * randomFactor(0.25),
    morphSpeed: config.morphSpeed * randomFactor(0.25),
    geometryType: config.geometryType,
    timeOffset: Math.random() * 2000,
    opacity: 0,
    targetOpacity: 0,
    initialDelay: isInitialBlob ? 200 : 5000 + Math.random() * 1000,
    hasAppeared: false,
  }
}

function EnhancedLavaBlob({
  blobData,
  allBlobs,
  onUpdateBlob,
  mode,
}: {
  blobData: BlobData
  allBlobs: React.MutableRefObject<BlobData[]>
  onUpdateBlob: (id: string, updates: Partial<BlobData>) => void
  mode: BlobMode
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const internalTimeRef = useRef(blobData.timeOffset)
  const { viewport, camera, clock: r3fClock } = useThree()
  const frustum = useMemo(() => new THREE.Frustum(), [])
  const projScreenMatrix = useMemo(() => new THREE.Matrix4(), [])
  const [isReadyToAppear, setIsReadyToAppear] = useState(false)

  useEffect(() => {
    if (blobData.hasAppeared) {
      setIsReadyToAppear(true)
      onUpdateBlob(blobData.id, { targetOpacity: 1.0 })
      return
    }
    const timer = setTimeout(() => {
      setIsReadyToAppear(true)
      onUpdateBlob(blobData.id, { targetOpacity: 1.0, hasAppeared: true })
    }, blobData.initialDelay)
    return () => clearTimeout(timer)
  }, [blobData.id, blobData.initialDelay, blobData.hasAppeared, onUpdateBlob])

  const isBlobInView = useCallback(() => {
    if (!meshRef.current) return false
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projScreenMatrix)
    const boundingSphere = meshRef.current.geometry.boundingSphere?.clone().applyMatrix4(meshRef.current.matrixWorld)
    if (boundingSphere) {
      boundingSphere.radius *= 1.15
      return frustum.intersectsSphere(boundingSphere)
    }
    return frustum.intersectsObject(meshRef.current)
  }, [camera, frustum, projScreenMatrix])

  useFrame((state, delta) => {
    if (!meshRef.current || !isReadyToAppear || (!blobData.isActive && blobData.opacity < 0.01)) return

    const effectiveDelta = Math.min(delta, 0.033)
    internalTimeRef.current += effectiveDelta * 0.45

    const noiseTime = internalTimeRef.current * blobData.speedFactor * 0.18
    const pos = blobData.position
    const noiseScaleMovement = 0.035

    const force = new THREE.Vector3(
      noise.noise3d(pos.x * noiseScaleMovement + blobData.timeOffset, pos.y * noiseScaleMovement, noiseTime),
      noise.noise3d(pos.y * noiseScaleMovement + blobData.timeOffset, pos.z * noiseScaleMovement, noiseTime),
      noise.noise3d(pos.z * noiseScaleMovement + blobData.timeOffset, pos.x * noiseScaleMovement, noiseTime),
    ).multiplyScalar(blobData.speedFactor * effectiveDelta * 25)

    if (mode === "standard" || mode === "molten" || mode === "swarm") {
      const buoyancy = (0.7 + noise.noise(noiseTime, blobData.id.charCodeAt(0)) * 0.6) * effectiveDelta
      force.y += buoyancy
    }
    blobData.velocity.add(force)

    let totalRepulsion = 0
    for (const otherBlob of allBlobs.current) {
      if (otherBlob.id === blobData.id || (!otherBlob.isActive && otherBlob.opacity < 0.01) || !otherBlob.hasAppeared)
        continue
      const distance = blobData.position.distanceTo(otherBlob.position)
      const repulsionThreshold = (blobData.scale + otherBlob.scale) * 0.5
      if (distance < repulsionThreshold && distance > 0.01) {
        const repulsionStrength = Math.pow(1 - distance / repulsionThreshold, 1.8) * 0.08 * effectiveDelta * 60
        const repulsionDir = new THREE.Vector3().subVectors(blobData.position, otherBlob.position).normalize()
        blobData.velocity.add(repulsionDir.multiplyScalar(repulsionStrength))
        totalRepulsion += repulsionStrength * 0.6
      }
    }
    onUpdateBlob(blobData.id, { repulsionIntensity: totalRepulsion })

    blobData.velocity.multiplyScalar(1 - 0.8 * effectiveDelta)

    const boundaryPush = 0.05 * effectiveDelta * 60
    const boundaryPadding = 0.65
    if (pos.x > viewport.width * boundaryPadding) blobData.velocity.x -= boundaryPush
    if (pos.x < -viewport.width * boundaryPadding) blobData.velocity.x += boundaryPush
    if (pos.y > viewport.height * boundaryPadding) blobData.velocity.y -= boundaryPush
    if (pos.y < -viewport.height * boundaryPadding) blobData.velocity.y += boundaryPush
    if (pos.z > 6) blobData.velocity.z -= boundaryPush
    if (pos.z < -12) blobData.velocity.z += boundaryPush

    blobData.position.add(blobData.velocity.clone().multiplyScalar(effectiveDelta))
    meshRef.current.position.copy(blobData.position)

    const lerpFactor = effectiveDelta * 0.35
    blobData.scale = THREE.MathUtils.lerp(blobData.scale, blobData.targetScale, lerpFactor)
    blobData.color.lerp(blobData.targetColor, lerpFactor)
    blobData.opacity = THREE.MathUtils.lerp(blobData.opacity, blobData.targetOpacity, lerpFactor * 1.2)
    blobData.repulsionIntensity = THREE.MathUtils.lerp(blobData.repulsionIntensity, 0, lerpFactor * 1.8)

    meshRef.current.scale.setScalar(Math.max(0.01, blobData.scale))
    const material = meshRef.current.material as THREE.MeshPhysicalMaterial
    material.opacity = blobData.opacity * (mode === "leviathan" ? 0.65 : mode === "standard" ? 0.75 : 0.8)
    material.visible = blobData.opacity > 0.005

    if (blobData.isActive && isBlobInView()) {
      onUpdateBlob(blobData.id, { lastActiveTime: Date.now() })
    }

    const geometry = meshRef.current.geometry
    const originalPositions =
      geometry.userData.originalPositions || (geometry.attributes.position.array as Float32Array).slice()
    if (!geometry.userData.originalPositions) geometry.userData.originalPositions = originalPositions

    const positions = geometry.attributes.position.array as Float32Array
    const vertex = new THREE.Vector3()
    const morphTime = r3fClock.getElapsedTime() * blobData.morphSpeed * 0.65 + blobData.timeOffset
    const currentMorphIntensity = blobData.morphIntensity + blobData.repulsionIntensity * 1.5

    for (let i = 0; i < originalPositions.length; i += 3) {
      vertex.set(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2])
      const normalizedVertex = vertex.clone().normalize()
      const noiseFactor =
        currentMorphIntensity * blobData.baseScale * (0.58 + 0.42 * Math.sin(vertex.length() * 1.45 + morphTime))
      const noiseSamplingScale = 1.45 / blobData.baseScale

      const displacement =
        noise.noise3d(
          normalizedVertex.x * noiseSamplingScale + morphTime * 0.18,
          normalizedVertex.y * noiseSamplingScale + morphTime * 0.22,
          normalizedVertex.z * noiseSamplingScale + morphTime * 0.28,
        ) * noiseFactor
      const displacedVertex = vertex.clone().multiplyScalar(1 + displacement)
      positions[i] = displacedVertex.x
      positions[i + 1] = displacedVertex.y
      positions[i + 2] = displacedVertex.z
    }
    geometry.attributes.position.needsUpdate = true
    if (geometry.attributes.normal) geometry.computeVertexNormals()
  })

  const getEmissiveColor = () => {
    if (mode === "molten") return new THREE.Color(blobData.color).multiplyScalar(0.8)
    if (mode === "bioluminescent") return new THREE.Color(blobData.color).multiplyScalar(0.7)
    if (mode === "leviathan") return new THREE.Color(blobData.color).multiplyScalar(0.3)
    return new THREE.Color(0x000000)
  }

  return (
    <mesh ref={meshRef} position={blobData.position.toArray()} visible={blobData.opacity > 0.005}>
      {blobData.geometryType === "icosahedron" ? (
        <icosahedronGeometry args={[1, mode === "molten" ? 5 : 7]} />
      ) : (
        <sphereGeometry args={[1, mode === "leviathan" ? 60 : 48, mode === "leviathan" ? 60 : 48]} />
      )}
      <meshPhysicalMaterial
        color={blobData.color}
        transparent
        opacity={0}
        roughness={mode === "leviathan" ? 0.01 : mode === "standard" ? 0.06 : 0.03}
        metalness={mode === "leviathan" ? 0.3 : mode === "standard" ? 0.02 : 0.15}
        clearcoat={mode === "leviathan" ? 1.0 : mode === "standard" ? 0.3 : 0.8}
        clearcoatRoughness={mode === "leviathan" ? 0.03 : mode === "standard" ? 0.3 : 0.07}
        transmission={mode === "leviathan" ? 0.85 : mode === "standard" ? 0.8 : 0.7}
        thickness={
          mode === "leviathan"
            ? 1.7 * blobData.scale
            : mode === "standard"
              ? 0.9 * blobData.scale
              : 1.2 * blobData.scale
        }
        ior={mode === "leviathan" ? 1.55 : mode === "standard" ? 1.33 : 1.45}
        envMapIntensity={mode === "leviathan" ? 1.2 : mode === "standard" ? 1.0 : 0.8}
        emissive={getEmissiveColor()}
        emissiveIntensity={mode === "molten" || mode === "bioluminescent" || mode === "leviathan" ? 0.75 : 0}
        depthWrite={false}
      />
    </mesh>
  )
}

function CameraController() {
  const controlsRef = useRef<any>(null)
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.azimuthAngle += 0.00007
      controlsRef.current.update()
    }
  })
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={8}
      maxDistance={30}
      minPolarAngle={Math.PI / 9}
      maxPolarAngle={Math.PI - Math.PI / 9}
      autoRotate={false}
      enableDamping
      dampingFactor={0.007}
      rotateSpeed={0.15}
      zoomSpeed={0.3}
    />
  )
}

function EnhancedLavaLampScene({ mode = "standard" }: { mode?: BlobMode }) {
  const { viewport, clock } = useThree()
  const currentConfig = BLOB_CONFIGURATIONS[mode]
  const originalCountForMode = ORIGINAL_COUNTS[mode]

  const [blobDataArray, setBlobDataArray] = useState<BlobData[]>(() => {
    const initialTime = clock.getElapsedTime()
    return Array.from({ length: currentConfig.count }, (_, i) => {
      const isInitial = i < originalCountForMode
      return createBlob(
        `blob-${i}-${mode}`,
        viewport,
        currentConfig,
        isInitial,
        isInitial ? i : i - originalCountForMode,
      )
    })
  })
  const allBlobsRef = useRef<BlobData[]>(blobDataArray)

  useEffect(() => {
    const newConfig = BLOB_CONFIGURATIONS[mode]
    const newOriginalCount = ORIGINAL_COUNTS[mode]
    const initialTime = clock.getElapsedTime()
    setBlobDataArray(
      Array.from({ length: newConfig.count }, (_, i) => {
        const isInitial = i < newOriginalCount
        return createBlob(`blob-${i}-${mode}`, viewport, newConfig, isInitial, isInitial ? i : i - newOriginalCount)
      }),
    )
  }, [mode, viewport, clock])

  useEffect(() => {
    allBlobsRef.current = blobDataArray
  }, [blobDataArray])

  const updateBlob = useCallback((id: string, updates: Partial<BlobData>) => {
    setBlobDataArray((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now()
      const activeBlobs = allBlobsRef.current.filter((b) => b.isActive && b.hasAppeared).length
      let blobsToPotentiallyReactivate = currentConfig.count - activeBlobs

      allBlobsRef.current.forEach((blob) => {
        if (blob.isActive && blob.hasAppeared && now - blob.lastActiveTime > BLOB_MAX_INACTIVE_TIME) {
          updateBlob(blob.id, { isActive: false, targetOpacity: 0 })
          blobsToPotentiallyReactivate++
        } else if (!blob.isActive && blobsToPotentiallyReactivate > 0 && blob.opacity < 0.01) {
          const isInitial = allBlobsRef.current.findIndex((b) => b.id === blob.id) < ORIGINAL_COUNTS[mode]
          const newBlobState = createBlob(blob.id, viewport, currentConfig, isInitial, 0)
          updateBlob(blob.id, {
            ...newBlobState,
            isActive: true,
            lastActiveTime: now,
            opacity: 0,
            targetOpacity: 0,
            hasAppeared: false,
          })
          blobsToPotentiallyReactivate--
        }
      })

      if (allBlobsRef.current.length < currentConfig.maxBlobsPool && activeBlobs < currentConfig.count) {
        const numToAdd = Math.min(
          currentConfig.count - allBlobsRef.current.length,
          currentConfig.maxBlobsPool - allBlobsRef.current.length,
        )
        const newBlobInstances: BlobData[] = []
        const currentLength = allBlobsRef.current.length
        for (let i = 0; i < numToAdd; i++) {
          newBlobInstances.push(createBlob(`blob-${currentLength + i}-${mode}`, viewport, currentConfig, false, i))
        }
        if (newBlobInstances.length > 0) {
          setBlobDataArray((prev) => [...prev, ...newBlobInstances])
        }
      }
    }, BLOB_RECHECK_INTERVAL)
    return () => clearInterval(intervalId)
  }, [viewport, updateBlob, currentConfig, mode])

  const getEnvironmentPreset = () => {
    switch (mode) {
      case "molten": return "sunset"
      case "bioluminescent": return "forest"
      case "leviathan": return "night"
      case "swarm": return "dawn"
      default: return "city"
    }
  }

  const getLighting = () => {
    switch (mode) {
      case "standard":
        return (
          <>
            <ambientLight intensity={0.8} color="#f0f9ff" />
            <directionalLight position={[18, 22, 18]} intensity={1.8} color="#e0f2fe" />
            <pointLight position={[-15, -15, -15]} intensity={1.0} color="#bae6fd" />
          </>
        )
      case "molten":
        return (
          <>
            <ambientLight intensity={0.7} color="#f0f9ff" />
            <directionalLight position={[12, 6, 6]} intensity={2.2} color="#7dd3fc" />
            <pointLight position={[-10, -6, -6]} intensity={1.5} color="#38bdf8" />
          </>
        )
      case "bioluminescent":
        return (
          <>
            <ambientLight intensity={0.6} color="#ecfeff" />
            <directionalLight position={[6, 12, 6]} intensity={1.5} color="#cffafe" />
            <pointLight position={[0, 0, 6]} intensity={1.8} color="#0cbcf5" distance={40} decay={1.4} />
          </>
        )
      case "leviathan":
        return (
          <>
            <ambientLight intensity={0.5} color="#f0f9ff" />
            <directionalLight position={[20, 25, 20]} intensity={1.2} color="#7dd3fc" />
            <pointLight position={[-20, -15, -20]} intensity={0.8} color="#0091c2" />
          </>
        )
      default:
        return (
          <>
            <ambientLight intensity={0.9} color="#f8fafc" />
            <directionalLight position={[15, 20, 10]} intensity={2.0} color="#f1f5f9" />
            <pointLight position={[-15, -10, -15]} intensity={1.2} color="#e2e8f0" />
          </>
        )
    }
  }

  return (
    <>
      {getLighting()}
      <Environment preset={getEnvironmentPreset()} blur={mode === "standard" ? 0.35 : 0.3} />
      {blobDataArray.map((blob) => (
        <EnhancedLavaBlob
          key={blob.id}
          blobData={blob}
          allBlobs={allBlobsRef}
          onUpdateBlob={updateBlob}
          mode={mode}
        />
      ))}
      <CameraController />
    </>
  )
}

interface EnhancedLavaLamp3DProps {
  mode?: BlobMode
  onCanvasCreated?: () => void
}

export default function EnhancedLavaLamp3D({ mode = "standard", onCanvasCreated }: EnhancedLavaLamp3DProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        key={mode}
        camera={{ position: [0, 0, 25], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        shadows
        onCreated={onCanvasCreated}
      >
        <EnhancedLavaLampScene mode={mode} />
      </Canvas>
    </div>
  )
}
