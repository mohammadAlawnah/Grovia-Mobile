// import { queryClient } from "@/lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Tabs } from "expo-router";

// export default function RootLayout() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Tabs>
//         <Tabs.Screen name="(tabs)" />
//       </Tabs>
//     </QueryClientProvider>
//   );
// }

import { queryClient } from "@/lib/queryClient";
import { CartProvider } from "@/context/CartContext";
import { QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);
  return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="WelcomeScreen" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(main)" />
            </Stack>
          </FavoritesProvider>
        </CartProvider>
      </QueryClientProvider>
  );
}
