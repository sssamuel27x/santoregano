import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useMenu } from '../context/MenuContext';
import { euro } from '../data/menu';
import { deleteMenuImage, uploadMenuImage } from '../services/menuImages';
import { hideBrokenImage, menuImage, showLoadedImage } from '../utils/menuImages';

const isPizzaCategory = (categoryId) => categoryId === 'traditional' || categoryId === 'sweet';
const clone = (value) => JSON.parse(JSON.stringify(value));

function newProduct(categoryId) {
  const base = {
    id: `produto-${Date.now()}`,
    name: '',
    ingredients: '',
    category: categoryId,
  };
  return isPizzaCategory(categoryId)
    ? { ...base, sizes: { small: { label: '25 cm', price: 0 }, large: { label: '37 cm', price: 0 } } }
    : { ...base, price: 0 };
}

function ProductEditor({ categoryId, product, isNew, onCancel, onSave }) {
  const [draft, setDraft] = useState(() => clone(product));
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const pizza = isPizzaCategory(categoryId);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const setField = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const setSizePrice = (size, value) => setDraft((current) => ({
    ...current,
    sizes: { ...current.sizes, [size]: { ...current.sizes[size], price: value } },
  }));

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Escolha um ficheiro de imagem válido.');
      event.target.value = '';
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError('A imagem original não pode ultrapassar 12 MB.');
      event.target.value = '';
      return;
    }
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
    setError('');
  };

  const clearSelectedImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview('');
  };

  const submit = async (event) => {
    event.preventDefault();
    const prices = pizza ? [draft.sizes.small.price, draft.sizes.large.price] : [draft.price];
    if (!draft.name.trim()) {
      setError('Dê um nome ao produto.');
      return;
    }
    if (prices.some((price) => Number(price) <= 0)) {
      setError('Os preços devem ser superiores a zero.');
      return;
    }
    if (isNew && !imageFile) {
      setError('Escolha uma imagem para o novo produto.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await onSave(
        {
          ...draft,
          name: draft.name.trim(),
          ingredients: draft.ingredients.trim(),
          ...(pizza
            ? { sizes: {
              small: { ...draft.sizes.small, price: Number(draft.sizes.small.price) },
              large: { ...draft.sizes.large, price: Number(draft.sizes.large.price) },
            } }
            : { price: Number(draft.price) }),
        },
        {
          imageFile,
          removeImage,
          onProgress: setUploadProgress,
        },
      );
    } catch (saveError) {
      setError(saveError.message || 'Não foi possível guardar o produto.');
      setBusy(false);
      setUploadProgress(0);
    }
  };

  const previewSource = imagePreview || (!removeImage ? menuImage(draft) : '');

  return (
    <div className="admin-editor-backdrop">
      <aside className="admin-editor" aria-label={isNew ? 'Adicionar produto' : 'Editar produto'}>
        <div className="admin-editor-head">
          <div>
            <p className="eyebrow">{isNew ? 'Novo produto' : 'A editar'}</p>
            <h2>{isNew ? 'Adicionar ao menu' : draft.name}</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Fechar editor">×</button>
        </div>

        <form onSubmit={submit} className="admin-editor-form">
          <div className="admin-image-editor">
            <div className="admin-image-preview">
              {previewSource && <img src={previewSource} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />}
              <span>Sem imagem</span>
            </div>
            <div className="admin-image-controls">
              <p>Imagem do produto</p>
              <small>A fotografia é recortada ao centro e otimizada automaticamente para 800 × 800 px.</small>
              <label className="admin-image-picker">
                {imageFile ? 'Escolher outra imagem' : draft.imageUrl ? 'Substituir imagem' : 'Escolher imagem'}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={selectImage} disabled={busy} />
              </label>
              {imageFile && <button type="button" onClick={clearSelectedImage} disabled={busy}>Cancelar seleção</button>}
              {!imageFile && draft.imagePath && !removeImage && (
                <button type="button" onClick={() => setRemoveImage(true)} disabled={busy}>Remover imagem carregada</button>
              )}
              {removeImage && <button type="button" onClick={() => setRemoveImage(false)} disabled={busy}>Manter imagem atual</button>}
            </div>
          </div>
          <div className="admin-form-row">
            <label>
              Nome do produto
              <input value={draft.name} onChange={(event) => setField('name', event.target.value)} placeholder="Ex.: Pizza Margherita" autoFocus />
            </label>
            <label>
              Identificador
              <input value={draft.id} disabled title="Identificador interno do produto" />
            </label>
          </div>
          <label>
            Descrição / ingredientes
            <textarea rows="4" value={draft.ingredients} onChange={(event) => setField('ingredients', event.target.value)} placeholder="Ingredientes e descrição do produto" />
          </label>

          {pizza ? (
            <div className="admin-form-row">
              <label>
                Preço 25 cm (€)
                <input type="number" min="0" step="0.01" value={draft.sizes.small.price} onChange={(event) => setSizePrice('small', event.target.value)} />
              </label>
              <label>
                Preço 37 cm (€)
                <input type="number" min="0" step="0.01" value={draft.sizes.large.price} onChange={(event) => setSizePrice('large', event.target.value)} />
              </label>
            </div>
          ) : (
            <label>
              Preço (€)
              <input type="number" min="0" step="0.01" value={draft.price} onChange={(event) => setField('price', event.target.value)} />
            </label>
          )}

          {error && <p className="admin-form-error" role="alert">{error}</p>}
          {busy && uploadProgress > 0 && (
            <div className="admin-upload-progress" aria-live="polite">
              <span style={{ width: `${uploadProgress}%` }} />
              <small>A carregar imagem… {uploadProgress}%</small>
            </div>
          )}
          <div className="admin-editor-actions">
            <button className="admin-secondary-btn" type="button" onClick={onCancel} disabled={busy}>Cancelar</button>
            <button className="admin-primary-btn" type="submit" disabled={busy}>{busy ? 'A guardar…' : 'Guardar alterações'}</button>
          </div>
        </form>
      </aside>
    </div>
  );
}

export default function AdminPanel() {
  const { authenticated, loading, logout, user } = useAdmin();
  const {
    categories,
    ready: menuReady,
    syncError,
    ensureMenu,
    addProduct,
    updateProduct,
    deleteProduct,
    resetMenu,
  } = useMenu();
  const navigate = useNavigate();
  const [active, setActive] = useState(categories[0]?.id);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [resetArmed, setResetArmed] = useState(false);
  const [notice, setNotice] = useState('');
  const category = categories.find((item) => item.id === active) || categories[0];
  const visibleItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt');
    if (!query) return category?.items || [];
    return (category?.items || []).filter((item) => (
      `${item.name} ${item.ingredients}`.toLocaleLowerCase('pt').includes(query)
    ));
  }, [category, search]);

  useEffect(() => {
    if (authenticated && menuReady) ensureMenu().catch(() => setNotice('Não foi possível criar o menu partilhado.'));
  }, [authenticated, ensureMenu, menuReady]);

  if (loading) return <section className="admin-page"><p>A verificar acesso…</p></section>;
  if (!authenticated) return <Navigate to="/admin/login" replace />;

  const flash = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2400);
  };

  const saveEditor = async (product, imageOptions) => {
    let uploadedImage = null;
    const previousImagePath = editor.product.imagePath;
    try {
      let nextProduct = { ...product };
      if (imageOptions.imageFile) {
        uploadedImage = await uploadMenuImage(
          imageOptions.imageFile,
          product.id,
          imageOptions.onProgress,
        );
        nextProduct = { ...nextProduct, ...uploadedImage };
      } else if (imageOptions.removeImage) {
        const { imageUrl, imagePath, ...withoutUploadedImage } = nextProduct;
        nextProduct = withoutUploadedImage;
      }

      if (editor.isNew) await addProduct(active, nextProduct);
      else await updateProduct(active, nextProduct);

      if (previousImagePath && (uploadedImage || imageOptions.removeImage)) {
        deleteMenuImage(previousImagePath).catch(() => {});
      }
      flash(editor.isNew ? 'Produto adicionado ao menu.' : 'Alterações guardadas.');
      setEditor(null);
    } catch (error) {
      if (uploadedImage?.imagePath) {
        deleteMenuImage(uploadedImage.imagePath).catch(() => {});
      }
      throw error;
    }
  };

  const signOut = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const confirmReset = async () => {
    if (!resetArmed) {
      setResetArmed(true);
      return;
    }
    try {
      const imagePaths = categories.flatMap((item) => item.items).map((item) => item.imagePath).filter(Boolean);
      await resetMenu();
      Promise.allSettled(imagePaths.map(deleteMenuImage));
      setResetArmed(false);
      setDeleteId(null);
      flash('Menu original reposto.');
    } catch {
      flash('Não foi possível repor o menu.');
    }
  };

  const confirmDelete = async (productId) => {
    try {
      const product = category.items.find((item) => item.id === productId);
      await deleteProduct(active, productId);
      if (product?.imagePath) deleteMenuImage(product.imagePath).catch(() => {});
      setDeleteId(null);
      flash('Produto eliminado.');
    } catch {
      flash('Não foi possível eliminar o produto.');
    }
  };

  return (
    <section className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Sant' Orégano</p>
          <h1>Painel do menu</h1>
          <p>Edite produtos e preços. As alterações aparecem imediatamente no menu dos clientes.</p>
          <small className="admin-account-pill">Ligado como {user?.email}</small>
        </div>
        <div className="admin-header-actions">
          <Link className="admin-secondary-btn" to="/pizzas">Ver menu</Link>
          <button className="admin-secondary-btn" type="button" onClick={signOut}>Terminar sessão</button>
        </div>
      </header>

      {syncError && <p className="admin-sync-error" role="alert">{syncError}</p>}

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p className="admin-sidebar-label">Categorias</p>
          <div className="admin-category-list">
            {categories.map((item) => (
              <button
                type="button"
                className={active === item.id ? 'active' : ''}
                key={item.id}
                onClick={() => { setActive(item.id); setDeleteId(null); }}
              >
                <span>{item.icon}</span>
                <b>{item.short}</b>
                <small>{item.items.length}</small>
              </button>
            ))}
          </div>
          <button className={`admin-reset-btn ${resetArmed ? 'armed' : ''}`} type="button" onClick={confirmReset}>
            {resetArmed ? 'Confirmar reposição' : 'Repor menu original'}
          </button>
          {resetArmed && <button className="admin-reset-cancel" type="button" onClick={() => setResetArmed(false)}>Cancelar</button>}
        </aside>

        <div className="admin-content">
          <div className="admin-toolbar">
            <div>
              <p className="eyebrow">{category.eyebrow}</p>
              <h2>{category.label}</h2>
            </div>
            <div className="admin-toolbar-actions">
              <label className="admin-search">
                <span aria-hidden="true">⌕</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Procurar produto" aria-label="Procurar produto" />
              </label>
              <button className="admin-primary-btn" type="button" onClick={() => setEditor({ isNew: true, product: newProduct(active) })}>＋ Adicionar produto</button>
            </div>
          </div>

          <div className="admin-product-list">
            {visibleItems.map((product) => (
              <article className="admin-product" key={product.id}>
                <div className="admin-product-image">
                  <img src={menuImage(product)} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />
                  <span>Sem imagem</span>
                </div>
                <div className="admin-product-copy">
                  <h3>{product.name}</h3>
                  <p>{product.ingredients || 'Sem descrição.'}</p>
                </div>
                <div className="admin-product-price">
                  {product.sizes
                    ? <><span>25 cm · {euro(product.sizes.small.price)}</span><span>37 cm · {euro(product.sizes.large.price)}</span></>
                    : <strong>{euro(product.price)}</strong>}
                </div>
                <div className="admin-product-actions">
                  <button type="button" onClick={() => setEditor({ isNew: false, product })}>Editar</button>
                  {deleteId === product.id ? (
                    <div className="admin-delete-confirm">
                      <button type="button" onClick={() => confirmDelete(product.id)}>Confirmar</button>
                      <button type="button" onClick={() => setDeleteId(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <button className="danger" type="button" onClick={() => setDeleteId(product.id)}>Eliminar</button>
                  )}
                </div>
              </article>
            ))}
            {!visibleItems.length && (
              <div className="admin-empty">
                <span>⌕</span>
                <p>Nenhum produto encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {editor && (
        <ProductEditor
          key={`${editor.product.id}-${editor.isNew}`}
          categoryId={active}
          product={editor.product}
          isNew={editor.isNew}
          onCancel={() => setEditor(null)}
          onSave={saveEditor}
        />
      )}
      {notice && <div className="admin-notice" role="status">✓ {notice}</div>}
    </section>
  );
}
