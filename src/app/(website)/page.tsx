import { client } from "@/sanity/lib/client";
import HomeContainer from "@/container/Home";

// Optional: caching behavior
export const revalidate = 60; // Revalidate every 60 seconds

async function getCategories() {
  const query = `*[_type == "category"]{
    _id,
    title,
    description,
    image
  }`;
  
  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <HomeContainer categories={categories} />
  );
}
