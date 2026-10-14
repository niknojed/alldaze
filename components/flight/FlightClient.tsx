'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    THREE?: unknown;
    __adwFlightStarted?: boolean;
  }
}

/**
 * Boots the homepage behaviour (hero review tool, Talon, lead form, day/night
 * sky and products shaders) once the server-rendered markup is in the DOM.
 * Three.js loads first because the shader scenes read it from window.THREE.
 */
export default function FlightClient() {
  useEffect(() => {
    if (window.__adwFlightStarted) return; // StrictMode runs effects twice in dev
    window.__adwFlightStarted = true;
    let cancelled = false;
    (async () => {
      try {
        const THREE = await import('three');
        window.THREE = THREE;
      } catch (err) {
        // The page still works without WebGL scenes; log and continue.
        console.error('[flight] three.js failed to load', err);
      }
      if (cancelled) return;
      try {
        const { default: initFlight } = await import('./runtime');
        initFlight();
      } catch (err) {
        console.error('[flight] runtime failed to start', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
