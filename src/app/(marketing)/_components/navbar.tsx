'use client';

import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ChevronRightIcon } from 'lucide-react';

import { constants, features } from '@/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/primitives/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/primitives/navigation-menu';

const ListItem = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            'z-50 flex select-none items-start gap-3 rounded-md border border-transparent px-4 py-3 leading-none no-underline outline-none transition-colors hover:border-gray-element-border hover:bg-gray-element hover:text-gray-foreground focus:border-gray-element-border focus:bg-gray-element focus:text-gray-foreground',
            className,
          )}
          {...props}
        >
          <div className="size-[18px]">{icon}</div>
          <div className="space-y-2">
            <div className="text-sm font-medium leading-none text-foreground">
              {title}
            </div>
            <p className="line-clamp-2 text-xs leading-normal">{children}</p>
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'sticky inset-x-0 top-0 z-50 w-full border-b border-transparent bg-transparent py-4 transition-colors duration-500',
        scroll && 'border-gray-element bg-background/85 backdrop-blur-md',
      )}
    >
      <div className="container flex items-center justify-between transition-all">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" width={35} height={35} alt="Noodle Logo" />
          <span>Noodle</span>
        </Link>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="absolute right-36 top-1/2 z-30 size-20 -translate-y-1/2 rounded-full bg-pink opacity-50 blur-3xl" />
                <ul className="grid gap-3 p-3 md:w-[450px] lg:w-[550px] lg:grid-cols-[1fr_0.85fr]">
                  <div className="flex flex-col gap-3">
                    {features(18).map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        icon={feature.icon}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </div>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="flex size-full select-none flex-col justify-end rounded-md border border-gray-element-border bg-gray-element/50 px-6 py-3 no-underline outline-none backdrop-blur-lg transition-colors hover:bg-gray-element/75 focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src="/logo.svg"
                          width={35}
                          height={35}
                          alt="Noodle Logo"
                        />
                        <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                          {constants.shortName}
                        </div>
                        <p className="text-sm leading-snug text-foreground-muted">
                          Helping students stay productive and on top of their
                          work.
                        </p>

                        <a
                          href={constants.github_repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-6 flex items-center gap-2 py-2 text-sm transition-colors hover:text-gray-foreground"
                        >
                          Contribute <ChevronRightIcon size={13} />
                        </a>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={constants.github_repo}
                target="_blank"
                rel="noreferrer noopener"
                className={navigationMenuTriggerStyle()}
              >
                Contribute
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={constants.discord}
                target="_blank"
                rel="noreferrer noopener"
                className={navigationMenuTriggerStyle()}
              >
                Discord
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Button size="sm" asChild>
            <Link href="/sign-in">
              Dashboard <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
