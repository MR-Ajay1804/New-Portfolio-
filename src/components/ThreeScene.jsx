import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Soft radial particle glow sprite
function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 0, 127, 0.85)"); // Vibrant Pink
  gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.2)");  // Cyan outer
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export default function ThreeScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. High-Performance Renderer ──────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    // Cap pixel ratio to 1.5 to prevent high-DPI GPUs from lagging
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── 2. Scene & Subtle Fog ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070512, 0.015);

    // ── 3. Camera (Smooth 360° Spherical Inertia) ─────────────────────────
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 24);

    let theta = 0, phi = Math.PI / 2;
    let targetTheta = 0, targetPhi = Math.PI / 2;
    let scrollProgress = 0;

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetTheta = nx * Math.PI * 0.4;
      targetPhi = Math.PI / 2 - ny * (Math.PI * 0.16);
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── 4. Vibrant Lighting ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a0b2e, 2.0));

    const keyLight = new THREE.DirectionalLight(0xff007f, 2.8); // Pink
    keyLight.position.set(20, 25, 30);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.2); // Cyan
    fillLight.position.set(-25, -15, -10);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffaa00, 2.2, 50); // Gold
    rimLight.position.set(0, -10, 15);
    scene.add(rimLight);

    // ── 5. Kinetic 3D Geometric Sculpture ─────────────────────────────────
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);

    const innerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1a053a,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x3a005c,
      emissiveIntensity: 0.35,
      flatShading: true
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    const wireGeo = new THREE.IcosahedronGeometry(4.6, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      emissive: 0xff007f,
      emissiveIntensity: 0.7
    });
    const wireCore = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireCore);

    const createGyroRing = (radius, tube, color, rotX, rotY) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 12, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(rotX, rotY, 0);
      return ring;
    };

    const ring1 = createGyroRing(6.2, 0.04, 0xffaa00, Math.PI / 3, 0);
    const ring2 = createGyroRing(7.2, 0.035, 0x00f0ff, -Math.PI / 4, Math.PI / 6);
    const ring3 = createGyroRing(8.2, 0.03, 0xff007f, Math.PI / 6, -Math.PI / 4);
    coreGroup.add(ring1, ring2, ring3);

    // Orbiting Satellites
    const nodeCount = 12;
    const nodeGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5,
      roughness: 0.1
    });

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const orbitR = 5.6 + (i % 3) * 1.3;
      const speed = 0.5 + (i % 4) * 0.2;
      const angleOffset = (i / nodeCount) * Math.PI * 2;
      mesh.userData = { orbitR, speed, angleOffset, yOffset: (Math.random() - 0.5) * 3 };
      coreGroup.add(mesh);
      nodes.push(mesh);
    }

    scene.add(coreGroup);

    // ── 6. Lightweight Ambient Wave Particle Matrix ───────────────────────
    const particleTex = makeGlowTexture();
    const GRID_X = prefersReducedMotion ? 20 : 32;
    const GRID_Z = prefersReducedMotion ? 20 : 32;
    const TOTAL_PARTICLES = GRID_X * GRID_Z;

    const gridPositions = new Float32Array(TOTAL_PARTICLES * 3);
    let idx = 0;
    const spacing = 2.0;
    const offsetX = (GRID_X * spacing) / 2;
    const offsetZ = (GRID_Z * spacing) / 2;

    for (let ix = 0; ix < GRID_X; ix++) {
      for (let iz = 0; iz < GRID_Z; iz++) {
        gridPositions[idx * 3] = ix * spacing - offsetX;
        gridPositions[idx * 3 + 1] = -10;
        gridPositions[idx * 3 + 2] = iz * spacing - offsetZ - 8;
        idx++;
      }
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute("position", new THREE.BufferAttribute(gridPositions, 3));

    const gridMat = new THREE.PointsMaterial({
      size: 0.55,
      color: 0xe848b5,
      map: particleTex,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const gridMesh = new THREE.Points(gridGeo, gridMat);
    scene.add(gridMesh);

    // ── 7. Stardust Field ─────────────────────────────────────────────────
    const starCount = prefersReducedMotion ? 150 : 400;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 140;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.45,
      color: 0xffcc00,
      map: particleTex,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── 8. Window Resize Handler ──────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── 9. Ultra-Smooth 60fps Animation Loop (Zero CPU Stalls) ────────────
    let rafId;
    let clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      theta += (targetTheta - theta) * 0.05;
      phi += (targetPhi - phi) * 0.05;
      phi = Math.max(0.7, Math.min(Math.PI - 0.7, phi));

      const camZ = 24 - scrollProgress * 12;
      const camY = scrollProgress * -4;
      const camX = Math.sin(scrollProgress * Math.PI) * 4;

      const lookTarget = new THREE.Vector3(
        Math.sin(phi) * Math.sin(theta) * 10,
        Math.cos(phi) * 8,
        -15
      );

      camera.position.set(
        camX + Math.sin(theta) * 3.5,
        camY + (Math.PI / 2 - phi) * 2.5,
        camZ
      );
      camera.lookAt(lookTarget);

      // Core sculpture rotation & gentle float
      coreGroup.rotation.y = elapsed * 0.14 + scrollProgress * Math.PI;
      coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      coreGroup.position.y = Math.sin(elapsed * 0.7) * 0.6;
      
      const pulseScale = 1 + Math.sin(elapsed * 2.0) * 0.025;
      coreGroup.scale.set(pulseScale, pulseScale, pulseScale);

      innerCore.rotation.y = -elapsed * 0.2;
      wireCore.rotation.y = elapsed * 0.25;
      wireCore.rotation.z = elapsed * 0.15;

      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.25;
      ring3.rotation.z = elapsed * 0.2;

      // Orbiting satellites
      nodes.forEach((node) => {
        const { orbitR, speed, angleOffset, yOffset } = node.userData;
        const currentAngle = elapsed * speed + angleOffset;
        node.position.set(
          Math.cos(currentAngle) * orbitR,
          Math.sin(currentAngle * 0.8) * 1.5 + yOffset,
          Math.sin(currentAngle) * orbitR
        );
      });

      // Wave motion on grid mesh without CPU buffer overhead
      gridMesh.position.y = Math.sin(elapsed * 0.8) * 0.8;
      gridMesh.rotation.y = elapsed * 0.02;

      starField.rotation.y = elapsed * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas-container" aria-hidden="true" />;
}
