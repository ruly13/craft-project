import useSWR from 'swr';

export interface SliderItem {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

const mockSliderData: SliderItem[] = [
  {
    id: 1,
    image: '/images/pexels-cottonbro-6626409.jpg',
    title: 'Creative Works',
    description: 'Exploring new horizons in design.',
  },
  {
    id: 2,
    image: '/images/pexels-darina-belonogova-7959568.jpg',
    title: 'Modern Aesthetics',
    description: 'Clean lines and minimalist vibes.',
  },
  {
    id: 3,
    image: '/images/pexels-heyho-7005283.jpg',
    title: 'Urban Lifestyle',
    description: 'Capturing the essence of city life.',
  },
  {
    id: 4,
    image: '/images/pexels-life-of-pix-2459.jpg',
    title: 'Nature Calls',
    description: 'Beauty found in the wilderness.',
  },
  {
    id: 5,
    image: '/images/pexels-pnw-prod-8251165.jpg',
    title: 'Abstract Art',
    description: 'Expressions beyond the ordinary.',
  },
];

const fetcher = async (): Promise<SliderItem[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockSliderData;
};

export const useSlider = () => {
  const { data, error, isLoading } = useSWR<SliderItem[]>('/api/slider', fetcher);

  return {
    sliderData: data,
    isLoading,
    isError: error,
  };
};
