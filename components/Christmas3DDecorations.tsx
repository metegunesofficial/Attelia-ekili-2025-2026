import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==================== KLASİK HEDİYE KUTUSU ====================
const GiftBoxClassic: React.FC<{ position: [number, number, number]; scale?: number; color: string; ribbonColor: string }> = ({
    position,
    scale = 1,
    color,
    ribbonColor
}) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Box body */}
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
            </mesh>

            {/* Ribbon horizontal */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.52, 0.08, 0.52]} />
                <meshStandardMaterial color={ribbonColor} metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Ribbon vertical */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.08, 0.52, 0.52]} />
                <meshStandardMaterial color={ribbonColor} metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Bow loops */}
            <mesh position={[0.12, 0.3, 0]} rotation={[0, 0, 0.4]}>
                <torusGeometry args={[0.08, 0.025, 8, 16, Math.PI]} />
                <meshStandardMaterial color={ribbonColor} metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[-0.12, 0.3, 0]} rotation={[0, 0, -0.4]}>
                <torusGeometry args={[0.08, 0.025, 8, 16, Math.PI]} />
                <meshStandardMaterial color={ribbonColor} metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Bow center */}
            <mesh position={[0, 0.32, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color={ribbonColor} metalness={0.5} roughness={0.3} />
            </mesh>
        </group>
    );
};

// ==================== MAIN 3D SCENE ====================
export const Christmas3DDecorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#b4d7ff" />
                <pointLight position={[0, 3, 2]} intensity={0.4} color="#fff5e6" />

                {/* 6 Klasik Hediye Kutusu - Farklı Renkler */}
                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
                    <GiftBoxClassic position={[-5.5, 2.5, -1]} color="#8B0000" ribbonColor="#ffd700" scale={0.2} />
                </Float>

                <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.2}>
                    <GiftBoxClassic position={[5.3, 2.2, -1.2]} color="#1a5f2a" ribbonColor="#e74c3c" scale={0.2} />
                </Float>

                <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
                    <GiftBoxClassic position={[-5.8, -0.5, -1.3]} color="#2980b9" ribbonColor="#f39c12" scale={0.2} />
                </Float>

                <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.18}>
                    <GiftBoxClassic position={[5.6, -0.8, -1]} color="#8e44ad" ribbonColor="#1abc9c" scale={0.2} />
                </Float>

                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.25}>
                    <GiftBoxClassic position={[-5.3, -2.8, -1.5]} color="#d35400" ribbonColor="#2980b9" scale={0.2} />
                </Float>

                <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.2}>
                    <GiftBoxClassic position={[5.4, -2.5, -1.1]} color="#c0392b" ribbonColor="#f1c40f" scale={0.2} />
                </Float>
            </Canvas>
        </div>
    );
};
