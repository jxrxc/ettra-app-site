"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Quill({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const quillRef = useRef<THREE.Group>(null);

  return (
    <group ref={quillRef} position={position} rotation={rotation}>
      {/* Quill Body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#FF5277" />
      </mesh>
      {/* Quill Tip */}
      <mesh position={[0, -0.4, 0]}>
        <coneGeometry args={[0.02, 0.2, 6]} />
        <meshStandardMaterial color="#FF5277" />
      </mesh>
      {/* Quill Feather */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.3, 0.01]} />
        <meshStandardMaterial color="#E85A7C" />
      </mesh>
    </group>
  );
}

function WritingText({ isWriting }: { isWriting: boolean }) {
  const textRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.visible = isWriting;
    }
  }, [isWriting]);

  return (
    <group ref={textRef} position={[0, -1, 0]} visible={false}>
      <Text
        fontSize={0.3}
        color="#FF6B6B"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        lineHeight={1.2}
        letterSpacing={0.02}
        font="/fonts/inter-regular.woff"
      >
        Crafting the art & edge of selling beautifully.
        Your listings. Cinematic. Branded. Effortless.
      </Text>
    </group>
  );
}

function Scene() {
  const [isWriting, setIsWriting] = useState(false);
  const [quillPosition, setQuillPosition] = useState<[number, number, number]>([-3, 0, 0]);
  const [quillRotation, setQuillRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => {
      setIsWriting(true);
    }, 1000);

    // Animate quill movement
    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Move quill from left to right
      const x = -3 + (t * 6); // -3 to 3
      setQuillPosition([x, Math.sin(t * Math.PI * 2) * 0.2, 0]);

      // Rotate quill as it moves
      setQuillRotation([0, 0, t * Math.PI * 0.5]);

      // Update progress for text writing effect
      setProgress(t);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer2 = setTimeout(animate, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Quill */}
      <Quill position={quillPosition} rotation={quillRotation} />
      
      {/* Writing Text */}
      <WritingText isWriting={isWriting} />
      
      {/* Camera Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function ThreeJSQuillAnimation() {
  return (
    <div className="w-full h-96 mb-8">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Scene />
      </Canvas>
    </div>
  );
}
