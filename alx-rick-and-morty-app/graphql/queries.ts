import { gql } from "@apollo/client";

//`gql` is a template literal tag that parses the query string into a query document.
//filter: FilterEpisode is a custom input type that we will define later
//The query will return the count, pages, next, and prev fields from the info object, and the id, name, air_date, and episode fields from the results object.
export const GET_EPISODES = gql`
  query getEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;