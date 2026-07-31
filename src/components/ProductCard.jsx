function resolveAssetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.startsWith("/") ? path.slice(1) : path}`;
}

export default function ProductCard({ product, formatPrice, onConfigure, t }) {
  const visualImage = product.image || product.categoryImage;

  return (
    <article className={`menu-card accent-${product.categoryColor}`}>
      <div className="menu-card__visual">
        {visualImage ? (
          <img src={resolveAssetUrl(visualImage)} alt="" loading="lazy" />
        ) : (
          <span>{product.categoryIcon}</span>
        )}
      </div>

      <div className="menu-card__body">
        <div>
          <span className="category-label">{product.categoryName}</span>
          <h3>{product.name}</h3>
          {product.description && <p>{product.description}</p>}
        </div>

        <div className="menu-card__bottom">
          <strong>{product.priceOnRequest ? t.priceOnRequest : `${t.from} ${formatPrice(product.basePrice)}`}</strong>
          <button className="configure-button" type="button" onClick={onConfigure}>
            {product.priceOnRequest ? t.viewDetails : t.add}
          </button>
        </div>
      </div>
    </article>
  );
}
