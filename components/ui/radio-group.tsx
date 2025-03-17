import React from 'react';
('"use client');

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue, onValueChange, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onValueChange?.(event.target.value);
    };

    return (
      <div className={className} {...props} ref={ref}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child) && child.type === RadioGroupItem) {
            return React.cloneElement(
              child as React.ReactElement<RadioGroupItemProps>,
              {
                checked: value === (child.props as RadioGroupItemProps).value,
                onChange: handleChange,
              }
            );
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <input
      type='radio'
      className={`peer sr-only h-4 w-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 ${className}`}
      {...props}
      ref={ref}
    />
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';
