import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase';

const MAX_SOURCE_SIZE = 12 * 1024 * 1024;
const OUTPUT_SIZE = 800;

const loadImage = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(url);
    resolve(image);
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error('Não foi possível ler esta imagem.'));
  };
  image.src = url;
});

const canvasBlob = (canvas, type, quality) => new Promise((resolve) => {
  canvas.toBlob(resolve, type, quality);
});

async function prepareImage(file) {
  if (!file?.type.startsWith('image/')) {
    throw new Error('Escolha um ficheiro de imagem válido.');
  }
  if (file.size > MAX_SOURCE_SIZE) {
    throw new Error('A imagem original não pode ultrapassar 12 MB.');
  }

  const image = await loadImage(file);
  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
  if (!sourceSize) throw new Error('A imagem selecionada está vazia.');

  const sourceX = Math.max(0, (image.naturalWidth - sourceSize) / 2);
  const sourceY = Math.max(0, (image.naturalHeight - sourceSize) / 2);
  const canvas = document.createElement('canvas');
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const context = canvas.getContext('2d', { alpha: false });
  context.fillStyle = '#111310';
  context.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE,
  );

  let blob = await canvasBlob(canvas, 'image/webp', 0.84);
  let extension = 'webp';
  if (!blob) {
    blob = await canvasBlob(canvas, 'image/jpeg', 0.88);
    extension = 'jpg';
  }
  if (!blob) throw new Error('Não foi possível preparar a imagem.');
  return { blob, extension };
}

export async function uploadMenuImage(file, productId, onProgress = () => {}) {
  const { blob, extension } = await prepareImage(file);
  const safeId = String(productId).replace(/[^a-zA-Z0-9_-]/g, '-');
  const path = `menu-images/${safeId}/${Date.now()}.${extension}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, blob, {
    contentType: blob.type,
    cacheControl: 'public,max-age=31536000,immutable',
  });

  await new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
      reject,
      resolve,
    );
  });

  return {
    imageUrl: await getDownloadURL(task.snapshot.ref),
    imagePath: path,
  };
}

export async function deleteMenuImage(path) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch (error) {
    if (error.code !== 'storage/object-not-found') throw error;
  }
}
