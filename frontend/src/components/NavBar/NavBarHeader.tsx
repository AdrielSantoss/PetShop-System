import { NavBarHeaderProps } from '../../models/components/Navbar';

export function NavBarHeader({ children }: NavBarHeaderProps) {
  return (
    <div className="offcanvas-header">
      {children}
      <button
        type="button"
        className="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
  );
}
