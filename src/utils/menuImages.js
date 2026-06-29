export const menuImage = (product) => (
  product?.imageUrl || `/menu-images/${product?.productId || product?.id}.jpg`
);

export const hideBrokenImage = (event) => {
  event.currentTarget.hidden = true;
  event.currentTarget.parentElement?.classList.add('image-missing');
};

export const showLoadedImage = (event) => {
  event.currentTarget.hidden = false;
  event.currentTarget.parentElement?.classList.remove('image-missing');
};
