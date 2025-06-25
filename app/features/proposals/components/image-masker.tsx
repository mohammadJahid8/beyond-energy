"use client";

import type React from "react";

import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Eraser, Download, RotateCcw, Undo, Redo } from "lucide-react";
import { FileUploader } from "@/app/components/global/file-uploader";

export default function ImageMasker({
  setOriginalImage,
  setMaskImage,
}: {
  setOriginalImage: (image: string) => void;
  setMaskImage: (image: string) => void;
}) {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  // console.log("🚀 ~ image:", image);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState([20]);
  const [isErasing, setIsErasing] = useState(false);
  const [maskHistory, setMaskHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updatePreview = useCallback(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!drawingCanvas || !maskCanvas || !previewCanvas) return;

    const drawingCtx = drawingCanvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    const previewCtx = previewCanvas.getContext("2d");

    if (!drawingCtx || !maskCtx || !previewCtx) return;

    // Clear preview canvas
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    // Get image and mask data
    const imageData = drawingCtx.getImageData(
      0,
      0,
      drawingCanvas.width,
      drawingCanvas.height
    );
    const maskData = maskCtx.getImageData(
      0,
      0,
      maskCanvas.width,
      maskCanvas.height
    );

    // Apply mask to image
    const resultData = previewCtx.createImageData(
      drawingCanvas.width,
      drawingCanvas.height
    );

    for (let i = 0; i < imageData.data.length; i += 4) {
      const maskAlpha = maskData.data[i + 3] / 255;

      if (maskAlpha > 0) {
        // Masked area - make transparent
        resultData.data[i] = imageData.data[i]; // R
        resultData.data[i + 1] = imageData.data[i + 1]; // G
        resultData.data[i + 2] = imageData.data[i + 2]; // B
        resultData.data[i + 3] = imageData.data[i + 3] * (1 - maskAlpha); // A
      } else {
        // Unmasked area - keep original
        resultData.data[i] = imageData.data[i];
        resultData.data[i + 1] = imageData.data[i + 1];
        resultData.data[i + 2] = imageData.data[i + 2];
        resultData.data[i + 3] = imageData.data[i + 3];
      }
    }

    previewCtx.putImageData(resultData, 0, 0);
  }, []);

  const saveToHistory = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;

    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    const imageData = maskCtx.getImageData(
      0,
      0,
      maskCanvas.width,
      maskCanvas.height
    );

    setMaskHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      return newHistory.slice(-20); // Keep only last 20 states
    });

    setHistoryIndex((prev) => Math.min(prev + 1, 19));
  }, [historyIndex]);

  const setupCanvases = useCallback(
    (img: HTMLImageElement) => {
      // Add a small delay to ensure refs are available
      setTimeout(() => {
        const originalCanvas = originalCanvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;
        const maskCanvas = maskCanvasRef.current;
        const previewCanvas = previewCanvasRef.current;

        if (
          !originalCanvas ||
          !drawingCanvas ||
          !maskCanvas ||
          !previewCanvas
        ) {
          console.error("Canvas refs not available, retrying...");
          // Retry after a longer delay
          setTimeout(() => setupCanvases(img), 100);
          return;
        }

        try {
          // Calculate canvas dimensions to fit the container
          const maxWidth = 400;
          const maxHeight = 300;
          const scale = Math.min(
            maxWidth / img.width,
            maxHeight / img.height,
            1
          );

          // Actual image dimensions when scaled
          const scaledImageWidth = Math.floor(img.width * scale);
          const scaledImageHeight = Math.floor(img.height * scale);

          // Canvas dimensions (fixed size for consistent layout)
          const canvasWidth = maxWidth;
          const canvasHeight = maxHeight;

          // Calculate image position within canvas (centered)
          const imageX = Math.floor((canvasWidth - scaledImageWidth) / 2);
          const imageY = Math.floor((canvasHeight - scaledImageHeight) / 2);

          console.log("Canvas dimensions:", canvasWidth, "x", canvasHeight);
          console.log(
            "Image dimensions:",
            scaledImageWidth,
            "x",
            scaledImageHeight
          );
          console.log("Image position:", imageX, imageY);

          setCanvasDimensions({ width: canvasWidth, height: canvasHeight });
          setOriginalDimensions({ width: img.width, height: img.height });
          setImagePosition({
            x: imageX,
            y: imageY,
            width: scaledImageWidth,
            height: scaledImageHeight,
          });

          // Set canvas dimensions and styles
          [originalCanvas, drawingCanvas, maskCanvas, previewCanvas].forEach(
            (canvas) => {
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
              canvas.style.width = `${canvasWidth}px`;
              canvas.style.height = `${canvasHeight}px`;
              canvas.style.display = "block";
            }
          );

          // Draw original image on original canvas (centered)
          const originalCtx = originalCanvas.getContext("2d");
          if (originalCtx) {
            originalCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            originalCtx.drawImage(
              img,
              imageX,
              imageY,
              scaledImageWidth,
              scaledImageHeight
            );
            console.log("Original image drawn");
          }

          // Draw original image on drawing canvas (centered)
          const drawingCtx = drawingCanvas.getContext("2d");
          if (drawingCtx) {
            drawingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawingCtx.drawImage(
              img,
              imageX,
              imageY,
              scaledImageWidth,
              scaledImageHeight
            );
            console.log("Drawing canvas setup complete");
          }

          // Initialize mask canvas with transparent background
          const maskCtx = maskCanvas.getContext("2d");
          if (maskCtx) {
            maskCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            console.log("Mask canvas initialized");

            // Save initial empty mask state
            setTimeout(() => {
              saveToHistory();
            }, 50);
          }

          // Update preview
          setTimeout(() => {
            updatePreview();
          }, 100);
        } catch (error) {
          console.error("Error setting up canvases:", error);
        }
      }, 50);
    },
    [saveToHistory, updatePreview]
  );

  const handleImageUpload = useCallback(
    (value: File[]) => {
      console.log("🚀 ~ value:", value);
      const file = value[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Reset previous state
      setImage(null);
      setMaskHistory([]);
      setHistoryIndex(-1);

      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS issues

      img.onerror = (error) => {
        console.error("Image loading error:", error);
        alert(
          "Failed to load image. Please try a different image format (JPG, PNG, WebP)."
        );
      };

      // Create object URL and set as image source
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;

      setOriginalImage(file);
      console.log("file", file);

      // Set up image load handler
      img.onload = () => {
        console.log("Image loaded successfully:", img.width, "x", img.height);
        setImage(img);
        setupCanvases(img);
        URL.revokeObjectURL(imageUrl); // Clean up memory
      };
    },
    [setupCanvases]
  );

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;

    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    maskCtx.putImageData(maskHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
    updatePreview();
  }, [historyIndex, maskHistory, updatePreview]);

  const redo = useCallback(() => {
    if (historyIndex >= maskHistory.length - 1) return;

    const newIndex = historyIndex + 1;
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;

    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    maskCtx.putImageData(maskHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
    updatePreview();
  }, [historyIndex, maskHistory, updatePreview]);

  const getMousePos = useCallback(
    (canvas: HTMLCanvasElement, e: React.MouseEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const isPointInImage = useCallback(
    (x: number, y: number) => {
      return (
        x >= imagePosition.x &&
        x <= imagePosition.x + imagePosition.width &&
        y >= imagePosition.y &&
        y <= imagePosition.y + imagePosition.height
      );
    },
    [imagePosition]
  );

  const drawOnCanvas = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const maskCanvas = maskCanvasRef.current;
      if (!maskCanvas) return;

      const ctx = maskCanvas.getContext("2d");
      if (!ctx) return;

      const pos = getMousePos(maskCanvas, e);

      // Only allow drawing within the image bounds
      if (!isPointInImage(pos.x, pos.y)) {
        return;
      }

      ctx.globalCompositeOperation = isErasing
        ? "destination-out"
        : "source-over";
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize[0] / 2, 0, Math.PI * 2);
      ctx.fill();

      updatePreview();
    },
    [brushSize, isErasing, getMousePos, updatePreview, isPointInImage]
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDrawing(true);
      drawOnCanvas(e);
    },
    [drawOnCanvas]
  );

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  }, [isDrawing, saveToHistory]);

  const clearMask = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;

    const ctx = maskCanvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    saveToHistory();
    updatePreview();
  }, [saveToHistory, updatePreview]);

  const downloadMaskedImage = useCallback(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!drawingCanvas || !maskCanvas || !image) return;

    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    exportCanvas.width = originalDimensions.width;
    exportCanvas.height = originalDimensions.height;

    // Draw the original image at full resolution
    exportCtx.drawImage(
      image,
      0,
      0,
      originalDimensions.width,
      originalDimensions.height
    );

    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    // Extract mask data
    const maskImageData = maskCtx.getImageData(
      imagePosition.x,
      imagePosition.y,
      imagePosition.width,
      imagePosition.height
    );

    // Scale mask to original image size
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = imagePosition.width;
    tempCanvas.height = imagePosition.height;
    tempCtx?.putImageData(maskImageData, 0, 0);

    const scaledMaskCanvas = document.createElement("canvas");
    const scaledMaskCtx = scaledMaskCanvas.getContext("2d");
    scaledMaskCanvas.width = originalDimensions.width;
    scaledMaskCanvas.height = originalDimensions.height;

    if (!scaledMaskCtx) return;

    // Better scaling: source + destination rects
    scaledMaskCtx.drawImage(
      tempCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
      0,
      0,
      scaledMaskCanvas.width,
      scaledMaskCanvas.height
    );

    const fullResImageData = exportCtx.getImageData(
      0,
      0,
      originalDimensions.width,
      originalDimensions.height
    );
    const fullResMaskData = scaledMaskCtx.getImageData(
      0,
      0,
      originalDimensions.width,
      originalDimensions.height
    );

    // Alpha masking
    for (let i = 0; i < fullResImageData.data.length; i += 4) {
      const maskAlpha = fullResMaskData.data[i + 3] / 255;
      if (maskAlpha > 0) {
        fullResImageData.data[i + 3] *= 1 - maskAlpha;
      }
    }

    exportCtx.putImageData(fullResImageData, 0, 0);

    // Use toBlob for full-fidelity preview + download
    exportCanvas.toBlob(
      (blob) => {
        if (!blob) return;

        // Instead of setting blobUrl, set a File object
        const file = new File([blob], "masked-image-hq.png", {
          type: "image/png",
        });
        setMaskImage(file);

        // If you want to preview, you can still create a blobUrl if needed
        // const blobUrl = URL.createObjectURL(blob);
        // window.open(blobUrl, "_blank");
      },
      "image/png",
      1.0
    );
  }, [image, originalDimensions, imagePosition]);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        drawOnCanvas(e);
      }
    };

    const handleMouseUp = () => {
      stopDrawing();
    };

    if (isDrawing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing, drawOnCanvas, stopDrawing]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image Masker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUploader
            value={[]}
            onValueChange={(value) => handleImageUpload(value)}
            maxFiles={1}
            maxSize={4 * 1024 * 1024}
            // disabled={loading}
            // progresses={progresses}
            // pass the onUpload function here for direct upload
            // onUpload={uploadFiles}
            // disabled={isUploading}
          />

          {/* Controls */}
          {image && (
            <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Label htmlFor="brush-size">Brush Size:</Label>
                <div className="w-32">
                  <Slider
                    id="brush-size"
                    min={5}
                    max={50}
                    step={1}
                    value={brushSize}
                    onValueChange={setBrushSize}
                  />
                </div>
                <span className="text-sm text-gray-600">{brushSize[0]}px</span>
              </div>

              <Button
                variant={isErasing ? "default" : "outline"}
                onClick={() => setIsErasing(!isErasing)}
                className="flex items-center gap-2"
              >
                <Eraser className="w-4 h-4" />
                {isErasing ? "Erasing" : "Drawing"}
              </Button>

              <Button
                variant="outline"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="flex items-center gap-2"
              >
                <Undo className="w-4 h-4" />
                Undo
              </Button>

              <Button
                variant="outline"
                onClick={redo}
                disabled={historyIndex >= maskHistory.length - 1}
                className="flex items-center gap-2"
              >
                <Redo className="w-4 h-4" />
                Redo
              </Button>

              <Button
                variant="outline"
                onClick={clearMask}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Mask
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={downloadMaskedImage}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Get Masked Image
              </Button>
            </div>
          )}

          {/* Canvas Area */}
          {image && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Original Image */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Original Image</h3>
                <div className="border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <canvas
                    ref={originalCanvasRef}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              {/* Mask Drawing Area */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Draw Mask (Red = Masked)
                </h3>
                <div className="border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
                  <canvas
                    ref={drawingCanvasRef}
                    className="absolute inset-0 max-w-full h-auto"
                  />
                  <canvas
                    ref={maskCanvasRef}
                    className="relative max-w-full h-auto cursor-crosshair z-10"
                    onMouseDown={startDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                      mixBlendMode: "multiply",
                      touchAction: "none",
                    }}
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Masked Result</h3>
                <div
                  className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                >
                  <canvas
                    ref={previewCanvasRef}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {!image && (
            <div className="text-center py-12 text-gray-500">
              Upload an image to start masking
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
