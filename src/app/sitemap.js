export default async function sitemap() {
  const baseUrl = "https://accessbot.netlify.app";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/assistant`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/paths`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/user`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Add learning paths
  const paths = [
    "dispositivo-accessibile",
    "web-for-everyone",
    "accessibilita-basi",
    "strumenti-che-aiutano",
    "comunicare-accessibile",
    "accessibilita-quotidiano",
  ];

  const lessonCounts = {
    "dispositivo-accessibile": 6,
    "web-for-everyone": 6,
    "accessibilita-basi": 4,
    "strumenti-che-aiutano": 5,
    "comunicare-accessibile": 4,
    "accessibilita-quotidiano": 3,
  };

  const pathRoutes = paths.flatMap((slug) => {
    const lessons = lessonCounts[slug] || 6;

    return Array.from({ length: lessons }, (_, i) => ({
      url: `${baseUrl}/paths/${slug}?lesson=${i + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  });

  return [...routes, ...pathRoutes];
}
