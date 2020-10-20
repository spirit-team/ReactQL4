// ReactQL Hacker News GraphQL example

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from "react";

// Use the `<Query>` component from the React Apollo lib to declaratively
// fetch the GraphQL data, to display as part of our component
import { useQuery } from "@apollo/client";

// Emotion styled component
import styled from "@emotion/styled";

/* Local */

// Query to get top stories from HackerNews
import hackerNewsQuery from "@/queries/getHackerNewsTopStories";

// ----------------------------------------------------------------------------

// Typescript types

// Represents a HackerNews story - id, title and url
interface IHackerNewsStory {
  id: string;
  title: string;
  url: string;
}

// Represents the data returned by the Hacker News GraphQL query
interface IHackerNewsTopStories {
  hn: {
    topStories: IHackerNewsStory[];
  };
}

// Unstyled Emotion parent block, to avoid repeating <style> tags
// on child elements -- see https://github.com/emotion-js/emotion/issues/1061
const List = styled.ul``;

// Style the list item so it overrides the default font
const Story = styled("li")`
  font-size: 16px;

  a:hover {
    /* shows an example of how we can use themes */
    color: orange;
  }
`;

// Execute the GraphQL query. With SSR, the server will await the returned
// result before rendering out the initial HTML. On the browser, it will re-use
// whatever the server has sent it - or, if it's a client-navigated route that
// doesn't already have data from the server -- it'll display a loading message
// while the data is being retrieved
const hackerNews = () => {
  const { data: requestData, loading: requestLoading, error: requestError} = useQuery<IHackerNewsTopStories>(hackerNewsQuery);

  // Any errors? Say so!
  if (requestError) {
    return <h1>Error retrieving news stories! &mdash; {requestError}</h1>;
  }

  // If the data is still loading, return with a basic
  // message to alert the user
  if (requestLoading) {
    return <h1>Loading Hacker News stories...</h1>;
  }  

  return (
    <>
      <h3>Top stories from Hacker News</h3>
      <List>
        {requestData?.hn?.topStories?.map(story => (
          <Story key={story.id}>
            <a href={story.url} target="_blank">
              {story.title}
            </a>
          </Story>
        ))}
      </List>
    </>
  );
}

export default hackerNews;
