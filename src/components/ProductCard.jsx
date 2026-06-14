export default function ProductCard({ product, formatPrice, onConfigure }) {
  return (
    <article className={`menu-card accent-${product.categoryColor}`}>
      <div className="menu-card__visual">
        {product.categoryImage && <img src={`${import.meta.env.BASE_URL}${product.categoryImage.startsWith('/') ? product.categoryImage.slice(1) : product.categoryImage}`} alt="" loading="lazy" />}
        <span>{product.categoryIcon}</span>
      </div>

      <div className="menu-card__body">
        <div>
          <span className="category-label">{product.categoryName}</span>
          <h3>{product.name}</h3>
          {product.description && <p>{product.description}</p>}
        </div>

        <div className="menu-card__bottom">
          <strong>Desde {formatPrice(product.basePrice)}</strong>
          <button className="configure-button" type="button" onClick={onConfigure}>
            Configurar pedido
          </button>
        </div>
      </div>
    </article>
  );
}
