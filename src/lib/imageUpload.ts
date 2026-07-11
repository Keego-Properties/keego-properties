import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

export type ImageUploadPreset = "logo" | "card" | "hero" | "gallery";

const PRESETS: Record<
  ImageUploadPreset,
  { maxWidth: number; maxHeight: number; quality: number }
> = {
  logo: { maxWidth: 512, maxHeight: 512, quality: 0.85 },
  card: { maxWidth: 1400, maxHeight: 1400, quality: 0.82 },
  hero: { maxWidth: 1920, maxHeight: 1920, quality: 0.85 },
  gallery: { maxWidth: 1920, maxHeight: 1920, quality: 0.82 },
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read image: ${file.name}`));
    };

    image.src = url;
  });
}

function getOutputDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) {
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height };
  }

  const scale = Math.min(maxWidth / width, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function canvasToWebP(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("WebP conversion failed"));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });
}

export async function optimizeImageToWebP(
  file: File,
  preset: ImageUploadPreset = "card",
): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded");
  }

  const { maxWidth, maxHeight, quality } = PRESETS[preset];
  const image = await loadImage(file);
  const { width, height } = getOutputDimensions(
    image.naturalWidth,
    image.naturalHeight,
    maxWidth,
    maxHeight,
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not prepare image canvas");
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToWebP(canvas, quality);
  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";

  return new File([blob], `${baseName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}

export async function uploadOptimizedImage(
  file: File,
  folder: string,
  preset: ImageUploadPreset = "card",
): Promise<string> {
  const optimized = await optimizeImageToWebP(file, preset);
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.webp`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, optimized, {
    contentType: "image/webp",
  });

  return getDownloadURL(storageRef);
}

export async function uploadOptimizedImages(
  files: File[],
  folder: string,
  preset: ImageUploadPreset = "card",
): Promise<string[]> {
  return Promise.all(files.map((file) => uploadOptimizedImage(file, folder, preset)));
}
