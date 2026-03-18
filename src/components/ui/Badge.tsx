import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'class-a' | 'class-b' | 'class-c' | 'class-d' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    'class-a': 'bg-purple-600 text-white',
    'class-b': 'bg-blue-600 text-white',
    'class-c': 'bg-green-600 text-white',
    'class-d': 'bg-yellow-500 text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function getClassBadgeVariant(hospitalClass: string): BadgeProps['variant'] {
  switch (hospitalClass) {
    case 'A': return 'class-a';
    case 'B': return 'class-b';
    case 'C': return 'class-c';
    case 'D': return 'class-d';
    default: return 'default';
  }
}
