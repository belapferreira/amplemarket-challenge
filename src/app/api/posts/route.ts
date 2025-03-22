import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const URL = 'https://news.ycombinator.com/';

type Post = {
  position: number;
  title: string;
  link?: string;
  points: number;
};

export async function GET() {
  try {
    const posts = await fetch(URL)
      .then((response) => {
        switch (response.status) {
          // Status "ok"
          case 200:
            return response.text();
          case 404:
            throw response;
        }
      })
      .catch((response) => {
        console.log(response.statusText);
      });

    const parsedPosts = cheerio.load(posts || '');

    const postsList = [] as Post[];

    parsedPosts('.athing').each(function (i) {
      postsList[i] = {
        position: Number(
          parsedPosts(this).find('span.rank').text().trim().replace('.', '')
        ),
        title: parsedPosts(this).find('span.titleline a').text().trim(),
        link: parsedPosts(this).find('span.titleline a').attr('href'),
        points: 0,
      };
    });

    parsedPosts('.athing + tr').each(function (i) {
      postsList[i] = {
        ...postsList[i],
        points: Number(
          parsedPosts(this)
            .find('span.score')
            .text()
            .trim()
            .replace(' points', '')
        ),
      };
    });

    return NextResponse.json({
      posts: postsList,
      now: Date.now(),
    });
  } catch {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
}
