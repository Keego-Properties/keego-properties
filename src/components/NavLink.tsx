"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, end, ...props }, ref) => {
    const pathname = usePathname();
    const hrefString = typeof href === "string" ? href : (href.pathname ?? "");
    const isActive = end
      ? pathname === hrefString
      : pathname === hrefString || pathname.startsWith(`${hrefString}/`);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
