'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImage: Blob) => void;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
  title?: string;
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  aspectRatio = 1,
  cropShape = 'rect',
  title = 'Adjust Photo'
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (location: Point) => {
    setCrop(location);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg', 0.95);
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                bounce: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                borderRadius: 32,
                padding: 30,
                maxWidth: 700,
                width: '100%',
                boxShadow: '0 25px 70px rgba(107, 68, 35, 0.5)',
                border: '3px solid #f5c77e',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 20
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#6b4423',
                  textShadow: '2px 2px 4px rgba(245, 199, 126, 0.3)'
                }}>
                  {title}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{
                    background: 'linear-gradient(135deg, #ffe9c9, #ffd89b)',
                    border: '2px solid #f5c77e',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: '#6b4423',
                    padding: '6px 10px',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(245, 199, 126, 0.4)'
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Crop Area */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 400,
                background: '#000',
                borderRadius: 20,
                overflow: 'hidden',
                border: '3px solid #f5c77e',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
              }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  cropShape={cropShape}
                  onCropChange={onCropChange}
                  onZoomChange={onZoomChange}
                  onCropComplete={onCropCompleteHandler}
                  style={{
                    containerStyle: {
                      borderRadius: 20
                    }
                  }}
                />
              </div>

              {/* Instructions */}
              <div style={{
                fontSize: 14,
                color: '#8b6f47',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                💡 Drag to reposition • Pinch or scroll to zoom
              </div>

              {/* Zoom Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <span style={{ fontSize: 20 }}>🔍</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 10,
                    outline: 'none',
                    cursor: 'pointer',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    background: '#f0e6dc'
                  }}
                  className="zoom-slider"
                />
                <span style={{ fontSize: 20 }}>🔍+</span>
                <style jsx>{`
                  .zoom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ffd89b, #f5c77e);
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(245, 199, 126, 0.5);
                  }
                  
                  .zoom-slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ffd89b, #f5c77e);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 8px rgba(245, 199, 126, 0.5);
                  }
                  
                  .zoom-slider::-webkit-slider-runnable-track {
                    height: 8px;
                    border-radius: 10px;
                    background: linear-gradient(to right, #ffd89b, #f5c77e);
                  }
                  
                  .zoom-slider::-moz-range-track {
                    height: 8px;
                    border-radius: 10px;
                    background: linear-gradient(to right, #ffd89b, #f5c77e);
                  }
                `}</style>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(245, 199, 126, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                    color: '#6b4423',
                    border: 'none',
                    borderRadius: 18,
                    padding: '16px 24px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    boxShadow: '0 6px 16px rgba(245, 199, 126, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✂️ Apply Crop
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(212, 165, 116, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    color: '#6b4423',
                    border: '2px solid #f5c77e',
                    borderRadius: 18,
                    padding: '16px 24px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
