export default function sitemap() {
  const baseUrl = "https://accessbot.netlify.app";

  const routes = [
    "",
    "/assistant",
    "/tools",
    "/paths",
    "/impact",
    "/user",
    "/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Add learning paths
  const paths = [
    "dispositivo-accessibile",
    "web-for-everyone",
    "accessibilita-basi",
    "strumenti-che-aiutano",
    "comunicare-accessibile",
    "accessibilita-quotidiano",
  ];

  const pathRoutes = paths.flatMap((slug) => {
    // Get number of lessons for each path
    const lessonCounts = {
      "dispositivo-accessibile": 6,
      "web-for-everyone": 6,
      "accessibilita-basi": 4,
      "strumenti-che-aiutano": 5,
      "comunicare-accessibile": 4,
      "accessibilita-quotidiano": 3,
    };

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
