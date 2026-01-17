"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticlesProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  backgroundColor?: string;
  className?: string;
}

export function Particles({
  color = "#ff3366",
  particleCount = 10000,
  particleSize = 35,
  animate = true,
  backgroundColor,
  className = "",
}: ParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let material: THREE.PointsMaterial;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let resizeObserver: ResizeObserver | null = null;

    const init = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(55, width / height, 2, 2000);
      camera.position.z = 1000;

      scene = new THREE.Scene();

      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          2000 * Math.random() - 1000,
          2000 * Math.random() - 1000,
          2000 * Math.random() - 1000
        );
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 64;
      textureCanvas.height = 64;
      const textureContext = textureCanvas.getContext("2d");
      if (textureContext) {
        const gradient = textureContext.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        textureContext.fillStyle = gradient;
        textureContext.beginPath();
        textureContext.arc(32, 32, 32, 0, Math.PI * 2);
        textureContext.fill();
      }

      const sprite = new THREE.CanvasTexture(textureCanvas);
      material = new THREE.PointsMaterial({
        size: particleSize,
        sizeAttenuation: true,
        map: sprite,
        alphaTest: 0.5,
        transparent: true,
      });
      material.color.setStyle(color);

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      if (backgroundColor) {
        renderer.setClearColor(backgroundColor, 1);
      } else {
        renderer.setClearColor(0x000000, 0);
      }
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      return renderer;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.isPrimary) {
        const rect = container.getBoundingClientRect();
        mouseX = event.clientX - rect.left - rect.width / 2;
        mouseY = event.clientY - rect.top - rect.height / 2;
      }
    };

    const animateScene = () => {
      if (!camera || !scene || !renderer || !material) return;

      if (animate) {
        const time = Date.now() * 0.00005;
        const h = ((360 * (1.0 + time)) % 360) / 360;
        material.color.setHSL(h, 0.5, 0.5);
      }

      camera.position.x += (mouseX - camera.position.x) * 0.01;
      camera.position.y += (-mouseY - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateScene);
    };

    const renderer = init();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    animateScene();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }

      if (material) {
        if (material.map) material.map.dispose();
        material.dispose();
      }
    };
  }, [color, particleCount, particleSize, animate, backgroundColor]);

  return (
    <div
      ref={mountRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
