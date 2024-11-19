'use client';

import cn from 'classnames';
import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react';
import { mergeRefs } from 'react-merge-refs';

import LoadingDots from '@/components/ui/LoadingDots';

import styles from './Button.module.css';

/**
 * Interface extending ButtonHTMLAttributes to define custom props for the Button component
 * @interface Props
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defines the visual style variant of the button */
  variant?: 'slim' | 'flat';
  /** Indicates if the button is in an active state */
  active?: boolean;
  /** Specifies a fixed width for the button in pixels */
  width?: number;
  /** Shows a loading indicator when true */
  loading?: boolean;
  /** Allows rendering the button as a different component type */
  Component?: React.ComponentType;
}

/**
 * A customizable button component that supports various states and styles
 * 
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="slim"
 *   loading={true}
 *   onClick={() => console.log('clicked')}
 * >
 *   Click Me
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  // Destructure props with default values
  const {
    className,          // Additional CSS classes
    variant = 'flat',   // Button style variant
    children,           // Button content
    active,            // Active state
    width,             // Custom width
    loading = false,    // Loading state
    disabled = false,   // Disabled state
    style = {},         // Custom inline styles
    Component = 'button', // Component to render as
    ...rest            // All other HTML button props
  } = props;

  // Create a local ref for the button
  const ref = useRef(null);

  // Combine CSS classes using classnames utility
  const rootClassName = cn(
    styles.root,        // Base button styles
    {
      [styles.slim]: variant === 'slim',     // Apply slim variant styles
      [styles.loading]: loading,             // Apply loading state styles
      [styles.disabled]: disabled            // Apply disabled state styles
    },
    className          // Add any custom classes
  );

  return (
    <Component
      // Accessibility attribute for active state
      aria-pressed={active}
      // Data attribute for styling hooks
      data-variant={variant}
      // Merge local ref with forwarded ref
      ref={mergeRefs([ref, buttonRef])}
      // Combined CSS classes
      className={rootClassName}
      // Disabled state
      disabled={disabled}
      // Combine custom width with other styles
      style={{
        width,
        ...style
      }}
      // Spread remaining props
      {...rest}
    >
      {/* Render button content */}
      {children}
      
      {/* Render loading indicator when in loading state */}
      {loading && (
        <i className="flex pl-2 m-0">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

// Set display name for React DevTools
Button.displayName = 'Button';

export default Button;
