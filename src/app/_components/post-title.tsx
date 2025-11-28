import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-xl md:text-xl lg:text-xl tracking-tighter leading-tight md:leading-none mb-12 text-left font-normal  tracking-tight">
      {children}
    </h1>
  );
}
