"use client";

import { sidebarLinks } from '@/constants/links'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/** Navigation for mobile version */
const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isUserLogIn = true;

  return (
    <section className="footer">
      <div className="footer-container">
        {sidebarLinks.map((link) => {
          // link route length > 1 => 排除Home
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`footer-link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {/* 確保底下label只出現一個單字 */}
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Footer
