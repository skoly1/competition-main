import axios from "axios";

// ("https://gateway.marvel.com/v1/public/characters?ts=1?limit=10&apikey=accf793f9a4fa578ea282aaec9f5f267&hash=9c673e9b1531fa1af1e3432c3a8b464f");

export async function getNewsData(
  type: string,
  object?: {
    id?: number;
    event?: string;
    limit?: number;
    offset?: number;
    nameStartsWith?: string;
  }
) {
  try {
    let key = `?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}`;
    let url = `${process.env.REACT_APP_MARVEL_API_URL}${type}`;
    if (object?.id) {
      url = `${url}/${object?.id}`;
    }
    if (object?.event) {
      url = `${url}/${object?.event}`;
    }

    url = `${url}${key}`;

    let response: any;

    if (object?.nameStartsWith && type === "characters") {
      response = await axios.get(url, {
        params: {
          limit: `${object?.limit}`,
          offset: `${object?.offset}`,
          nameStartsWith: `${object?.nameStartsWith}`,
        },
      });
    } else if (object?.nameStartsWith && type === "comics") {
      response = await axios.get(url, {
        params: {
          limit: `${object?.limit}`,
          offset: `${object?.offset}`,
          titleStartsWith: `${object?.nameStartsWith}`,
        },
      });
    } else {
      response = await axios.get(url, {
        params: {
          limit: `${object?.limit}`,
          offset: `${object?.offset}`,
          // nameStartsWith: `${object?.nameStartsWith}`,
        },
      });
    }

    return {
      status: response.status,
      data: response.data.data.results,
      text: response.statusText,
      total: response.data.data.total,
    };
  } catch (err) {
    console.log(err);
  }
}
