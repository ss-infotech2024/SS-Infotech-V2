import React from "react";

const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`block text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
});

Label.displayName = "Label";

export { Label };