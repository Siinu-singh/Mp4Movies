import { cn } from '@/lib/utils';

export default function SectionTitle({ children, className }) {
  return (
    <h2 className={cn(
      "text-2xl sm:text-3xl font-bold font-headline mb-6 pb-2",
      "bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent",
      className
    )}>
      {children}
    </h2>
  );
}

