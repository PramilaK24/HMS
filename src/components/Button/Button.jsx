export default function Button({ children, type = 'button', className = '', ...props }) {
  return <button type={type} className={`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-highlight disabled:cursor-not-allowed ${className}`} {...props}>{children}</button>;
}
