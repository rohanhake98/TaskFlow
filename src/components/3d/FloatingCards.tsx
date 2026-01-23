import { useRef, useMemo } from 'react';
import { useFrame, GroupProps } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  title: string;
  delay?: number;
}

function FloatingCard({ position, rotation = [0, 0, 0], color, title, delay = 0 }: FloatingCardProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const initialY = position[1];

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      groupRef.current.position.y = initialY + Math.sin(time * 0.8) * 0.3;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1 + rotation[1];
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05 + rotation[0];
    }
  });

  return (
    <group ref={groupRef as React.RefObject<THREE.Group>} position={position}>
      <RoundedBox args={[2.5, 1.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.18}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
    </group>
  );
}

interface ParticleFieldProps {
  count?: number;
}

function ParticleField({ count = 200 }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={points as React.RefObject<THREE.Points>}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingCards() {
  const cards = [
    { position: [-3, 1, 0] as [number, number, number], color: '#ffffff', title: 'Website Redesign', delay: 0 },
    { position: [0, 0.5, 1] as [number, number, number], color: '#ffffff', title: 'Mobile App Dev', delay: 1 },
    { position: [3, 1.2, -0.5] as [number, number, number], color: '#ffffff', title: 'API Integration', delay: 2 },
    { position: [-2, -1, 1.5] as [number, number, number], color: '#ffffff', title: 'Database Setup', delay: 3 },
    { position: [2.5, -0.8, 0.8] as [number, number, number], color: '#ffffff', title: 'UI/UX Design', delay: 4 },
  ];

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#3b82f6" />
      
      <ParticleField count={150} />
      
      {cards.map((card, index) => (
        <FloatingCard
          key={index}
          position={card.position}
          color={card.color}
          title={card.title}
          delay={card.delay}
        />
      ))}
    </>
  );
}

export default FloatingCards;
