// https://amplemarket.notion.site/Crawl-Hacker-News-b00d8bee105040dca72ed2516fd88117

export const Post = async () => {
  const posts = await fetch('http://localhost:3000/api/posts')
    .then((response) => {
      switch (response.status) {
        // Status "ok"
        case 200:
          return response.json();
        case 404:
          throw response;
      }
    })
    .catch((response) => {
      console.log(response.statusText);
    });

  return (
    <div className="max-h-full w-full overflow-y-auto">
      <pre>{JSON.stringify(posts.posts, null, 2)}</pre>
    </div>
  );
};
