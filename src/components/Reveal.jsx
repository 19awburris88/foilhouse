import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Reveal({
  as: Tag = 'section',
  className = '',
  children,
  delay = 0,
  ...rest
}) {
  const [ref, visible] = useScrollAnimation(0.08);
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
