export default function Button({ as: Element = 'button', children, type = 'button', className = '', ...props }) {
  return <Element {...(Element === 'button' ? { type } : {})} className={`inline-flex items-center justify-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-highlight disabled:cursor-not-allowed disabled:opacity-40 ${className}`} {...props}>{children}</Element>;
}
