
import { useState, useEffect } from "react";

// multiple calls
// https://hacker-news.firebaseio.com/v0/topstories.json
// https://hacker-news.firebaseio.com/v0/item/8863.json

const getArticleDetails = async (id) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  // console.log("res.json();", res.json());
  return res.json();

};

const getTop10Articles = async () => {
  const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const data = await res.json();
  const top10Articles = data.slice(0, 10);
  const articles = await Promise.all(top10Articles.map(id => getArticleDetails(id)));

  return articles;
};

function Day5() {
  const [articles, setArticles] = useState([]);

  getTop10Articles();

  useEffect(() => {
    getTop10Articles()
      .then((articles) => {
        console.log("articles", articles);
        setArticles(articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl">Day 5: Show top 10 articles from Hacker News</h2>
      <a href="https://reactpractice.dev/exercise/show-top-10-articles-from-hacker-news/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <div>
        <ul>
          {articles.map(article => (
            <li className="mb-2" key={article.id}>
              <a href={article.url} target="_blank">{article.title}</a>
            </li>)
          )}
        </ul>
      </div>
    </>
  );
}

export default Day5;
