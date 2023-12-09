"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "./ClassNames";

const NavLink = ({
  children,
  exact = false,
  href,
  activeClassName,
  ...props
}) => {
  const pathName = usePathname();
  const active = exact ? pathName === href : pathName.startsWith(href);
  const classes = classNames(props.className, active && activeClassName);
  if (classes) {
    props.className = classes;
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
