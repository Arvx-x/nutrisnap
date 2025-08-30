import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={
        "rounded-2xl bg-white shadow-soft border border-black/5 " + className
      }
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={"p-4 " + className} {...props} />;
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={"p-4 pb-0 " + className} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardProps) {
  return (
    <h3 className={"text-base font-semibold text-black " + className} {...props} />
  );
}


