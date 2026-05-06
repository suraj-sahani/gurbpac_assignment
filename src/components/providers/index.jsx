import { Toaster } from "../ui/sonner";
import TanstackQueryProvider from "./tanstack-query-provider";

export default function Providers({ children }) {
  return (
    <>
      <TanstackQueryProvider>
        <Toaster />
        {children}
      </TanstackQueryProvider>
    </>
  );
}
