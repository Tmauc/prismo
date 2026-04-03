'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─── Prismatic Particles ───────────────────────────────────── */

function PrismaticDust({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      speeds[i] = 0.1 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => {
    const palette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#6d28d9'),
      new THREE.Color('#00d4ff'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#c084fc'),
    ];
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = palette[i % palette.length];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = particles.positions[i * 3];
      const y = particles.positions[i * 3 + 1];
      const z = particles.positions[i * 3 + 2];
      const speed = particles.speeds[i];
      const phase = particles.phases[i];

      dummy.position.set(
        x + Math.sin(t * speed + phase) * 0.5,
        y + Math.cos(t * speed * 0.6 + phase) * 0.3,
        z + Math.sin(t * speed * 0.4 + phase * 2) * 0.3
      );
      const s = 0.012 + Math.sin(t * 1.2 + phase) * 0.006;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.4} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}

/* ─── Scene ─────────────────────────────────────────────────── */

function Scene() {
  return (
    <>
      <PrismaticDust />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.5}
        />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────────── */

export function HoloScene() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
