
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { getArticles } from "./api/articleApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export async function render(url: string) {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();
  
  // Prefetch data
  await queryClient.prefetchQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  // Render the app to string with matching providers
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <App url={url} />
    </QueryClientProvider>
  );

  // Return the HTML and state, but don't use dehydrate as it's causing hydration issues
  return { 
    html,
    state: {}  // We'll pass an empty state object to avoid hydration issues
  };
}
