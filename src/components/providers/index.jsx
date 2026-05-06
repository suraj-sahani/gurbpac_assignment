import { Toaster } from "../ui/sonner";

export default function Providers({ children }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
