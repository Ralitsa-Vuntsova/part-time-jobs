import { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const Link = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (itemProps, ref) => <NavLink ref={ref} {...itemProps} role={undefined} />
);

Link.displayName = 'Link';
