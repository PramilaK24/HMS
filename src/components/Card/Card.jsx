export default function Card({ as: Element = 'div', children, className = '', ...props }) {
  return (
    <Element className={`rounded-lg border border-text-accent/60 bg-[#08170f] px-5 py-7 shadow-[inset_0_0_14px_#00a04812] transition-colors hover:border-text-highlight/70 ${className}`} {...props}>
      {children}
    </Element>
  );
}
