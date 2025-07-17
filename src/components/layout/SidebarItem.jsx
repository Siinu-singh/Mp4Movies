
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SidebarItem({
  icon: Icon,
  text,
  href,
  isActive,
  isExpanded,
  onClick,
  isSubItem = false,
  hasSubMenu = false,
  isSubMenuOpen = false,
  className = '',
}) {
  const itemContent = (
    <motion.div
      className={cn(
        "flex items-center h-10 px-3 rounded-md cursor-pointer transition-colors",
        "text-muted-foreground hover:text-primary hover:bg-primary/10",
        isActive && !isSubItem && "bg-primary/10 text-primary font-medium",
        isActive && isSubItem && "text-primary font-medium",
        isSubItem && "pl-8 pr-3 text-sm",
        className
      )}
      whileHover={{ backgroundColor: isActive ? 'hsl(var(--primary)/0.15)' : 'hsl(var(--primary)/0.1)' }}
      title={!isExpanded ? text : ''}
      onClick={onClick}
    >
      {Icon && <Icon size={20} className="shrink-0" />}
      <motion.span
        className={cn("ml-3 whitespace-nowrap overflow-hidden", isSubItem ? "text-sm" : "text-sm")}
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? 'auto' : 0,
          marginLeft: isExpanded && Icon ? '0.75rem' : '0rem',
        }}
        transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
      >
        {text}
      </motion.span>
      {hasSubMenu && isExpanded && (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("ml-auto shrink-0 transition-transform duration-200", isSubMenuOpen && "rotate-180")}
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {itemContent}
      </Link>
    );
  }

  return itemContent;
}
