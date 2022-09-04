import clsx from "clsx";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}
export function Container({
  className,
  children,
}: ContainerProps): JSX.Element {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
