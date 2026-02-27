import React, { useRef, useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { RefreshCw } from 'lucide-react';

interface SignatureFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (signature: string) => void;
}

export function SignatureField({
  label,
  required = false,
  description,
  value,
  onChange
}: SignatureFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (value && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
      img.src = value;
    }
  }, [value]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const { x, y } = getCanvasCoords(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const { x, y } = getCanvasCoords(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      onChange?.(dataUrl);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onChange?.('');
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative">
        <button
          type="button"
          onClick={clearSignature}
          className="absolute top-2 left-2 z-10 text-muted-foreground hover:text-foreground"
          aria-label="Clear signature"
        >
          <RefreshCw className="size-4" />
        </button>
        <canvas
          ref={canvasRef}
          width={400}
          height={75}
          className="rounded-md cursor-crosshair w-full"
          style={{ backgroundColor: '#F5F5EC' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <p className="text-sm text-muted-foreground text-center mt-1">Sign above</p>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
