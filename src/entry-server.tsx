
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { getArticles } from "./api/articleApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

export async function render(url: string) {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();
  
  // Prefetch data
  await queryClient.prefetchQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  // Get the dehydrated state
  const dehydratedState = dehydrate(queryClient);

  // Render the app to string
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <App url={url} />
    </QueryClientProvider>
  );

  return { 
    html,
    state: dehydratedState // This will be used to hydrate the client
  };
}
