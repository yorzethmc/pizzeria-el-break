export default function CartFab({ itemCount, label, onClick }) {
  return (
    <button type="button" className="cart-fab" onClick={onClick}>
      <span aria-hidden="true">🛒</span>
      <strong>{label}</strong>
      {itemCount > 0 && <span className="cart-fab__badge">{itemCount}</span>}
    </button>
  );
}
